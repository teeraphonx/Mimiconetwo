import express from 'express';
import { MongoClient, ObjectId } from 'mongodb'; // Import ObjectId สำหรับการลบ
import cors from 'cors';
// ===================================

const app = express();
const port = 3000; // API ของเราจะรันที่ Port 3000

// ===================================
// Middleware
// ===================================
app.use(cors()); // อนุญาตให้ Frontend (Netlify) คุยกับเราได้
app.use(express.json()); // ทำให้อ่าน JSON ที่ส่งมาได้

// ที่อยู่ (Private IP) ของ VM 1 (Database)
// ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️
// 
//      **สำคัญ: ใส่ IP ของ VM 1 (เครื่อง Database) ตรงนี้**
//
const uri = "mongodb://172.16.0.4:27017";
//
// ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️

// ชื่อ Database (จาก Compass)
const dbName = "MIMicGamingGear"; 

const client = new MongoClient(uri);

let db; // ตัวแปรเก็บการเชื่อมต่อ Database

// ฟังก์ชันเชื่อมต่อ Database (จาก VM 2 ไป VM 1)
async function connectToDb() {
  try {
    await client.connect();
    // *** แก้ไข Log ให้ถูกต้อง ***
    console.log("✅ (VM 2) เชื่อมต่อกับ MongoDB (VM 1) สำเร็จ!");
    db = client.db(dbName); // เลือก Database ที่ถูกต้อง
  } catch (err) {
    // *** แก้ไข Log ให้ถูกต้อง ***
    console.error("❌ (VM 2) เชื่อมต่อ MongoDB (VM 1) ล้มเหลว", err);
    process.exit(1);
  }
}

// ===================================
// === API Endpoints (เส้นทาง API) ===
// ===================================

// --- 1. API สำหรับ "Product" Collection ---

// (GET) ดึงสินค้า "ทั้งหมด"
app.get('/api/products', async (req, res) => {
  try {
    const collection = db.collection("Product"); 
    const products = await collection.find({}).toArray();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to get products", error: err.message });
  }
});

// (GET) ดึงสินค้า "ชิ้นเดียว"
app.get('/api/products/:id', async (req, res) => {
  try {
    const collection = db.collection("Product");
    const { id } = req.params;
    
    const query = { "id-number": parseInt(id) }; 
    
    const product = await collection.findOne(query);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to get single product", error: err.message });
  }
});


// --- 2. API สำหรับ "carts" Collection ---

// (GET) ดึงข้อมูล "ทั้งหมด" ในตะกร้า
app.get('/api/cart', async (req, res) => {
  try {
    const collection = db.collection("carts"); 
    const cartItems = await collection.find({}).toArray(); 
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ message: "Failed to get cart items", error: err.message });
  }
});

// (POST) เพิ่มสินค้า 1 ชิ้นลงตะกร้า
app.post('/api/cart', async (req, res) => {
  try {
    const collection = db.collection("carts");
    const productData = req.body; 
    productData.added_at = new Date();
    
    const result = await collection.insertOne(productData); 
    
    res.status(201).json(productData); 
  } catch (err) {
    res.status(500).json({ message: "Failed to add to cart", error: err.message });
  }
});

// (DELETE) ลบสินค้า 1 ชิ้นออกจากตะกร้า
app.delete('/api/cart/:id', async (req, res) => {
  try {
    const collection = db.collection("carts");
    const { id } = req.params; 

    const query = { _id: new ObjectId(id) }; 
    const result = await collection.deleteOne(query); 

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    
    res.status(200).json({ message: "Item removed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item", error: err.message });
  }
});

// ===================================
// Start the Server (เริ่มทำงานบน VM 2)
// ===================================
connectToDb().then(() => {
  app.listen(port, "0.0.0.0", () => { // 0.0.0.0 = ให้รับการเชื่อมต่อจากภายนอก
    // *** แก้ไข Log ให้ถูกต้อง ***
    console.log(`🚀 Backend server (VM 2) is running at http://localhost:${port}`);
    console.log(`Backend is connected to Database: ${dbName} (on VM 1)`);
  });
});