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
  },
  {
    id: 5,
    name: 'Solar-Powered Watch',
    price: 125.99,
    category: 'accessories',
    sustainabilityScore: 9.5,
    materials: ['Recycled Stainless Steel', 'Solar Panel'],
    carbonFootprint: 1.2,
    image: 'https://via.placeholder.com/300x300?text=Solar+Watch'
  }
];

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  const { httpMethod, queryStringParameters, body } = event;

  try {
    switch (httpMethod) {
      case 'GET':
        let filteredProducts = [...mockProducts];
        
        // 카테고리 필터링
        if (queryStringParameters?.category) {
          filteredProducts = filteredProducts.filter(product => 
            product.category === queryStringParameters.category
          );
        }
        
        // 지속가능성 점수 필터링
        if (queryStringParameters?.minScore) {
          filteredProducts = filteredProducts.filter(product => 
            product.sustainabilityScore >= parseFloat(queryStringParameters.minScore)
          );
        }

        // 가격 범위 필터링
        if (queryStringParameters?.maxPrice) {
          filteredProducts = filteredProducts.filter(product => 
            product.price <= parseFloat(queryStringParameters.maxPrice)
          );
        }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            data: filteredProducts,
            total: filteredProducts.length,
            platform: 'Netlify Demo',
            filters: queryStringParameters || {}
          }),
        };

      case 'POST':
        const newProductData = JSON.parse(body || '{}');
        const newProduct = {
          id: mockProducts.length + 1,
          ...newProductData,
          sustainabilityScore: newProductData.sustainabilityScore || 7.0,
          carbonFootprint: newProductData.carbonFootprint || 2.0,
          image: newProductData.image || 'https://via.placeholder.com/300x300?text=New+Product'
        };
        
        return {
          statusCode: 201,
          headers,
          body: JSON.stringify({
            success: true,
            data: newProduct,
            message: 'Product created successfully on Netlify'
          }),
        };

      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ 
            error: 'Method Not Allowed',
            allowedMethods: ['GET', 'POST']
          }),
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: error.message
      }),
    };
  }
}; 