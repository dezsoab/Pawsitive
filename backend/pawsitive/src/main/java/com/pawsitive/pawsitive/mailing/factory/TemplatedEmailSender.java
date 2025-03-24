package com.pawsitive.pawsitive.mailing.factory;

import com.pawsitive.pawsitive.mailing.model.EmailTemplateData;

public interface TemplatedEmailSender extends BaseEmailSender {
    void sendEmail(String from, String to, EmailTemplateData emailTemplate);
}
