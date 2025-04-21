import { MongoClient } from "mongodb"

// ⛳ Get the Mongo URI from .env.local
const uri = process.env.MONGODB_URI!
const options = {}

let client
let clientPromise: Promise<MongoClient>

// 👇 During development, we use a global variable to persist the client
// This avoids creating multiple connections when hot-reloading
declare global {
  var _mongoClientPromise: Promise<MongoClient>
}

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local")
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // ✅ In production, always create a new client
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
