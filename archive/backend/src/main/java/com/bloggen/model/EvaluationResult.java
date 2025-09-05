package com.bloggen.model;

public class EvaluationResult {
    private String level; // GREEN, YELLOW, RED
    private String reason;

    public EvaluationResult() {}

    public EvaluationResult(String level, String reason) {
        this.level = level;
        this.reason = reason;
    }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
