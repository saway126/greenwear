package com.greenwear.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "wearable_data")
public class WearableData {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "heart_rate")
    private Integer heartRate;
    
    @Column(name = "oxygen_saturation")
    private Double oxygenSaturation;
    
    @Column(name = "temperature")
    private Double temperature;
    
    @Column(name = "timestamp")
    private Long timestamp;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    // 기본 생성자
    public WearableData() {}
    
    // 생성자
    public WearableData(Integer heartRate, Double oxygenSaturation, Double temperature, Long timestamp) {
        this.heartRate = heartRate;
        this.oxygenSaturation = oxygenSaturation;
        this.temperature = temperature;
        this.timestamp = timestamp;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Integer getHeartRate() {
        return heartRate;
    }
    
    public void setHeartRate(Integer heartRate) {
        this.heartRate = heartRate;
    }
    
    public Double getOxygenSaturation() {
        return oxygenSaturation;
    }
    
    public void setOxygenSaturation(Double oxygenSaturation) {
        this.oxygenSaturation = oxygenSaturation;
    }
    
    public Double getTemperature() {
        return temperature;
    }
    
    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }
    
    public Long getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    @Override
    public String toString() {
        return "WearableData{" +
                "id=" + id +
                ", heartRate=" + heartRate +
                ", oxygenSaturation=" + oxygenSaturation +
                ", temperature=" + temperature +
                ", timestamp=" + timestamp +
                ", createdAt=" + createdAt +
                '}';
    }
}
