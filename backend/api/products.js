// 상품 API 라우터 (CommonJS, MariaDB)
const express = require('express');
const router  = express.Router();
const db      = require('./database');

// GET /api/products
router.get('/', async (req, res) => {
  const { category, minScore } = req.query;
  const result = await db.getProducts(category, minScore ? parseFloat(minScore) : null);
  res.json({ success: result.success, data: result.data || [], total: result.data?.length || 0 });
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  const result = await db.getProductById(parseInt(req.params.id));
  if (!result.success || !result.data) return res.status(404).json({ success: false, message: '상품을 찾을 수 없습니다.' });
  res.json({ success: true, data: result.data, images: result.images });
});

// POST /api/products  (관리자용)
router.post('/', async (req, res) => {
  const { name, description, price, category, size, material, eco_rating, carbon_footprint, stock_quantity, image_url, brand, origin_country } = req.body;
  if (!name || !price || !category) return res.status(400).json({ success: false, message: 'name, price, category는 필수입니다.' });
  try {
    const [result] = await db.pool.execute(
      `INSERT INTO products (name,description,price,category,size,material,eco_rating,carbon_footprint,stock_quantity,image_url,brand,origin_country,is_active)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,TRUE)`,
      [name, description, price, category, size, material, eco_rating, carbon_footprint, stock_quantity, image_url, brand, origin_country]
    );
    res.status(201).json({ success: true, data: { id: result.insertId, ...req.body } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
