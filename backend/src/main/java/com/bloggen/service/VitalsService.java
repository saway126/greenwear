package com.bloggen.service;

import com.bloggen.model.EvaluationResult;
import com.bloggen.model.VitalSample;

import java.time.Instant;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class VitalsService {
    private final Deque<VitalSample> history = new ArrayDeque<>();
    private final int maxHistory = 1000;

    public synchronized VitalSample addSample(int heartRate, int oxygen, double temperature) {
        VitalSample sample = new VitalSample(Instant.now(), heartRate, oxygen, temperature);
        history.addLast(sample);
        if (history.size() > maxHistory) {
            history.removeFirst();
        }
        return sample;
    }

    public EvaluationResult evaluate(int heartRate, int oxygen, double temperature) {
        // Very simple threshold logic
        String level = "GREEN";
        String reason = "All vitals within nominal ranges";
        if (oxygen < 92 || heartRate > 120 || temperature >= 38.0) {
            level = "RED";
            reason = "Critical: abnormal vitals detected";
        } else if (oxygen < 95 || heartRate > 100 || temperature >= 37.5) {
            level = "YELLOW";
            reason = "Warning: borderline vitals";
        }
        return new EvaluationResult(level, reason);
    }

    public synchronized List<VitalSample> getHistory(int limit) {
        List<VitalSample> list = new ArrayList<>(history);
        int size = list.size();
        if (limit <= 0 || limit >= size) return list;
        return list.subList(size - limit, size);
    }
}
