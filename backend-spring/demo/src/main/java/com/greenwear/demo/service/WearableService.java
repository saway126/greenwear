package main.java.com.greenwear.demo.service;

import main.java.com.greenwear.demo.entity.WearableData;
import main.java.com.greenwear.demo.repository.WearableDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.time.LocalDateTime;

@Service
public class WearableService {

    @Autowired
    private WearableDataRepository wearableDataRepository;

    public WearableData saveWearableData(WearableData wearableData) {
        return wearableDataRepository.save(wearableData);
    }
    
    public WearableData saveVitals(WearableData wearableData) {
        return wearableDataRepository.save(wearableData);
    }

    public WearableData getLatestVitals() {
        Optional<WearableData> latest = wearableDataRepository.findTopByOrderByTimestampDesc();
        if (latest.isPresent()) {
            return latest.get();
        } else {
            // 기본값 반환
            WearableData defaultData = new WearableData();
            defaultData.setHeartRate(85);
            defaultData.setOxygenSaturation(98.0);
            defaultData.setTemperature(37.2);
            defaultData.setTimestamp(System.currentTimeMillis());
            return defaultData;
        }
    }

    public List<WearableData> getVitalsHistory(int limit) {
        return wearableDataRepository.findTopByOrderByTimestampDesc(limit);
    }

    public List<WearableData> getAllVitals() {
        return wearableDataRepository.findAll();
    }

    public void deleteVitals(Long id) {
        wearableDataRepository.deleteById(id);
    }

    public WearableData getVitalsById(Long id) {
        return wearableDataRepository.findById(id).orElse(null);
    }
    
    // 새로운 메서드들
    public Optional<WearableData> getLatestDeviceData(String deviceId) {
        return wearableDataRepository.findTopByDeviceIdOrderByTimestampDesc(deviceId);
    }
    
    public Optional<WearableData> getLatestUserData(String userId) {
        // 사용자별 데이터 조회 로직 (사용자-디바이스 매핑 필요)
        return wearableDataRepository.findTopByOrderByTimestampDesc();
    }
    
    public List<WearableData> getRealtimeData() {
        // 최근 5분간의 데이터
        long fiveMinutesAgo = System.currentTimeMillis() - (5 * 60 * 1000);
        return wearableDataRepository.findByTimestampGreaterThan(fiveMinutesAgo);
    }
    
    public List<WearableData> getAlertData() {
        // 경고/위험 상태 데이터
        return wearableDataRepository.findByStatusIn(List.of("warning", "critical"));
    }
    
    public List<WearableData> getDeviceHistory(String deviceId, LocalDateTime start, LocalDateTime end) {
        long startTime = start.atZone(java.time.ZoneId.systemDefault()).toInstant().toEpochMilli();
        long endTime = end.atZone(java.time.ZoneId.systemDefault()).toInstant().toEpochMilli();
        return wearableDataRepository.findByDeviceIdAndTimestampBetween(deviceId, startTime, endTime);
    }
    
    public Map<String, Object> getDeviceStats(String deviceId) {
        List<WearableData> deviceData = wearableDataRepository.findByDeviceIdOrderByTimestampDesc(deviceId);
        
        if (deviceData.isEmpty()) {
            return Map.of("error", "No data found for device: " + deviceId);
        }
        
        // 통계 계산
        double avgHeartRate = deviceData.stream().mapToInt(WearableData::getHeartRate).average().orElse(0.0);
        double avgTemperature = deviceData.stream().mapToDouble(WearableData::getTemperature).average().orElse(0.0);
        int totalSteps = deviceData.stream().mapToInt(WearableData::getStepCount).sum();
        int avgBatteryLevel = deviceData.stream().mapToInt(WearableData::getBatteryLevel).average().orElse(0.0).intValue();
        
        return Map.of(
            "deviceId", deviceId,
            "totalRecords", deviceData.size(),
            "avgHeartRate", Math.round(avgHeartRate * 100.0) / 100.0,
            "avgTemperature", Math.round(avgTemperature * 100.0) / 100.0,
            "totalSteps", totalSteps,
            "avgBatteryLevel", avgBatteryLevel,
            "lastUpdate", deviceData.get(0).getCreatedAt()
        );
    }
    
    public List<String> getActiveDevices() {
        // 최근 10분간 데이터를 전송한 활성 디바이스 목록
        long tenMinutesAgo = System.currentTimeMillis() - (10 * 60 * 1000);
        return wearableDataRepository.findDistinctDeviceIdsByTimestampGreaterThan(tenMinutesAgo);
    }
    
    public boolean pairDevice(String deviceId, String userId) {
        // 디바이스 페어링 로직 (실제로는 별도 테이블에 매핑 저장)
        return true; // 임시 구현
    }
    
    public void updateDeviceStatus(String deviceId, Map<String, Object> statusUpdate) {
        // 디바이스 상태 업데이트 로직
        System.out.println("Updating device status for " + deviceId + ": " + statusUpdate);
    }
    
    public void triggerCriticalAlert(WearableData data) {
        // 위험 상태 알림 처리
        System.out.println("CRITICAL ALERT: Device " + data.getDeviceId() + 
                          " - Heart Rate: " + data.getHeartRate() + 
                          ", Temperature: " + data.getTemperature() + 
                          ", Status: " + data.getStatus());
        
        // 실제로는 이메일, SMS, 푸시 알림 등 발송
    }
}
