package com.pawsitive.pawsitive.util.time;

import java.time.Duration;
import java.time.LocalDateTime;

public class ElapsedTimeChecker {

    public static long checkElapsedTimeMillis(LocalDateTime startDate, LocalDateTime endDate) {
        return Duration.between(startDate, endDate).toMillis();
    }
}
