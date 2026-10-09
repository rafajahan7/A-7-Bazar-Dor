import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URL;

if (!uri) {
  throw new Error("Please add MONGODB_URL to your .env file");
}

const client = new MongoClient(uri);

const clientPromise = client.connect();

export default clientPromise;