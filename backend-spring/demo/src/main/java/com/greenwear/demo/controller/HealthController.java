package com.greenwear.demo.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class HealthController {

    @Value("${spring.profiles.active:default}")
    private String activeProfile;

    @Value("${server.port:8080}")
    private String serverPort;

    private Map<String, Object> createHealthResponse() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("message", "GreenWear Spring Boot API is running");
        response.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        response.put("profile", activeProfile);
        response.put("port", serverPort);
        response.put("version", "1.0.0");
        return response;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(createHealthResponse());
    }

    @GetMapping("/api/health")
    public ResponseEntity<Map<String, Object>> apiHealth() {
        return ResponseEntity.ok(createHealthResponse());
    }

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> root() {
        Map<String, Object> response = createHealthResponse();
        response.put("message", "GreenWear Spring Boot API - Root Endpoint");
        return ResponseEntity.ok(response);
    }
} 