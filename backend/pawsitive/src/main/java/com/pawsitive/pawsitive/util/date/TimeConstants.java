package com.pawsitive.pawsitive.util.date;

public enum TimeConstants {
    ;

    TimeConstants() {
    }

    public static final long ZERO = 0L;
    public static final long ONE_MINUTE = 60L;
    public static final long ONE_HOUR = 60 * 60L;
    public static final long ONE_DAY = 24 * ONE_HOUR;
    public static final long ONE_WEEK = 7 * ONE_DAY;
    public static final long ONE_MONTH = 30 * ONE_DAY;
    public static final long ONE_YEAR = 365 * ONE_DAY;

    public static long getOneYearInMillis() {
        return System.currentTimeMillis() + ONE_YEAR * 1000L;
    }
}
