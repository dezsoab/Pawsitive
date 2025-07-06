package com.pawsitive.pawsitive.messaging.mailing.factory;

import com.pawsitive.pawsitive.messaging.mailing.model.EmailSenderDetail;
import com.pawsitive.pawsitive.messaging.mailing.model.EmailTemplateData;

public interface TemplatedEmailSender extends BaseEmailSender {
    void sendEmail(EmailSenderDetail senderDetail, String to, EmailTemplateData emailTemplate);
}
