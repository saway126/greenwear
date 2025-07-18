import mysql from 'mysql2/promise';

async function getConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'greenwear_user',
    password: process.env.DB_PASSWORD || 'greenwear_password',
    database: process.env.DB_NAME || 'greenwear_db',
  });
}

export default async function handler(req, res) {
  const { method, query } = req;
  let connection;

  try {
    connection = await getConnection();

    switch (method) {
      case 'GET':
        let sql = 'SELECT * FROM products WHERE is_active = true';
        const params = [];

        if (query.category) {
          sql += ' AND category = ?';
          params.push(query.category);
        }

        if (query.minScore) {
          sql += ' AND eco_rating >= ?';
          params.push(parseFloat(query.minScore));
        }

        const [rows] = await connection.execute(sql, params);

        res.status(200).json({
          success: true,
          data: rows,
          total: rows.length,
          platform: 'Vercel with DB',
        });
        break;

      case 'POST':
        const newProduct = req.body;
        const { name, description, price, category, size, material, eco_rating, carbon_footprint, stock_quantity, image_url, brand, origin_country } = newProduct;
        
        const insertSql = 'INSERT INTO products (name, description, price, category, size, material, eco_rating, carbon_footprint, stock_quantity, image_url, brand, origin_country, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const insertParams = [name, description, price, category, size, material, eco_rating, carbon_footprint, stock_quantity, image_url, brand, origin_country, true];

        const [result] = await connection.execute(insertSql, insertParams);
        const insertedId = result.insertId;

        res.status(201).json({
          success: true,
          data: { id: insertedId, ...newProduct },
          message: 'Product created successfully',
        });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
} 