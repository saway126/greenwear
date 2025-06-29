import React from 'react';

const AlertPage = () => (
  <div className="px-4 py-6">
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">알림</h1>
      <p className="text-gray-600">건강 상태에 따른 실시간 알림을 확인하세요</p>
    </div>
    
    <div className="space-y-4">
      <div className="bg-green-50 border-l-4 border-green-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <div className="w-5 h-5 bg-green-400 rounded-full"></div>
          </div>
          <div className="ml-3">
            <p className="text-sm text-green-700">
              <strong>정상 상태</strong> - 모든 지표가 정상 범위입니다.
            </p>
            <p className="text-xs text-green-600 mt-1">2분 전</p>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <div className="w-5 h-5 bg-yellow-400 rounded-full"></div>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>주의</strong> - 심박수가 평소보다 높습니다.
            </p>
            <p className="text-xs text-yellow-600 mt-1">15분 전</p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <div className="w-5 h-5 bg-blue-400 rounded-full"></div>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>정보</strong> - 새로운 건강 데이터가 수집되었습니다.
            </p>
            <p className="text-xs text-blue-600 mt-1">1시간 전</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AlertPage; 