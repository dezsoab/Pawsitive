package com.pawsitive.pawsitive.mailing.factory;

import com.pawsitive.pawsitive.mailing.model.EmailSenderDetail;
import com.pawsitive.pawsitive.mailing.model.EmailTemplateData;

public interface TemplatedEmailSender extends BaseEmailSender {
    void sendEmail(EmailSenderDetail senderDetail, String to, EmailTemplateData emailTemplate);
}
