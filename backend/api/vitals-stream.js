// 실시간 생체신호 SSE 스트림 (CommonJS)
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.setHeader('Content-Type',  'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection',    'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // Nginx 버퍼링 비활성화

  let count = 0;

  const send = () => {
    count++;
    const hr   = Math.floor(70 + Math.sin(count * 0.1) * 15 + Math.random() * 10);
    const spo2 = Math.floor(97 + Math.random() * 3);
    const temp = parseFloat((36.5 + Math.sin(count * 0.02) * 0.3 + Math.random() * 0.2).toFixed(1));
    const sys  = Math.floor(120 + Math.sin(count * 0.05) * 10 + Math.random() * 5);
    const dia  = Math.floor(80  + Math.sin(count * 0.05) * 5  + Math.random() * 3);

    let status = 'normal';
    if (hr > 110 || sys > 140 || temp > 37.5 || spo2 < 90) status = 'critical';
    else if (hr > 90 || sys > 130 || temp > 37.2 || spo2 < 95) status = 'warning';

    const data = {
      id: count, timestamp: new Date().toISOString(),
      heartRate: hr, oxygen: spo2, temperature: temp,
      bloodPressure: `${sys}/${dia}`, status,
      activity: ['rest','walking','exercise','work'][Math.floor(Math.random() * 4)],
      device: 'GreenWear Smart Watch',
    };
    try { res.write(`data: ${JSON.stringify(data)}\n\n`); } catch (_) { clearInterval(id); }
  };

  // 즉시 첫 데이터 전송
  send();
  const id = setInterval(send, 2000);

  req.on('close',   () => { clearInterval(id); res.end(); });
  req.on('aborted', () => { clearInterval(id); });
});

module.exports = router;
