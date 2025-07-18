const mockProducts = [
  {
    id: 1,
    name: 'Eco-Friendly Cotton T-Shirt',
    price: 29.99,
    category: 'clothing',
    sustainabilityScore: 8.5,
    materials: ['Organic Cotton', 'Recycled Polyester'],
    carbonFootprint: 2.1,
    image: 'https://via.placeholder.com/300x300?text=Cotton+T-Shirt'
  },
  {
    id: 2,
    name: 'Bamboo Fiber Hoodie',
    price: 45.99,
    category: 'clothing',
    sustainabilityScore: 9.2,
    materials: ['Bamboo Fiber', 'Organic Cotton'],
    carbonFootprint: 1.8,
    image: 'https://via.placeholder.com/300x300?text=Bamboo+Hoodie'
  },
  {
    id: 3,
    name: 'Recycled Plastic Sneakers',
    price: 89.99,
    category: 'footwear',
    sustainabilityScore: 7.8,
    materials: ['Recycled Ocean Plastic', 'Cork'],
    carbonFootprint: 3.2,
    image: 'https://via.placeholder.com/300x300?text=Eco+Sneakers'
  },
  {
    id: 4,
    name: 'Hemp Canvas Backpack',
    price: 65.99,
    category: 'accessories',
    sustainabilityScore: 8.9,
    materials: ['Hemp Canvas', 'Recycled Metal'],
    carbonFootprint: 2.5,
    image: 'https://via.placeholder.com/300x300?text=Hemp+Backpack'
  }
];

export default function handler(req, res) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      let filteredProducts = mockProducts;
      
      // 카테고리 필터링
      if (query.category) {
        filteredProducts = filteredProducts.filter(product => 
          product.category === query.category
        );
      }
      
      // 지속가능성 점수 필터링
      if (query.minScore) {
        filteredProducts = filteredProducts.filter(product => 
          product.sustainabilityScore >= parseFloat(query.minScore)
        );
      }

      res.status(200).json({
        success: true,
        data: filteredProducts,
        total: filteredProducts.length,
        platform: 'Vercel Demo'
      });
      break;

    case 'POST':
      const newProduct = {
        id: mockProducts.length + 1,
        ...req.body,
        sustainabilityScore: req.body.sustainabilityScore || 7.0,
        carbonFootprint: req.body.carbonFootprint || 2.0
      };
      
      res.status(201).json({
        success: true,
        data: newProduct,
        message: 'Product created successfully'
      });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
} 