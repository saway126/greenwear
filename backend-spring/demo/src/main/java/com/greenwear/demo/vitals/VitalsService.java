package com.greenwear.demo.vitals;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class VitalsService {
    public enum Color { green, yellow, red }
    
    public static record Input(
        String mode,
        Integer age,
        Integer hr,
        Integer rr,
        Integer spo2,
        Double coreTempC,
        Double skinTempDeltaC,
        Integer skinTempMinutes
    ) {}
    
    public static record OutputItem(String metric, Color color, String hex, String label, String message) {}
    
    private String hex(Color c) {
        return switch (c) {
            case green -> "#22c55e";
            case yellow -> "#fbbf24";
            case red -> "#ef4444";
        };
    }
    
    private String label(Color c) {
        return switch (c) {
            case green -> "정상";
            case yellow -> "주의";
            case red -> "경고";
        };
    }
    
    private Color restingHR(int hr) {
        if (hr < 50 || hr > 120) return Color.red;
        if (hr < 60 || hr > 100) return Color.yellow;
        return Color.green;
    }
    
    private Color rr(int rr) {
        if (rr <= 11 || rr >= 25) return Color.red;
        if (rr >= 19 && rr <= 24) return Color.yellow;
        return Color.green;
    }
    
    private Color spo2(int s) {
        if (s <= 90) return Color.red;
        if (s <= 94) return Color.yellow;
        return Color.green;
    }
    
    private Color coreTemp(double t) {
        if (t >= 38.0 || t <= 35.0) return Color.red;
        if (t >= 37.5 || t < 36.1) return Color.yellow;
        return Color.green;
    }
    
    private Color skinDelta(double d, int minutes) {
        double a = Math.abs(d);
        if (a >= 1.5 && minutes >= 30) return Color.red;
        if (a >= 0.7) return Color.yellow;
        return Color.green;
    }
    
    private Color hrExercise(int hr, int age) {
        double hrMax = 220 - age;
        double pct = hr / hrMax;
        if (pct > 0.90) return Color.red;
        if (pct >= 0.77) return Color.yellow;
        if (pct >= 0.50) return Color.green;
        return Color.yellow;
    }
    
    public List<OutputItem> evaluate(Input in) {
        List<OutputItem> out = new ArrayList<>();
        boolean exercise = "exercise".equalsIgnoreCase(in.mode());
        
        if (in.hr() != null) {
            Color c = (exercise && in.age()!=null) ? hrExercise(in.hr(), in.age()) : restingHR(in.hr());
            out.add(new OutputItem("HR", c, hex(c), label(c), c==Color.green? "심박 정상" : c==Color.yellow? "심박 주의" : "심박 경고"));
        }
        
        if (in.rr()!=null) {
            Color c = rr(in.rr());
            out.add(new OutputItem("RR", c, hex(c), label(c), c==Color.green? "호흡 정상" : c==Color.yellow? "호흡 빠름" : "호흡 이상"));
        }
        
        if (in.spo2()!=null) {
            Color c = spo2(in.spo2());
            out.add(new OutputItem("SpO₂", c, hex(c), label(c), c==Color.green? "산소 정상" : c==Color.yellow? "산소 낮음" : "산소 매우 낮음"));
        }
        
        if (in.coreTempC()!=null) {
            Color c = coreTemp(in.coreTempC());
            out.add(new OutputItem("CoreTemp", c, hex(c), label(c), c==Color.green? "체온 정상" : c==Color.yellow? "미열/저체온 경향" : "발열/저체온 경고"));
        }
        
        if (in.skinTempDeltaC()!=null) {
            Color c = skinDelta(in.skinTempDeltaC(), Optional.ofNullable(in.skinTempMinutes()).orElse(0));
            out.add(new OutputItem("SkinΔT", c, hex(c), label(c), c==Color.green? "피부온 정상" : c==Color.yellow? "피부온 변동 주의" : "피부온 비정상 지속"));
        }
        
        return out;
    }
    
    public Color aggregateColor(List<OutputItem> items) {
        if (items == null || items.isEmpty()) {
            return Color.green;
        }
        if (items.stream().anyMatch(item -> item.color() == Color.red)) {
            return Color.red;
        }
        if (items.stream().anyMatch(item -> item.color() == Color.yellow)) {
            return Color.yellow;
        }
        return Color.green;
    }
}
