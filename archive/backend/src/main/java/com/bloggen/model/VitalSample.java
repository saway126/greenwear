package com.bloggen.model;

import java.time.Instant;

public class VitalSample {
    private Instant timestamp;
    private int heartRate;
    private int oxygen;
    private double temperature;

    public VitalSample() {}

    public VitalSample(Instant timestamp, int heartRate, int oxygen, double temperature) {
        this.timestamp = timestamp;
        this.heartRate = heartRate;
        this.oxygen = oxygen;
        this.temperature = temperature;
    }

    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }

    public int getHeartRate() { return heartRate; }
    public void setHeartRate(int heartRate) { this.heartRate = heartRate; }

    public int getOxygen() { return oxygen; }
    public void setOxygen(int oxygen) { this.oxygen = oxygen; }

    public double getTemperature() { return temperature; }
    public void setTemperature(double temperature) { this.temperature = temperature; }
}
