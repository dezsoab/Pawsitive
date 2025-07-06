package com.pawsitive.pawsitive.messaging.mailing.factory;

import com.pawsitive.pawsitive.messaging.mailing.model.EmailSenderDetail;

public interface BasicEmailSender extends BaseEmailSender {
    void sendEmail(EmailSenderDetail emailSenderDetail, String to, String subject, String body);
}
