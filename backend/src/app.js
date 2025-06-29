const express = require('express');
const cors = require('cors');
const healthRouter = require('./routes/health');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/health', healthRouter);

app.get('/', (req, res) => {
  res.send('GreenWear 백엔드 서버 실행 중!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중`);
}); 