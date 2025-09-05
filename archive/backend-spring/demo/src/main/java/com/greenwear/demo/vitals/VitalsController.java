package com.greenwear.demo.vitals;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import com.greenwear.demo.vitals.SampleUploadRequest;

@RestController
@RequestMapping("/vitals")
public class VitalsController {
    private final VitalsService service;
    public VitalsController(VitalsService service) { this.service = service; }

               @PostMapping("/evaluate")
           public ResponseEntity<List<VitalsService.OutputItem>> evaluate(@RequestBody VitalsService.Input in) {
               return ResponseEntity.ok(service.evaluate(in));
           }
           
           @GetMapping("/evaluate")
           public ResponseEntity<List<VitalsService.OutputItem>> evaluateGet(
               @RequestParam(defaultValue = "rest") String mode,
               @RequestParam(required = false) Integer age,
               @RequestParam(required = false) Integer hr,
               @RequestParam(required = false) Integer rr,
               @RequestParam(required = false) Integer spo2,
               @RequestParam(required = false) Double coreTempC,
               @RequestParam(required = false) Double skinTempDeltaC,
               @RequestParam(required = false) Integer skinTempMinutes
           ) {
               VitalsService.Input input = new VitalsService.Input(mode, age, hr, rr, spo2, coreTempC, skinTempDeltaC, skinTempMinutes);
               return ResponseEntity.ok(service.evaluate(input));
           }
           
           @PostMapping("/samples")
           public ResponseEntity<Map<String, Object>> uploadSample(@RequestBody SampleUploadRequest request) {
               try {
                   // 생체신호 평가
                   List<VitalsService.OutputItem> results = service.evaluate(request.toVitalsInput());
                   
                   // 전체 색상 집계
                   VitalsService.Color aggregateColor = service.aggregateColor(results);
                   
                   // 응답 데이터 구성
                   Map<String, Object> response = new HashMap<>();
                   response.put("deviceId", request.deviceId());
                   response.put("timestamp", System.currentTimeMillis());
                   response.put("aggregateColor", aggregateColor.name());
                   response.put("results", results);
                   response.put("message", getColorMessage(aggregateColor));
                   
                   return ResponseEntity.ok(response);
               } catch (Exception e) {
                   Map<String, Object> error = new HashMap<>();
                   error.put("error", "Failed to process vitals data: " + e.getMessage());
                   return ResponseEntity.badRequest().body(error);
               }
           }
           
           private String getColorMessage(VitalsService.Color color) {
               return switch (color) {
                   case green -> "모든 지표가 정상 범위입니다";
                   case yellow -> "일부 지표에 주의가 필요합니다";
                   case red -> "즉시 의료진 확인이 필요합니다";
               };
           }
       }
