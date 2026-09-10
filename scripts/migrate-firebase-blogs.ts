import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

/*
=========================================================
EDHF FIREBASE → MONGODB BLOG MIGRATION
=========================================================

SOURCE:
firebase-blogs-recovered.json

DESTINATION:
MongoDB → Blog collection

IMPORTANT:
- Admin collection is NOT touched.
- Event collection is NOT touched.
- Firebase is NOT modified.
- Existing MongoDB blogs are NOT duplicated.
=========================================================
*/

interface RecoveredBlog {
  firebaseId: string;
  title: string;
  description: string;
  story: string;
  image: string;
  date: string | null;
  originalData?: Record<string, any>;
}

async function migrateBlogs() {
  console.log("");
  console.log("========================================");
  console.log("EDHF FIREBASE → MONGODB BLOG MIGRATION");
  console.log("========================================");
  console.log("");

  try {
    /*
    -----------------------------------------------------
    1. Load recovered Firebase JSON
    -----------------------------------------------------
    */

    const jsonPath = path.join(
      process.cwd(),
      "firebase-blogs-recovered.json"
    );

    console.log("Loading recovered Firebase blogs...");
    console.log(`File: ${jsonPath}`);
    console.log("");

    const file = await readFile(jsonPath, "utf8");

    const blogs: RecoveredBlog[] = JSON.parse(file);

    console.log(`Recovered posts found: ${blogs.length}`);
    console.log("");

    if (!blogs.length) {
      console.log("No blogs found in the recovery file.");
      return;
    }

    /*
    -----------------------------------------------------
    2. Connect to MongoDB through Prisma
    -----------------------------------------------------
    */

    console.log("Connecting to MongoDB...");

    await prisma.$connect();

    console.log("MongoDB connection successful.");
    console.log("");

    /*
    -----------------------------------------------------
    3. Verify existing Blog collection
    -----------------------------------------------------
    */

    const existingBlogs = await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        image: true,
        date: true,
      },
    });

    console.log(
      `Existing blogs already in MongoDB: ${existingBlogs.length}`
    );

    console.log("");

    /*
    -----------------------------------------------------
    4. Prepare duplicate detection
    -----------------------------------------------------

    We use:

        title + image + date

    as the duplicate signature.

    This means running this migration again will not
    create another copy of the same blog.
    -----------------------------------------------------
    */

    const existingKeys = new Set(
      existingBlogs.map((blog) =>
        createDuplicateKey(
          blog.title,
          blog.image,
          blog.date
        )
      )
    );

    let imported = 0;
    let skipped = 0;
    let failed = 0;

    const failedPosts: Array<{
      firebaseId: string;
      title: string;
      error: string;
    }> = [];

    /*
    -----------------------------------------------------
    5. Import blogs one by one
    -----------------------------------------------------
    */

    console.log("Starting migration...");
    console.log("");

    for (let i = 0; i < blogs.length; i++) {
      const blog = blogs[i];

      const position = `${i + 1}/${blogs.length}`;

      try {
        /*
        -----------------------------------------------
        Validate required fields
        -----------------------------------------------
        */

        if (!blog.title || !blog.title.trim()) {
          throw new Error("Blog has no title");
        }

        /*
        -----------------------------------------------
        Convert Firebase date to JavaScript Date
        -----------------------------------------------
        */

        const publicationDate = blog.date
          ? new Date(blog.date)
          : new Date();

        if (Number.isNaN(publicationDate.getTime())) {
          throw new Error(
            `Invalid publication date: ${blog.date}`
          );
        }

        /*
        -----------------------------------------------
        Create duplicate key
        -----------------------------------------------
        */

        const duplicateKey = createDuplicateKey(
          blog.title,
          blog.image,
          publicationDate
        );

        /*
        -----------------------------------------------
        Prevent duplicate import
        -----------------------------------------------
        */

        if (existingKeys.has(duplicateKey)) {
          skipped++;

          console.log(
            `[${position}] SKIPPED — already exists: ${blog.title}`
          );

          continue;
        }

        /*
        -----------------------------------------------
        Create MongoDB Blog document
        -----------------------------------------------

        Firebase:
          desc   → description
          avatar → image
          story  → story
          time   → date
        -----------------------------------------------
        */

        await prisma.blog.create({
          data: {
            title: blog.title.trim(),

            description:
              blog.description?.trim() || "",

            story:
              blog.story?.trim() || "",

            image:
              blog.image?.trim() || "",

            date: publicationDate,
          },
        });

        /*
        -----------------------------------------------
        Add to our duplicate set immediately.
        This protects against duplicate documents
        inside the recovery JSON itself.
        -----------------------------------------------
        */

        existingKeys.add(duplicateKey);

        imported++;

        console.log(
          `[${position}] IMPORTED — ${blog.title}`
        );
      } catch (error: any) {
        failed++;

        const errorMessage =
          error?.message ||
          String(error);

        failedPosts.push({
          firebaseId: blog.firebaseId,
          title: blog.title,
          error: errorMessage,
        });

        console.log(
          `[${position}] FAILED — ${blog.title}`
        );

        console.log(
          `          Error: ${errorMessage}`
        );
      }
    }

    /*
    -----------------------------------------------------
    6. Final summary
    -----------------------------------------------------
    */

    console.log("");
    console.log("========================================");
    console.log("MIGRATION COMPLETE");
    console.log("========================================");
    console.log("");

    console.log(`Total recovered: ${blogs.length}`);
    console.log(`Imported:         ${imported}`);
    console.log(`Skipped:          ${skipped}`);
    console.log(`Failed:           ${failed}`);

    console.log("");

    /*
    -----------------------------------------------------
    7. Verify final Blog count
    -----------------------------------------------------
    */

    const finalBlogCount = await prisma.blog.count();

    console.log(
      `Total blogs now in MongoDB: ${finalBlogCount}`
    );

    console.log("");

    /*
    -----------------------------------------------------
    8. Display failures
    -----------------------------------------------------
    */

    if (failedPosts.length > 0) {
      console.log("========================================");
      console.log("FAILED POSTS");
      console.log("========================================");
      console.log("");

      failedPosts.forEach((failedPost, index) => {
        console.log(`${index + 1}. ${failedPost.title}`);
        console.log(`   Firebase ID: ${failedPost.firebaseId}`);
        console.log(`   Error: ${failedPost.error}`);
        console.log("");
      });
    }

    /*
    -----------------------------------------------------
    IMPORTANT SAFETY MESSAGE
    -----------------------------------------------------
    */

    console.log("========================================");
    console.log("SAFETY CHECK");
    console.log("========================================");
    console.log("");

    console.log("Firebase:     NOT MODIFIED");
    console.log("Admin:        NOT MODIFIED");
    console.log("Event:        NOT MODIFIED");
    console.log("Blog:         MIGRATION COMPLETED");

    console.log("");
  } catch (error: any) {
    console.error("");
    console.error("========================================");
    console.error("MIGRATION ERROR");
    console.error("========================================");
    console.error("");

    console.error(
      error?.message || error
    );

    console.error("");
  } finally {
    await prisma.$disconnect();
  }
}

/*
=========================================================
DUPLICATE KEY
=========================================================

Normalizes the title and image so small differences in
capitalization/spacing do not create duplicate posts.
=========================================================
*/

function createDuplicateKey(
  title: string,
  image: string,
  date: Date
): string {
  const normalizedTitle = (title || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  const normalizedImage = (image || "")
    .trim();

  const timestamp = new Date(date).getTime();

  return `${normalizedTitle}||${normalizedImage}||${timestamp}`;
}

/*
=========================================================
START
=========================================================
*/

migrateBlogs();