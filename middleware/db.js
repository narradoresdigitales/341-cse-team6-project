const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URL;
const client = new MongoClient(uri);

let db;

async function connectToDb() {
  if (!db) {
    await client.connect();
    db = client.db(); // Replace with your DB name
  }
  return db;
}

module.exports = connectToDb;
