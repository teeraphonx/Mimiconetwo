// backend/server.js
import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const uri = "mongodb://172.192.43.47:27017";
const dbName = "MiMicGamingGear";

let db;
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db(dbName);
  } catch (err) {
    console.error("DB error:", err);
    process.exit(1);
  }
}

app.get("/api/products", async (req, res) => {
  try {
    const products = await db.collection("Product").find({}).toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const idNumber = parseInt(req.params.id);
    const product = await db
      .collection("Product")
      .findOne({ "id-number": idNumber });
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
});

app.get("/api/cart", async (req, res) => {
  try {
    const items = await db.collection("carts").find({}).toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
});

app.post("/api/cart", async (req, res) => {
  try {
    const data = req.body;
    data.added_at = new Date();
    const result = await db.collection("carts").insertOne(data);
    res.json({ insertedId: result.insertedId, ...data });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
});

app.delete("/api/cart/:id", async (req, res) => {
  try {
    const result = await db
      .collection("carts")
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0)
      return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
});

connectDB().then(() => {
  app.listen(PORT, "0.0.0.0", () =>
    console.log(`API running on port ${PORT}`)
  );
});
