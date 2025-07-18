exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
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

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      status: 'OK',
      message: 'GreenWear API is running on Netlify!',
      timestamp: new Date().toISOString(),
      platform: 'Netlify Functions',
      region: context.region || 'us-east-1'
    }),
  };
}; 