package com.greenwear.demo.controller;

import com.greenwear.demo.entity.Product;
import com.greenwear.demo.repository.ProductRepository;
import com.greenwear.demo.service.CustomUserDetailsService;
import com.greenwear.demo.service.WearableService;
import com.greenwear.demo.vitals.VitalsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ApiMobileCompatController {

    private final WearableService wearableService;
    private final ProductRepository productRepository;
    private final VitalsService vitalsService;
    private final List<PushRegistration> pushRegistrations = new CopyOnWriteArrayList<>();

    public ApiMobileCompatController(WearableService wearableService,
                                     ProductRepository productRepository,
                                     VitalsService vitalsService) {
        this.wearableService = wearableService;
        this.productRepository = productRepository;
        this.vitalsService = vitalsService;
    }

    @PostMapping("/ai-analysis")
    public ResponseEntity<?> analyze(@RequestBody AiAnalysisRequest request) {
        VitalsService.Input input = new VitalsService.Input(
                "exercise".equalsIgnoreCase(request.activity()) ? "exercise" : "rest",
                request.age(),
                request.heartRate(),
                null,
                request.oxygenSaturation(),
                request.temperature(),
                null,
                null
        );
        List<VitalsService.OutputItem> items = vitalsService.evaluate(input);
        VitalsService.Color color = vitalsService.aggregateColor(items);

        double score = switch (color) {
            case green -> 0.9;
            case yellow -> 0.7;
            case red -> 0.4;
        };

        Map<String, Object> analysis = new HashMap<>();
        analysis.put("cardiovascularRisk", Math.max(0.1, 1.0 - score));
        analysis.put("stressLevel", Math.max(0.2, 1.0 - score));
        analysis.put("sleepQuality", Math.min(0.95, score));
        analysis.put("exerciseEffectiveness", Math.min(0.95, score));
        analysis.put("overallHealthScore", score);

        List<String> recommendations = new ArrayList<>();
        if (color == VitalsService.Color.red) {
            recommendations.add("즉시 휴식 후 필요 시 의료진과 상담하세요.");
            recommendations.add("산소포화도와 심박수를 5분 간격으로 재확인하세요.");
        } else if (color == VitalsService.Color.yellow) {
            recommendations.add("수분 섭취 및 가벼운 스트레칭을 권장합니다.");
            recommendations.add("오늘 활동 강도를 중간 수준으로 유지하세요.");
        } else {
            recommendations.add("현재 상태가 양호합니다. 규칙적인 운동을 유지하세요.");
            recommendations.add("수면 루틴을 유지하면 건강 점수를 지속 개선할 수 있습니다.");
        }

        return ResponseEntity.ok(Map.of(
                "success", true,
                "data", Map.of(
                        "analysis", analysis,
                        "recommendations", recommendations,
                        "timestamp", LocalDateTime.now().toString()
                )
        ));
    }

    @GetMapping("/products")
    public ResponseEntity<?> products() {
        List<Product> all = productRepository.findAll();
        List<Map<String, Object>> payload = all.stream()
                .filter(product -> Boolean.TRUE.equals(product.getIsActive()))
                .limit(50)
                .map(product -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("id", product.getId());
                    item.put("name", product.getName());
                    item.put("description", product.getDescription() == null ? "" : product.getDescription());
                    item.put("category", product.getCategory() == null ? "GENERAL" : product.getCategory().name().toLowerCase());
                    item.put("ecoRating", product.getEcoRating() == null ? 3 : product.getEcoRating());
                    item.put("price", product.getPrice() == null ? 0 : product.getPrice());
                    return item;
                })
                .collect(Collectors.toList());

        if (payload.isEmpty()) {
            payload = List.of(
                    Map.of(
                            "id", 1,
                            "name", "친환경 기능성 티셔츠",
                            "description", "재활용 폴리에스터 기반 운동복",
                            "category", "sportswear",
                            "ecoRating", 4,
                            "price", 39000
                    ),
                    Map.of(
                            "id", 2,
                            "name", "저탄소 러닝화",
                            "description", "탄소배출 최소화 소재 적용",
                            "category", "shoes",
                            "ecoRating", 5,
                            "price", 89000
                    )
            );
        }

        return ResponseEntity.ok(Map.of(
                "success", true,
                "data", payload
        ));
    }

    @GetMapping("/wearable/devices")
    public ResponseEntity<?> devices() {
        List<String> activeDevices = wearableService.getActiveDevices();
        List<Map<String, Object>> data = activeDevices.stream()
                .map(deviceId -> wearableService.getLatestDeviceData(deviceId)
                        .map(latest -> {
                            Map<String, Object> item = new HashMap<>();
                            item.put("deviceId", deviceId);
                            item.put("deviceName", "Wearable-" + deviceId);
                            item.put("currentStatus", latest.getStatusLabel() == null ? "unknown" : latest.getStatusLabel());
                            return item;
                        })
                        .orElse(Map.of(
                                "deviceId", deviceId,
                                "deviceName", "Wearable-" + deviceId,
                                "currentStatus", "unknown"
                        )))
                .collect(Collectors.toList());

        return ResponseEntity.ok(Map.of(
                "success", true,
                "data", data
        ));
    }

    @PostMapping("/mobile/device/link")
    public ResponseEntity<?> linkDevice(@RequestBody LinkRequest request, Authentication authentication) {
        if (request.deviceId() == null || request.deviceId().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "deviceId는 필수입니다."
            ));
        }

        String userId = "mobile-user";
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetailsService.UserPrincipal principal) {
            userId = String.valueOf(principal.getId());
        }

        boolean paired = wearableService.pairDevice(request.deviceId(), userId);
        if (!paired) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "디바이스 연동에 실패했습니다."
            ));
        }

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "디바이스 연동이 완료되었습니다."
        ));
    }

    @PostMapping("/push/register")
    public ResponseEntity<?> registerPush(@RequestBody PushRegisterRequest request, Authentication authentication) {
        if (request.token() == null || request.token().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "푸시 토큰이 필요합니다."
            ));
        }

        String userId = "mobile-user";
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetailsService.UserPrincipal principal) {
            userId = String.valueOf(principal.getId());
        }

        boolean exists = pushRegistrations.stream().anyMatch(item -> item.token().equals(request.token()));
        if (!exists) {
            pushRegistrations.add(new PushRegistration(request.token(), request.platform(), request.deviceId(), userId));
        }

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "푸시 토큰이 등록되었습니다.",
                "totalRegistrations", pushRegistrations.size()
        ));
    }

    public record AiAnalysisRequest(
            Integer heartRate,
            String bloodPressure,
            Double temperature,
            Integer oxygenSaturation,
            String activity,
            Integer age,
            String gender
    ) {}

    public record LinkRequest(String deviceId, String deviceName, String platform) {}

    public record PushRegisterRequest(String token, String platform, String deviceId) {}

    private record PushRegistration(String token, String platform, String deviceId, String userId) {}
}
