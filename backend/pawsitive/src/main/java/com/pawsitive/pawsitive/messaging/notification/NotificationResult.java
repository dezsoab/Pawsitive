package com.pawsitive.pawsitive.messaging.notification;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public class NotificationResult {
    Map<NotificationType, Boolean> results = new HashMap<>();
}
