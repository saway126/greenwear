package com.greenwear.demo.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

@Entity
@Table(name = "wearable_data")
public class WearableData {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "device_id", nullable = false)
    private String deviceId;
    
    @Column(name = "user_id")
    private String userId;
    
    @Column(name = "mode", nullable = false)
    private String mode; // "rest" or "exercise"
    
    @Column(name = "heart_rate")
    private Integer heartRate;
    
    @Column(name = "respiratory_rate")
    private Integer respiratoryRate;
    
    @Column(name = "spo2")
    private Integer spo2;
    
    @Column(name = "core_temperature")
    private Double coreTemperature;
    
    @Column(name = "skin_temperature_delta")
    private Double skinTemperatureDelta;
    
    @Column(name = "duration_minutes")
    private Integer durationMinutes;
    
    @Column(name = "color_status")
    private String colorStatus; // "#22c55e", "#fbbf24", "#ef4444"
    
    @Column(name = "status_label")
    private String statusLabel; // "정상", "주의", "경고"
    
    @Column(name = "alert_triggered")
    private Boolean alertTriggered;
    
    @Column(name = "battery_level")
    private Integer batteryLevel;
    
    @Column(name = "signal_strength")
    private Integer signalStrength;
    
    @Column(name = "timestamp", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timestamp;
    
    @Column(name = "created_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (timestamp == null) {
            timestamp = LocalDateTime.now();
        }
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getDeviceId() { return deviceId; }
    public void setDeviceId(String deviceId) { this.deviceId = deviceId; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }
    
    public Integer getHeartRate() { return heartRate; }
    public void setHeartRate(Integer heartRate) { this.heartRate = heartRate; }
    
    public Integer getRespiratoryRate() { return respiratoryRate; }
    public void setRespiratoryRate(Integer respiratoryRate) { this.respiratoryRate = respiratoryRate; }
    
    public Integer getSpo2() { return spo2; }
    public void setSpo2(Integer spo2) { this.spo2 = spo2; }
    
    public Double getCoreTemperature() { return coreTemperature; }
    public void setCoreTemperature(Double coreTemperature) { this.coreTemperature = coreTemperature; }
    
    public Double getSkinTemperatureDelta() { return skinTemperatureDelta; }
    public void setSkinTemperatureDelta(Double skinTemperatureDelta) { this.skinTemperatureDelta = skinTemperatureDelta; }
    
    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }
    
    public String getColorStatus() { return colorStatus; }
    public void setColorStatus(String colorStatus) { this.colorStatus = colorStatus; }
    
    public String getStatusLabel() { return statusLabel; }
    public void setStatusLabel(String statusLabel) { this.statusLabel = statusLabel; }
    
    public Boolean getAlertTriggered() { return alertTriggered; }
    public void setAlertTriggered(Boolean alertTriggered) { this.alertTriggered = alertTriggered; }
    
    public Integer getBatteryLevel() { return batteryLevel; }
    public void setBatteryLevel(Integer batteryLevel) { this.batteryLevel = batteryLevel; }
    
    public Integer getSignalStrength() { return signalStrength; }
    public void setSignalStrength(Integer signalStrength) { this.signalStrength = signalStrength; }
    
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    // 상태 분류 헬퍼 메서드
    public boolean isCritical() {
        return "경고".equals(statusLabel) || "#ef4444".equals(colorStatus);
    }
    
    public boolean isWarning() {
        return "주의".equals(statusLabel) || "#fbbf24".equals(colorStatus);
    }
    
    public boolean isNormal() {
        return "정상".equals(statusLabel) || "#22c55e".equals(colorStatus);
    }
}