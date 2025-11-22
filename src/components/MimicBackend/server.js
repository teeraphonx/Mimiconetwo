// นำเข้า Library
import express from 'express';
import { createClient } from 'redis';

const app = express();
const port = 3000;

// สร้าง Redis client
const redisClient = createClient({ url: 'redis://redis:6379' });
redisClient.on('error', (err) => console.error('Redis error:', err));

await redisClient.connect();

// ข้อมูลตัวอย่างสินค้า
const products = [
  { id: 1, name: 'Mousepad Pro', category: 'Mousepads' },
  { id: 2, name: 'Speed Mouse', category: 'Mouse' },
  { id: 3, name: 'Silent Mouse Feet', category: 'Mouse Feet' },
  { id: 4, name: 'Grip Pro', category: 'Mouse Grips' }
];

// Route สำหรับค้นหา
app.get('/search', async (req, res) => {
  const q = req.query.q?.toLowerCase();
  if (!q) return res.status(400).json({ error: 'Missing query' });

  // ตรวจสอบ cache ใน Redis ก่อน
  const cached = await redisClient.get(q);
  if (cached) {
    console.log('🧠 From cache');
    return res.json(JSON.parse(cached));
  }

  // ถ้าไม่เจอใน cache → ค้นหาจากข้อมูลจริง
  console.log('🔍 From database');
  const result = products.filter(p => p.name.toLowerCase().includes(q));

  // เก็บผลไว้ใน cache 60 วินาที
  await redisClient.setEx(q, 60, JSON.stringify(result));

  res.json(result);
});

// เริ่ม server
app.listen(port, () => console.log(`✅ Server running on port ${port}`));
