import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";

console.log("");
console.log("========================================");
console.log("EDHF FIREBASE BLOG DIAGNOSTIC");
console.log("========================================");
console.log("");

const serviceAccountPath = path.join(
  process.cwd(),
  "firebase-service-account.json"
);

if (!fs.existsSync(serviceAccountPath)) {
  console.error(
    "ERROR: firebase-service-account.json was not found."
  );

  process.exit(1);
}

const serviceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, "utf8")
);

console.log("Firebase Project:");
console.log(serviceAccount.project_id);
console.log("");

console.log("Service Account:");
console.log(serviceAccount.client_email);
console.log("");

const app = initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore(app);

async function inspectBlogs() {
  try {
    console.log("Connecting to Firestore...");
    console.log("");

    const snapshot = await db
      .collection("blog")
      .get();

    console.log("========================================");
    console.log("FIREBASE BLOG RESULT");
    console.log("========================================");
    console.log("");

    console.log("Project:");
    console.log(serviceAccount.project_id);
    console.log("");

    console.log("Collection:");
    console.log("blog");
    console.log("");

    console.log("Documents found:");
    console.log(snapshot.size);
    console.log("");

    if (snapshot.empty) {
      console.log("NO BLOG POSTS FOUND.");
      console.log("");

      console.log(
        "The Firebase connection worked successfully."
      );

      console.log(
        "However, there are no documents in the blog collection."
      );

      console.log("");

      return;
    }

    console.log("BLOG POSTS FOUND");
    console.log("");

    snapshot.docs.forEach((doc, index) => {
      const data = doc.data();

      console.log("----------------------------------------");
      console.log("BLOG:", index + 1);
      console.log("----------------------------------------");

      console.log("Document ID:");
      console.log(doc.id);
      console.log("");

      console.log("Title:");
      console.log(data.title || "[missing]");
      console.log("");

      console.log("Description:");
      console.log(data.desc || "[missing]");
      console.log("");

      console.log("Story:");
      console.log(data.story || "[missing]");
      console.log("");

      console.log("Image:");
      console.log(data.avatar || "[missing]");
      console.log("");

      console.log("Time:");

      if (data.time) {
        if (
          typeof data.time.toDate === "function"
        ) {
          console.log(data.time.toDate());
        } else {
          console.log(data.time);
        }
      } else {
        console.log("[missing]");
      }

      console.log("");

      console.log("Fields:");
      console.log(Object.keys(data));

      console.log("");
    });

    console.log("========================================");
    console.log("INSPECTION COMPLETE");
    console.log("========================================");
    console.log("");

  } catch (error) {
    console.error("");
    console.error("FIREBASE ERROR");
    console.error("");
    console.error(error);
    console.error("");

    process.exit(1);
  }
}

inspectBlogs();