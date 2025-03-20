package com.pawsitive.pawsitive.mailing.factory;

public interface BasicEmailSender extends BaseEmailSender {
    void sendEmail(String from, String to, String subject, String body);
}
