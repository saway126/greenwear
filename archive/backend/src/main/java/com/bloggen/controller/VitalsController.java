package com.bloggen.controller;

import com.bloggen.model.EvaluationResult;
import com.bloggen.model.VitalSample;
import com.bloggen.service.VitalsService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.Duration;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.Executors;

@RestController
@RequestMapping("/api/vitals")
@CrossOrigin(origins = "*")
public class VitalsController {

    private final VitalsService vitalsService = new VitalsService();

    public static class VitalsRequest {
        public Integer heartRate;
        public Integer oxygen;
        public Double temperature;
    }

    @PostMapping("/samples")
    public VitalSample sendSample(@RequestBody(required = false) VitalsRequest req,
                                  @RequestParam(required = false) Integer heartRate,
                                  @RequestParam(required = false) Integer oxygen,
                                  @RequestParam(required = false) Double temperature) {
        int hr = req != null && req.heartRate != null ? req.heartRate : (heartRate != null ? heartRate : 85);
        int ox = req != null && req.oxygen != null ? req.oxygen : (oxygen != null ? oxygen : 97);
        double tp = req != null && req.temperature != null ? req.temperature : (temperature != null ? temperature : 36.7);
        return vitalsService.addSample(hr, ox, tp);
    }

    @GetMapping("/samples")
    public VitalSample sendSampleGet(@RequestParam Integer heartRate,
                                     @RequestParam Integer oxygen,
                                     @RequestParam Double temperature) {
        return vitalsService.addSample(heartRate, oxygen, temperature);
    }

    @PostMapping("/evaluate")
    public EvaluationResult evaluate(@RequestBody(required = false) VitalsRequest req,
                                     @RequestParam(required = false) Integer heartRate,
                                     @RequestParam(required = false) Integer oxygen,
                                     @RequestParam(required = false) Double temperature) {
        int hr = req != null && req.heartRate != null ? req.heartRate : (heartRate != null ? heartRate : 85);
        int ox = req != null && req.oxygen != null ? req.oxygen : (oxygen != null ? oxygen : 97);
        double tp = req != null && req.temperature != null ? req.temperature : (temperature != null ? temperature : 36.7);
        return vitalsService.evaluate(hr, ox, tp);
    }

    @GetMapping("/evaluate")
    public EvaluationResult evaluateGet(@RequestParam Integer heartRate,
                                        @RequestParam Integer oxygen,
                                        @RequestParam Double temperature) {
        return vitalsService.evaluate(heartRate, oxygen, temperature);
    }

    @GetMapping("/history")
    public List<VitalSample> history(@RequestParam(name = "limit", defaultValue = "50") int limit) {
        return vitalsService.getHistory(limit);
    }

    @GetMapping(path = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter stream() {
        SseEmitter emitter = new SseEmitter(0L);
        var exec = Executors.newSingleThreadScheduledExecutor();
        var id = UUID.randomUUID().toString();
        exec.scheduleAtFixedRate(() -> {
            try {
                List<VitalSample> hist = vitalsService.getHistory(1);
                VitalSample latest = hist.isEmpty() ? vitalsService.addSample(85, 97, 36.7) : hist.get(0);
                emitter.send(SseEmitter.event().name("vitals").data(latest));
            } catch (IOException e) {
                emitter.completeWithError(e);
            }
        }, 0, Duration.ofSeconds(2).toMillis(), java.util.concurrent.TimeUnit.MILLISECONDS);
        emitter.onCompletion(exec::shutdown);
        emitter.onTimeout(exec::shutdown);
        return emitter;
    }
}
