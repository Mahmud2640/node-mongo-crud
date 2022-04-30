const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectID;
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// User name = mahmud2640
// Password = OtN9vlqcEs1swcgU

// Database

const uri =
  "mongodb+srv://mahmud2640:OtN9vlqcEs1swcgU@project-01.zfxst.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const userCollection = client.db("myFirstDatabase").collection("users");

    // Get all users
    app.get("/user", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    //get post
    app.post("/user", async (req, res) => {
      const newUser = req.body;
      console.log("adding newUser", newUser);
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    //  delete users
    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

// Routes
app.get("/", (req, res) => {
  res.send("Running my First Node Crud Server");
});

// Start Server
app.listen(port, () => {
  console.log("CRUD server is running...");
});
