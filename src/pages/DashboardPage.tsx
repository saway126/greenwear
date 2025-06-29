import React from 'react';

const DashboardPage = () => (
  <div className="px-4 py-6">
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">실시간 건강 대시보드</h1>
      <p className="text-gray-600">현재 건강 상태와 실시간 데이터를 확인하세요</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">심박수</dt>
              <dd className="text-lg font-medium text-gray-900">72 BPM</dd>
            </dl>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">혈압</dt>
              <dd className="text-lg font-medium text-gray-900">120/80</dd>
            </dl>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">현재 상태</dt>
              <dd className="text-lg font-medium text-green-600">정상</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
    
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">실시간 차트</h2>
      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">여기에 실시간 데이터 차트가 표시됩니다</p>
      </div>
    </div>
  </div>
);

export default DashboardPage; 