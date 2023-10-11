import { MongoClient, Db } from 'mongodb';

const { MONGODB_URI: uri, MONGODB_DB: dbName } = process.env;

let cachedClient: MongoClient;
let cachedDb: Db;

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  );
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) { //キャッシュ変数が入力されているか確認
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri!);

  const db = await client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
