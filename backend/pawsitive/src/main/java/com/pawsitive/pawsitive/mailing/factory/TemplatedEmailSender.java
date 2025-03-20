package com.pawsitive.pawsitive.mailing.factory;

public interface TemplatedEmailSender extends BaseEmailSender {
    void sendEmail(String from, String to, String templateID);
}
