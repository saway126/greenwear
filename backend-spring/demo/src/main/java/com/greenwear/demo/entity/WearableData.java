package main.java.com.greenwear.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "wearable_data")
public class WearableData {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "device_id")
    private String deviceId;
    
    @Column(name = "device_name")
    private String deviceName;
    
    @Column(name = "firmware_version")
    private String firmwareVersion;
    
    @Column(name = "heart_rate")
    private Integer heartRate;
    
    @Column(name = "oxygen_saturation")
    private Double oxygenSaturation;
    
    @Column(name = "temperature")
    private Double temperature;
    
    @Column(name = "step_count")
    private Integer stepCount;
    
    @Column(name = "battery_level")
    private Integer batteryLevel;
    
    @Column(name = "signal_strength")
    private Integer signalStrength;
    
    @Column(name = "wifi_connected")
    private Boolean wifiConnected;
    
    @Column(name = "acceleration_x")
    private Double accelerationX;
    
    @Column(name = "acceleration_y")
    private Double accelerationY;
    
    @Column(name = "acceleration_z")
    private Double accelerationZ;
    
    @Column(name = "latitude")
    private Double latitude;
    
    @Column(name = "longitude")
    private Double longitude;
    
    @Column(name = "altitude")
    private Double altitude;
    
    @Column(name = "stress_level")
    private Integer stressLevel;
    
    @Column(name = "activity_level")
    private Integer activityLevel;
    
    @Column(name = "sleep_quality")
    private Integer sleepQuality;
    
    @Column(name = "status")
    private String status;
    
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
    public WearableData(String deviceId, String deviceName, String firmwareVersion,
                       Integer heartRate, Double oxygenSaturation, Double temperature,
                       Integer stepCount, Integer batteryLevel, Integer signalStrength,
                       Boolean wifiConnected, Double accelerationX, Double accelerationY, Double accelerationZ,
                       Double latitude, Double longitude, Double altitude,
                       Integer stressLevel, Integer activityLevel, Integer sleepQuality,
                       String status, Long timestamp) {
        this.deviceId = deviceId;
        this.deviceName = deviceName;
        this.firmwareVersion = firmwareVersion;
        this.heartRate = heartRate;
        this.oxygenSaturation = oxygenSaturation;
        this.temperature = temperature;
        this.stepCount = stepCount;
        this.batteryLevel = batteryLevel;
        this.signalStrength = signalStrength;
        this.wifiConnected = wifiConnected;
        this.accelerationX = accelerationX;
        this.accelerationY = accelerationY;
        this.accelerationZ = accelerationZ;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
        this.stressLevel = stressLevel;
        this.activityLevel = activityLevel;
        this.sleepQuality = sleepQuality;
        this.status = status;
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
    
    // 새로운 필드들의 getter/setter
    public String getDeviceId() { return deviceId; }
    public void setDeviceId(String deviceId) { this.deviceId = deviceId; }
    
    public String getDeviceName() { return deviceName; }
    public void setDeviceName(String deviceName) { this.deviceName = deviceName; }
    
    public String getFirmwareVersion() { return firmwareVersion; }
    public void setFirmwareVersion(String firmwareVersion) { this.firmwareVersion = firmwareVersion; }
    
    public Integer getStepCount() { return stepCount; }
    public void setStepCount(Integer stepCount) { this.stepCount = stepCount; }
    
    public Integer getBatteryLevel() { return batteryLevel; }
    public void setBatteryLevel(Integer batteryLevel) { this.batteryLevel = batteryLevel; }
    
    public Integer getSignalStrength() { return signalStrength; }
    public void setSignalStrength(Integer signalStrength) { this.signalStrength = signalStrength; }
    
    public Boolean getWifiConnected() { return wifiConnected; }
    public void setWifiConnected(Boolean wifiConnected) { this.wifiConnected = wifiConnected; }
    
    public Double getAccelerationX() { return accelerationX; }
    public void setAccelerationX(Double accelerationX) { this.accelerationX = accelerationX; }
    
    public Double getAccelerationY() { return accelerationY; }
    public void setAccelerationY(Double accelerationY) { this.accelerationY = accelerationY; }
    
    public Double getAccelerationZ() { return accelerationZ; }
    public void setAccelerationZ(Double accelerationZ) { this.accelerationZ = accelerationZ; }
    
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    
    public Double getAltitude() { return altitude; }
    public void setAltitude(Double altitude) { this.altitude = altitude; }
    
    public Integer getStressLevel() { return stressLevel; }
    public void setStressLevel(Integer stressLevel) { this.stressLevel = stressLevel; }
    
    public Integer getActivityLevel() { return activityLevel; }
    public void setActivityLevel(Integer activityLevel) { this.activityLevel = activityLevel; }
    
    public Integer getSleepQuality() { return sleepQuality; }
    public void setSleepQuality(Integer sleepQuality) { this.sleepQuality = sleepQuality; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    // 상태 확인 메서드
    public boolean isCritical() {
        return "critical".equals(status);
    }
    
    public String getStatusLabel() {
        switch (status) {
            case "normal": return "정상";
            case "warning": return "주의";
            case "critical": return "위험";
            default: return "알 수 없음";
        }
    }
    
    @Override
    public String toString() {
        return "WearableData{" +
                "id=" + id +
                ", deviceId='" + deviceId + '\'' +
                ", deviceName='" + deviceName + '\'' +
                ", heartRate=" + heartRate +
                ", oxygenSaturation=" + oxygenSaturation +
                ", temperature=" + temperature +
                ", stepCount=" + stepCount +
                ", batteryLevel=" + batteryLevel +
                ", status='" + status + '\'' +
                ", timestamp=" + timestamp +
                ", createdAt=" + createdAt +
                '}';
    }
}
