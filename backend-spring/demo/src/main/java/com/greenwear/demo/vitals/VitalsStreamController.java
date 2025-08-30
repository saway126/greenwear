package com.greenwear.demo.vitals;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/vitals")
@CrossOrigin(origins = "http://localhost:5173")
public class VitalsStreamController {

    private final VitalsService vitalsService;
    private final Map<String, Boolean> activeStreams = new ConcurrentHashMap<>();
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(10);

    public VitalsStreamController(VitalsService vitalsService) {
        this.vitalsService = vitalsService;
    }

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamVitals(
            @RequestParam String deviceId,
            @RequestParam(defaultValue = "2000") long intervalMs
    ) {
        // 스트림 활성화 상태 기록
        activeStreams.put(deviceId, true);
        
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        
        // 주기적으로 데이터 전송
        scheduler.scheduleAtFixedRate(() -> {
            try {
                // 연결 상태 확인
                if (emitter == null) {
                    return;
                }
                
                // 생체신호 데이터 생성
                VitalsService.Input input = generateMockVitals();
                var results = vitalsService.evaluate(input);
                
                // SSE 이벤트 데이터 생성
                var eventData = Map.of(
                    "timestamp", System.currentTimeMillis(),
                    "deviceId", deviceId,
                    "vitals", results,
                    "overallStatus", calculateOverallStatus(results),
                    "sequence", System.currentTimeMillis()
                );
                
                emitter.send(SseEmitter.event()
                    .id(String.valueOf(System.currentTimeMillis()))
                    .name("vital")
                    .data(eventData)
                );
                
            } catch (Exception e) {
                // 에러 발생 시 스트림 종료
                try {
                    emitter.send(SseEmitter.event()
                        .name("error")
                        .data("Stream error: " + e.getMessage())
                    );
                } catch (IOException ioException) {
                    // 무시
                }
                emitter.complete();
                activeStreams.remove(deviceId);
            }
        }, 0, intervalMs, TimeUnit.MILLISECONDS);
        
        // 연결 종료 시 정리
        emitter.onCompletion(() -> {
            activeStreams.remove(deviceId);
            System.out.println("SSE stream completed for device: " + deviceId);
        });
        
        emitter.onTimeout(() -> {
            activeStreams.remove(deviceId);
            System.out.println("SSE stream timeout for device: " + deviceId);
        });
        
        emitter.onError((ex) -> {
            activeStreams.remove(deviceId);
            System.out.println("SSE stream error for device: " + deviceId + ": " + ex.getMessage());
        });
        
        return emitter;
    }

    @GetMapping("/stream/status")
    public Map<String, Object> getStreamStatus() {
        return Map.of(
            "activeStreams", activeStreams.size(),
            "devices", activeStreams.keySet()
        );
    }

    private VitalsService.Input generateMockVitals() {
        // 실시간 생체신호 시뮬레이션
        int hr = 60 + (int)(Math.random() * 40); // 60-100 BPM
        int rr = 12 + (int)(Math.random() * 8);  // 12-20 breaths/min
        int spo2 = 95 + (int)(Math.random() * 5); // 95-100%
        double temp = 36.5 + (Math.random() * 1.0); // 36.5-37.5°C
        
        return new VitalsService.Input(
            "rest",
            30, // age
            hr,
            rr,
            spo2,
            temp,
            0.0, // skinTempDeltaC
            0    // skinTempMinutes
        );
    }

    private String calculateOverallStatus(java.util.List<VitalsService.OutputItem> results) {
        if (results.stream().anyMatch(item -> item.color() == VitalsService.Color.red)) {
            return "red";
        } else if (results.stream().anyMatch(item -> item.color() == VitalsService.Color.yellow)) {
            return "yellow";
        } else {
            return "green";
        }
    }
}
