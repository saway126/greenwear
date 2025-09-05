package com.greenwear.demo.repository;

import com.greenwear.demo.entity.WearableData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface WearableDataRepository extends JpaRepository<WearableData, Long> {
    
    // 디바이스별 최신 데이터 조회
    Optional<WearableData> findTopByDeviceIdOrderByTimestampDesc(String deviceId);
    
    // 사용자별 최신 데이터 조회
    Optional<WearableData> findTopByUserIdOrderByTimestampDesc(String userId);
    
    // 디바이스별 특정 시간 범위 데이터 조회
    List<WearableData> findByDeviceIdAndTimestampBetweenOrderByTimestampDesc(
            String deviceId, LocalDateTime start, LocalDateTime end);
    
    // 사용자별 특정 시간 범위 데이터 조회
    List<WearableData> findByUserIdAndTimestampBetweenOrderByTimestampDesc(
            String userId, LocalDateTime start, LocalDateTime end);
    
    // 경고/위험 상태 데이터 조회
    @Query("SELECT w FROM WearableData w WHERE w.alertTriggered = true OR w.statusLabel IN ('경고', '주의') ORDER BY w.timestamp DESC")
    List<WearableData> findAlertData();
    
    // 특정 디바이스의 경고 데이터
    @Query("SELECT w FROM WearableData w WHERE w.deviceId = :deviceId AND (w.alertTriggered = true OR w.statusLabel IN ('경고', '주의')) ORDER BY w.timestamp DESC")
    List<WearableData> findAlertDataByDeviceId(@Param("deviceId") String deviceId);
    
    // 실시간 모니터링용 최근 데이터 (5분 이내)
    @Query("SELECT w FROM WearableData w WHERE w.timestamp >= :since ORDER BY w.timestamp DESC")
    List<WearableData> findRecentData(@Param("since") LocalDateTime since);
    
    // 디바이스 상태 통계
    @Query("SELECT w.statusLabel, COUNT(w) FROM WearableData w WHERE w.deviceId = :deviceId AND w.timestamp >= :since GROUP BY w.statusLabel")
    List<Object[]> getStatusStatsByDeviceId(@Param("deviceId") String deviceId, @Param("since") LocalDateTime since);
    
    // 사용자별 일일 평균 바이탈
    @Query("SELECT AVG(w.heartRate), AVG(w.respiratoryRate), AVG(w.spo2), AVG(w.coreTemperature) FROM WearableData w WHERE w.userId = :userId AND w.timestamp >= :since")
    List<Object[]> getDailyAverageVitals(@Param("userId") String userId, @Param("since") LocalDateTime since);
    
    // 활성 디바이스 목록 (최근 1시간 이내 데이터가 있는 디바이스)
    @Query("SELECT DISTINCT w.deviceId FROM WearableData w WHERE w.timestamp >= :since")
    List<String> findActiveDevices(@Param("since") LocalDateTime since);
}