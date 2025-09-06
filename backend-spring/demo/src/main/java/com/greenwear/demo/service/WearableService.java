package com.greenwear.demo.service;

import com.greenwear.demo.entity.WearableData;
import com.greenwear.demo.repository.WearableDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WearableService {

    @Autowired
    private WearableDataRepository wearableDataRepository;

    public WearableData saveVitals(WearableData wearableData) {
        return wearableDataRepository.save(wearableData);
    }

    public WearableData getLatestVitals() {
        Optional<WearableData> latest = wearableDataRepository.findTopByOrderByTimestampDesc();
        if (latest.isPresent()) {
            return latest.get();
        } else {
            // 기본값 반환
            WearableData defaultData = new WearableData();
            defaultData.setHeartRate(85);
            defaultData.setOxygenSaturation(98.0);
            defaultData.setTemperature(37.2);
            defaultData.setTimestamp(System.currentTimeMillis());
            return defaultData;
        }
    }

    public List<WearableData> getVitalsHistory(int limit) {
        return wearableDataRepository.findTopByOrderByTimestampDesc(limit);
    }

    public List<WearableData> getAllVitals() {
        return wearableDataRepository.findAll();
    }

    public void deleteVitals(Long id) {
        wearableDataRepository.deleteById(id);
    }

    public WearableData getVitalsById(Long id) {
        return wearableDataRepository.findById(id).orElse(null);
    }
}
