import React from 'react';

const MainPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
    <div className="text-center max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-6">
        GreenWear
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        실시간 건강 모니터링
      </h2>
      <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
        웨어러블 센서와 AI로 건강 상태를 실시간으로 확인하세요.<br />
        옷의 색상으로 건강 상태를 시각적으로 표현합니다.
      </p>
      
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <div className="w-6 h-6 bg-green-500 rounded-full"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">정상 상태</h3>
          <p className="text-gray-600">건강한 상태일 때 초록색으로 표시됩니다</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">경고 상태</h3>
          <p className="text-gray-600">주의가 필요할 때 노란색으로 표시됩니다</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <div className="w-6 h-6 bg-red-500 rounded-full"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">응급 상태</h3>
          <p className="text-gray-600">즉시 대응이 필요할 때 빨간색으로 표시됩니다</p>
        </div>
      </div>
    </div>
  </div>
);

export default MainPage; 