package com.pawsitive.pawsitive.mailing.factory;

import com.pawsitive.pawsitive.mailing.model.EmailSenderDetail;

public interface BasicEmailSender extends BaseEmailSender {
    void sendEmail(EmailSenderDetail emailSenderDetail, String to, String subject, String body);
}
