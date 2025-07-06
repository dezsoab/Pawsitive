package com.pawsitive.pawsitive.messaging.sms.twillio.service;

public interface SmsService {
    public void sendSms(String phoneNumberTo, String message);
}
