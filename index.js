const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sjbgh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const run = async () => {
  const database = client.db("cineSnob");
  try {
    await client.connect();
    console.log("DB is connectd");
  } finally {
    // await client.close();
  }
};

app.get("/", (req, res) => {
  res.send("Welcome to SERVER");
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});

run().catch(console.dir);
