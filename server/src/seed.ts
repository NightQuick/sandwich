import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/myAppDB";

interface SeedData {
  products?: any[];
  ingredients?: any[];
  orders?: any[];
  [key: string]: any[] | undefined;
}

async function seed() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  const db = client.db();

  const rawPath = path.join(__dirname, "../seed-data.json");
  const raw: SeedData = JSON.parse(fs.readFileSync(rawPath, "utf-8"));

  for (const collectionName of Object.keys(raw)) {
    const documents = raw[collectionName];

    if (!Array.isArray(documents)) {
      console.warn(`Skipping "${collectionName}": not an array`);
      continue;
    }

    await db.collection(collectionName).deleteMany({});

    if (documents.length === 0) {
      console.log(`"${collectionName}": empty, skipped insert`);
      continue;
    }

    const result = await db.collection(collectionName).insertMany(documents);
    console.log(`Inserted ${result.insertedCount} into "${collectionName}"`);
  }

  await client.close();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});