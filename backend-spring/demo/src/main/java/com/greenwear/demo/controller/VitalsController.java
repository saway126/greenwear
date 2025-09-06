package com.greenwear.demo.controller;

import com.greenwear.demo.entity.WearableData;
import com.greenwear.demo.service.WearableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@RequestMapping("/api/vitals")
@CrossOrigin(origins = {"http://localhost:5173", "https://greenwear-demo.vercel.app"})
public class VitalsController {

    @Autowired
    private WearableService wearableService;

    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    @GetMapping
    public ResponseEntity<Map<String, Object>> getVitals() {
        try {
            // 최신 생체신호 데이터 가져오기
            WearableData latestData = wearableService.getLatestVitals();
            
            Map<String, Object> response = new HashMap<>();
            response.put("heartRate", latestData.getHeartRate());
            response.put("oxygen", latestData.getOxygenSaturation());
            response.put("temperature", latestData.getTemperature());
            response.put("ledStatus", getLedStatus(latestData));
            response.put("timestamp", latestData.getTimestamp());
            response.put("status", "success");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "생체신호 데이터를 가져오는데 실패했습니다: " + e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> sendVitals(@RequestBody Map<String, Object> vitalsData) {
        try {
            WearableData wearableData = new WearableData();
            wearableData.setHeartRate((Integer) vitalsData.getOrDefault("heartRate", 0));
            wearableData.setOxygenSaturation((Double) vitalsData.getOrDefault("oxygen", 0.0));
            wearableData.setTemperature((Double) vitalsData.getOrDefault("temperature", 0.0));
            wearableData.setTimestamp(System.currentTimeMillis());

            WearableData savedData = wearableService.saveVitals(wearableData);

            // 모든 연결된 클라이언트에게 실시간 데이터 전송
            broadcastVitals(savedData);

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "생체신호 데이터가 성공적으로 저장되었습니다");
            response.put("data", savedData);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "생체신호 데이터 저장에 실패했습니다: " + e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    @PostMapping("/stream/start")
    public ResponseEntity<Map<String, Object>> startStream() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "실시간 스트림이 시작되었습니다");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/stream/stop")
    public ResponseEntity<Map<String, Object>> stopStream() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "실시간 스트림이 중지되었습니다");
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamVitals() {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        emitters.add(emitter);

        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitter.onError((ex) -> emitters.remove(emitter));

        return emitter;
    }

    @GetMapping("/history")
    public ResponseEntity<Map<String, Object>> getVitalsHistory(
            @RequestParam(defaultValue = "100") int limit) {
        try {
            List<WearableData> history = wearableService.getVitalsHistory(limit);
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("data", history);
            response.put("count", history.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "생체신호 히스토리를 가져오는데 실패했습니다: " + e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    private void broadcastVitals(WearableData data) {
        Map<String, Object> eventData = new HashMap<>();
        eventData.put("heartRate", data.getHeartRate());
        eventData.put("oxygen", data.getOxygenSaturation());
        eventData.put("temperature", data.getTemperature());
        eventData.put("ledStatus", getLedStatus(data));
        eventData.put("timestamp", data.getTimestamp());

        emitters.removeIf(emitter -> {
            try {
                emitter.send(SseEmitter.event()
                    .name("vitals")
                    .data(eventData));
                return false;
            } catch (Exception e) {
                return true;
            }
        });
    }

    private String getLedStatus(WearableData data) {
        if (data.getHeartRate() > 90 || data.getOxygenSaturation() < 96) {
            return "빨강";
        } else if (data.getHeartRate() > 80 || data.getTemperature() > 37.5) {
            return "노랑";
        } else {
            return "초록";
        }
    }
}
