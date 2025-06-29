# GreenWear IoT 센서 시뮬레이터

## 소개
실제 센서 없이 심박수/혈압 등 바이오리듬 데이터를 랜덤/시나리오 기반으로 생성하여 백엔드로 전송하는 시뮬레이터

## 실행 방법
```bash
python sensor_sim.py
```

## 예시 코드 (sensor_sim.py)
```python
import random
import time
import requests

while True:
    data = {
        'heart_rate': random.randint(60, 120),
        'blood_pressure': random.randint(90, 160)
    }
    requests.post('http://localhost:3000/api/health', json=data)
    time.sleep(5)
``` 