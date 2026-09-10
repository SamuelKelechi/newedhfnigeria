import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { writeFile } from "fs/promises";

/*
=========================================================
EDHF OLD FIREBASE BLOG RECOVERY
READ-ONLY

This script connects to the OLD Firebase project:
elisha-foundation

It:
1. Reads the blog collection
2. Does NOT create/update/delete Firebase data
3. Saves the recovered blogs to:
   firebase-blogs-recovered.json
=========================================================
*/

const firebaseConfig = {
  apiKey: "AIzaSyAXrnxVZyvND0_rFR1-75PZvcrMaSXOkBU",
  authDomain: "elisha-foundation.firebaseapp.com",
  projectId: "elisha-foundation",
  storageBucket: "elisha-foundation.appspot.com",
  messagingSenderId: "843218362796",
  appId: "1:843218362796:web:2a8c8c8d580d764da71a09",
};

// Initialize the OLD Firebase project
const app = initializeApp(firebaseConfig);

// Get Firestore
const db = getFirestore(app);

async function recoverBlogs() {
  console.log("");
  console.log("========================================");
  console.log("EDHF OLD FIREBASE BLOG RECOVERY");
  console.log("========================================");
  console.log("");

  console.log("Firebase Project:");
  console.log(firebaseConfig.projectId);
  console.log("");

  console.log("Collection:");
  console.log("blog");
  console.log("");

  console.log("Connecting to Firestore...");
  console.log("");

  try {
    /*
     * READ ONLY
     *
     * We are only using getDocs().
     * Nothing is written, updated or deleted.
     */
    const blogCollection = collection(db, "blog");

    /*
     * The old website orders blogs by "time".
     *
     * If some old documents do not have "time",
     * the fallback below will still attempt to
     * retrieve the collection.
     */
    let snapshot;

    try {
      const blogQuery = query(
        blogCollection,
        orderBy("time", "desc")
      );

      snapshot = await getDocs(blogQuery);
    } catch (queryError) {
      console.log(
        "Could not order by time. Reading collection without ordering..."
      );

      snapshot = await getDocs(blogCollection);
    }

    console.log("========================================");
    console.log("FIREBASE BLOG RESULT");
    console.log("========================================");
    console.log("");

    console.log(`Documents found: ${snapshot.size}`);
    console.log("");

    if (snapshot.empty) {
      console.log("NO BLOG POSTS FOUND.");
      console.log("");
      console.log(
        "Firebase connection worked, but the blog collection returned 0 documents."
      );
      console.log("");

      return;
    }

    const blogs = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        firebaseId: doc.id,

        title: data.title ?? "",

        description:
          data.desc ??
          data.description ??
          "",

        story:
          data.story ??
          data.fullstory ??
          "",

        image:
          data.avatar ??
          data.image ??
          "",

        date:
          data.time?.toDate?.()?.toISOString() ??
          data.date?.toDate?.()?.toISOString() ??
          null,

        // Keep the original Firebase data too.
        // This helps us verify everything before migration.
        originalData: data,
      };
    });

    console.log("Recovered blog posts:");
    console.log("");

    blogs.forEach((blog, index) => {
      console.log("----------------------------------------");
      console.log(`BLOG ${index + 1}`);
      console.log("----------------------------------------");
      console.log(`Firebase ID: ${blog.firebaseId}`);
      console.log(`Title: ${blog.title}`);
      console.log(`Description: ${blog.description}`);
      console.log(`Image: ${blog.image}`);
      console.log(`Date: ${blog.date}`);

      const storyPreview = blog.story
        .replace(/\s+/g, " ")
        .trim()
        .substring(0, 150);

      console.log(`Story: ${storyPreview}${blog.story.length > 150 ? "..." : ""}`);
      console.log("");
    });

    /*
     * Save a complete backup locally.
     *
     * This file contains the original Firebase fields,
     * so we can inspect everything before importing
     * anything into MongoDB.
     */
    await writeFile(
      "firebase-blogs-recovered.json",
      JSON.stringify(blogs, null, 2),
      "utf8"
    );

    console.log("========================================");
    console.log("RECOVERY COMPLETE");
    console.log("========================================");
    console.log("");

    console.log(
      `Successfully recovered ${blogs.length} blog posts.`
    );

    console.log("");
    console.log(
      "Backup saved as:"
    );

    console.log(
      "firebase-blogs-recovered.json"
    );

    console.log("");
    console.log(
      "IMPORTANT: Nothing was written to Firebase."
    );

    console.log(
      "The next step will be importing this backup into MongoDB."
    );

    console.log("");
  } catch (error: any) {
    console.log("");
    console.log("========================================");
    console.log("FIREBASE RECOVERY ERROR");
    console.log("========================================");
    console.log("");

    console.error("Error code:", error?.code);
    console.error("Error message:", error?.message);

    console.log("");

    if (error?.code === "permission-denied") {
      console.log(
        "Firebase rejected the read because the Firestore security rules"
      );
      console.log(
        "do not allow this client to read the blog collection."
      );
    }

    console.log("");
  }
}

recoverBlogs();