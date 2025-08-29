package com.greenwear.demo.service;

import com.greenwear.demo.entity.WearableData;
import com.greenwear.demo.repository.WearableDataRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class WearableService {
    
    private final WearableDataRepository wearableDataRepository;
    
    public WearableService(WearableDataRepository wearableDataRepository) {
        this.wearableDataRepository = wearableDataRepository;
    }
    
    /**
     * 웨어러블 데이터 저장
     */
    public WearableData saveWearableData(WearableData data) {
        // 데이터 검증 및 기본값 설정
        if (data.getTimestamp() == null) {
            data.setTimestamp(LocalDateTime.now());
        }
        
        // 경고 상태 확인
        data.setAlertTriggered(data.isCritical() || data.isWarning());
        
        System.out.println("Saving wearable data: Device=" + data.getDeviceId() + 
                         ", Status=" + data.getStatusLabel() + 
                         ", HR=" + data.getHeartRate() + 
                         ", SpO2=" + data.getSpo2());
        
        return wearableDataRepository.save(data);
    }
    
    /**
     * 특정 디바이스의 최신 데이터 조회
     */
    @Transactional(readOnly = true)
    public Optional<WearableData> getLatestDeviceData(String deviceId) {
        return wearableDataRepository.findTopByDeviceIdOrderByTimestampDesc(deviceId);
    }
    
    /**
     * 특정 사용자의 최신 데이터 조회
     */
    @Transactional(readOnly = true)
    public Optional<WearableData> getLatestUserData(String userId) {
        return wearableDataRepository.findTopByUserIdOrderByTimestampDesc(userId);
    }
    
    /**
     * 실시간 데이터 조회 (최근 5분)
     */
    @Transactional(readOnly = true)
    public List<WearableData> getRealtimeData() {
        LocalDateTime fiveMinutesAgo = LocalDateTime.now().minusMinutes(5);
        return wearableDataRepository.findRecentData(fiveMinutesAgo);
    }
    
    /**
     * 경고 데이터 조회
     */
    @Transactional(readOnly = true)
    public List<WearableData> getAlertData() {
        return wearableDataRepository.findAlertData();
    }
    
    /**
     * 디바이스 히스토리 조회
     */
    @Transactional(readOnly = true)
    public List<WearableData> getDeviceHistory(String deviceId, LocalDateTime start, LocalDateTime end) {
        return wearableDataRepository.findByDeviceIdAndTimestampBetweenOrderByTimestampDesc(deviceId, start, end);
    }
    
    /**
     * 디바이스 통계 조회
     */
    @Transactional(readOnly = true)
    public Map<String, Object> getDeviceStats(String deviceId) {
        LocalDateTime oneDayAgo = LocalDateTime.now().minusDays(1);
        
        // 상태별 통계
        List<Object[]> statusStats = wearableDataRepository.getStatusStatsByDeviceId(deviceId, oneDayAgo);
        Map<String, Long> statusCounts = new HashMap<>();
        for (Object[] stat : statusStats) {
            statusCounts.put((String) stat[0], (Long) stat[1]);
        }
        
        // 최신 데이터
        Optional<WearableData> latestData = getLatestDeviceData(deviceId);
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("deviceId", deviceId);
        stats.put("statusCounts", statusCounts);
        stats.put("latestData", latestData.orElse(null));
        stats.put("isOnline", latestData.map(data -> 
            data.getTimestamp().isAfter(LocalDateTime.now().minusMinutes(5))).orElse(false));
        
        return stats;
    }
    
    /**
     * 활성 디바이스 목록 조회
     */
    @Transactional(readOnly = true)
    public List<String> getActiveDevices() {
        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
        return wearableDataRepository.findActiveDevices(oneHourAgo);
    }
    
    /**
     * 중요 알림 트리거
     */
    public void triggerCriticalAlert(WearableData data) {
        System.err.println("CRITICAL ALERT triggered for device " + data.getDeviceId() + 
                          ": Status=" + data.getStatusLabel() + 
                          ", HR=" + data.getHeartRate() + 
                          ", SpO2=" + data.getSpo2() + 
                          ", CoreTemp=" + data.getCoreTemperature());
        
        // 여기에 실제 알림 로직 추가 (푸시 알림, 이메일, SMS 등)
        // 예: notificationService.sendCriticalAlert(data);
    }
    
    /**
     * 디바이스 페어링
     */
    public boolean pairDevice(String deviceId, String userId) {
        try {
            // 페어링 정보를 위한 초기 데이터 생성
            WearableData pairingData = new WearableData();
            pairingData.setDeviceId(deviceId);
            pairingData.setUserId(userId);
            pairingData.setMode("rest");
            pairingData.setHeartRate(0);
            pairingData.setRespiratoryRate(0);
            pairingData.setSpo2(0);
            pairingData.setCoreTemperature(0.0);
            pairingData.setSkinTemperatureDelta(0.0);
            pairingData.setDurationMinutes(0);
            pairingData.setColorStatus("#22c55e");
            pairingData.setStatusLabel("페어링됨");
            pairingData.setAlertTriggered(false);
            pairingData.setBatteryLevel(100);
            pairingData.setSignalStrength(100);
            pairingData.setTimestamp(LocalDateTime.now());
            
            wearableDataRepository.save(pairingData);
            
            System.out.println("Device " + deviceId + " paired with user " + userId);
            return true;
        } catch (Exception e) {
            System.err.println("Failed to pair device " + deviceId + " with user " + userId + ": " + e.getMessage());
            return false;
        }
    }
    
    /**
     * 디바이스 상태 업데이트
     */
    public void updateDeviceStatus(String deviceId, Map<String, Object> statusUpdate) {
        Optional<WearableData> latestData = getLatestDeviceData(deviceId);
        
        if (latestData.isPresent()) {
            WearableData data = latestData.get();
            
            // 상태 업데이트
            if (statusUpdate.containsKey("batteryLevel")) {
                data.setBatteryLevel((Integer) statusUpdate.get("batteryLevel"));
            }
            if (statusUpdate.containsKey("signalStrength")) {
                data.setSignalStrength((Integer) statusUpdate.get("signalStrength"));
            }
            
            // 새로운 타임스탬프로 저장
            data.setId(null); // 새로운 레코드로 저장
            data.setTimestamp(LocalDateTime.now());
            
            wearableDataRepository.save(data);
            
            System.out.println("Updated device status for " + deviceId + ": " + statusUpdate);
        }
    }
}