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
  const watchListCollection = database.collection("watchList");
  try {
    await client.connect();
    app.post("/watchlist", async (req, res) => {
      const data = req.body;
      const result = await watchListCollection.insertOne(data);
      res.json(result);
    });

    app.get("/watchlist", async (req, res) => {
      const data = await watchListCollection.find({}).toArray();
      res.send(data);
    });

    app.delete("/watchlist/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await watchListCollection.deleteOne(query);
      res.json(result);
    });
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
