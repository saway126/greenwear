package com.greenwear.demo.controller;

import com.greenwear.demo.entity.WearableData;
import com.greenwear.demo.service.WearableService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wearable")
@CrossOrigin(origins = "*")
public class WearableController {
    
    private final WearableService wearableService;
    
    public WearableController(WearableService wearableService) {
        this.wearableService = wearableService;
    }
    
    /**
     * 웨어러블 디바이스에서 센서 데이터 수신
     */
    @PostMapping("/data")
    public ResponseEntity<Map<String, Object>> receiveWearableData(@RequestBody WearableData data) {
        System.out.println("Received wearable data from device: " + data.getDeviceId());
        
        try {
            WearableData savedData = wearableService.saveWearableData(data);
            
            // 경고 상태일 경우 알림 처리
            if (savedData.isCritical()) {
                wearableService.triggerCriticalAlert(savedData);
            }
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "데이터가 성공적으로 저장되었습니다.",
                "id", savedData.getId(),
                "status", savedData.getStatusLabel()
            ));
            
        } catch (Exception e) {
            System.err.println("Error saving wearable data: " + e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "데이터 저장 중 오류가 발생했습니다: " + e.getMessage()
            ));
        }
    }
    
    /**
     * 특정 디바이스의 최신 상태 조회
     */
    @GetMapping("/device/{deviceId}/latest")
    public ResponseEntity<WearableData> getLatestDeviceData(@PathVariable String deviceId) {
        return wearableService.getLatestDeviceData(deviceId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * 사용자별 최신 상태 조회
     */
    @GetMapping("/user/{userId}/latest")
    public ResponseEntity<WearableData> getLatestUserData(@PathVariable String userId) {
        return wearableService.getLatestUserData(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * 실시간 모니터링 데이터 (최근 5분)
     */
    @GetMapping("/realtime")
    public ResponseEntity<List<WearableData>> getRealtimeData() {
        List<WearableData> realtimeData = wearableService.getRealtimeData();
        return ResponseEntity.ok(realtimeData);
    }
    
    /**
     * 경고/위험 상태 데이터 조회
     */
    @GetMapping("/alerts")
    public ResponseEntity<List<WearableData>> getAlerts() {
        List<WearableData> alerts = wearableService.getAlertData();
        return ResponseEntity.ok(alerts);
    }
    
    /**
     * 특정 디바이스의 시간 범위별 데이터 조회
     */
    @GetMapping("/device/{deviceId}/history")
    public ResponseEntity<List<WearableData>> getDeviceHistory(
            @PathVariable String deviceId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        
        List<WearableData> history = wearableService.getDeviceHistory(deviceId, start, end);
        return ResponseEntity.ok(history);
    }
    
    /**
     * 디바이스 상태 통계
     */
    @GetMapping("/device/{deviceId}/stats")
    public ResponseEntity<Map<String, Object>> getDeviceStats(@PathVariable String deviceId) {
        Map<String, Object> stats = wearableService.getDeviceStats(deviceId);
        return ResponseEntity.ok(stats);
    }
    
    /**
     * 활성 디바이스 목록
     */
    @GetMapping("/devices/active")
    public ResponseEntity<List<String>> getActiveDevices() {
        List<String> activeDevices = wearableService.getActiveDevices();
        return ResponseEntity.ok(activeDevices);
    }
    
    /**
     * 웨어러블 디바이스 페어링/등록
     */
    @PostMapping("/device/pair")
    public ResponseEntity<Map<String, Object>> pairDevice(@RequestBody Map<String, String> request) {
        String deviceId = request.get("deviceId");
        String userId = request.get("userId");
        
        try {
            boolean success = wearableService.pairDevice(deviceId, userId);
            return ResponseEntity.ok(Map.of(
                "success", success,
                "message", success ? "디바이스가 성공적으로 페어링되었습니다." : "페어링에 실패했습니다.",
                "deviceId", deviceId,
                "userId", userId
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "페어링 중 오류가 발생했습니다: " + e.getMessage()
            ));
        }
    }
    
    /**
     * 웨어러블 디바이스 상태 업데이트 (배터리, 신호강도 등)
     */
    @PutMapping("/device/{deviceId}/status")
    public ResponseEntity<Map<String, Object>> updateDeviceStatus(
            @PathVariable String deviceId,
            @RequestBody Map<String, Object> statusUpdate) {
        
        try {
            wearableService.updateDeviceStatus(deviceId, statusUpdate);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "디바이스 상태가 업데이트되었습니다."
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "상태 업데이트 중 오류가 발생했습니다: " + e.getMessage()
            ));
        }
    }
}