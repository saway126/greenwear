# GreenWear AI/분석

## 소개
심박수, 혈압 등 바이오리듬 데이터를 분석하여 정상/경고/응급 상태를 분류하는 AI 모델 개발

## 폴더 구조
- notebooks: 데이터 분석/모델링 Jupyter 노트북
- models: 학습된 모델 파일
- inference.py: 추론 스크립트

## 예시 노트북 (notebooks/data_analysis.ipynb)
- 데이터 EDA, 전처리, 분류 모델 개발

## 예시 추론 코드 (inference.py)
```python
import joblib
import numpy as np

def predict_status(hr, bp):
    model = joblib.load('models/model.pkl')
    X = np.array([[hr, bp]])
    return model.predict(X)[0]
``` 