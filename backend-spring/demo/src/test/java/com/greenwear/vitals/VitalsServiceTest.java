package com.greenwear.vitals;

import org.junit.jupiter.api.Test;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

public class VitalsServiceTest {

    @Test
    void resting_hr_edges() {
        VitalsService s = new VitalsService();
        var out = s.evaluate(new VitalsService.Input("rest",  null, 49, null, null, null, null, null));
        assertTrue(out.stream().anyMatch(i -> i.metric().equals("HR") && i.color()== VitalsService.Color.red));
    }

    @Test
    void exercise_hr_zone() {
        VitalsService s = new VitalsService();
        var out = s.evaluate(new VitalsService.Input("exercise", 30, 170, null, null, null, null, null));
        assertTrue(out.stream().anyMatch(i -> i.metric().equals("HR")));
    }
}
