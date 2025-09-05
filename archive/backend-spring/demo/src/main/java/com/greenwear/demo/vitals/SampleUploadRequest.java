package com.greenwear.demo.vitals;

public record SampleUploadRequest(
    String deviceId,
    String mode,
    Integer age,
    Integer hr,
    Integer rr,
    Integer spo2,
    Double coreTempC,
    Double skinTempDeltaC,
    Integer skinTempMinutes
) {
    public VitalsService.Input toVitalsInput() {
        return new VitalsService.Input(mode, age, hr, rr, spo2, coreTempC, skinTempDeltaC, skinTempMinutes);
    }
}
