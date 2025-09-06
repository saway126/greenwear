package com.greenwear.demo.repository;

import com.greenwear.demo.entity.WearableData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WearableDataRepository extends JpaRepository<WearableData, Long> {
    
    Optional<WearableData> findTopByOrderByTimestampDesc();
    
    @Query(value = "SELECT * FROM wearable_data ORDER BY timestamp DESC LIMIT ?1", nativeQuery = true)
    List<WearableData> findTopByOrderByTimestampDesc(int limit);
    
    List<WearableData> findByTimestampBetween(Long startTime, Long endTime);
    
    @Query(value = "SELECT * FROM wearable_data WHERE heart_rate > ?1 ORDER BY timestamp DESC", nativeQuery = true)
    List<WearableData> findByHeartRateGreaterThan(Integer heartRate);
    
    @Query(value = "SELECT * FROM wearable_data WHERE oxygen_saturation < ?1 ORDER BY timestamp DESC", nativeQuery = true)
    List<WearableData> findByOxygenSaturationLessThan(Double oxygenSaturation);
    
    @Query(value = "SELECT * FROM wearable_data WHERE temperature > ?1 ORDER BY timestamp DESC", nativeQuery = true)
    List<WearableData> findByTemperatureGreaterThan(Double temperature);
}
