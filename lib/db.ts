import { MongoClient, ServerApiVersion } from "mongodb"

function getMongoUri() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable")
  }
  return uri
}

const uri = getMongoUri()

type GlobalWithMongo = typeof globalThis & {
  _mongoClient?: MongoClient
  _mongoClientPromise?: Promise<MongoClient>
}

const globalWithMongo = global as GlobalWithMongo

let client: MongoClient | undefined = globalWithMongo._mongoClient
let clientPromise: Promise<MongoClient> | undefined = globalWithMongo._mongoClientPromise

async function getClient(): Promise<MongoClient> {
  if (client) return client
  if (clientPromise) {
    client = await clientPromise
    return client
  }

  const newClient = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  })

  clientPromise = newClient.connect()
  if (process.env.NODE_ENV === "development") {
    globalWithMongo._mongoClientPromise = clientPromise
  }

  client = await clientPromise
  if (process.env.NODE_ENV === "development") {
    globalWithMongo._mongoClient = client
  }
  return client
}

export async function getDb() {
  const c = await getClient()
  const dbName = c.options?.dbName || "app"
  return c.db(dbName)
}
