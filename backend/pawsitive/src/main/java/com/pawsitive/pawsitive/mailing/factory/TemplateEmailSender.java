package com.pawsitive.pawsitive.mailing.factory;

import com.pawsitive.pawsitive.mailing.model.EmailTemplateData;
import com.pawsitive.pawsitive.exception.EmailSendFailedException;
import com.pawsitive.pawsitive.mailing.service.EmailRequestHandler;
import com.sendgrid.Request;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Personalization;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class TemplateEmailSender implements TemplatedEmailSender {
    private static final Logger logger = LoggerFactory.getLogger(TemplateEmailSender.class);

    EmailRequestHandler emailRequestHandler;
    private final String apiKey;

    public TemplateEmailSender(@Value("${SENDGRID_API_KEY}") String apiKey, EmailRequestHandler emailRequestHandler) {
        this.emailRequestHandler = emailRequestHandler;
        this.apiKey = apiKey;
    }

    @Override
    public void sendEmail(String from, String to, EmailTemplateData emailTemplate
    ) {
        try {
            if (emailTemplate.getTemplateId() == null || emailTemplate.getTemplateId().isEmpty()) {
                logger.error("TemplateID is null or empty");
                throw new IllegalArgumentException("Template ID cannot be null or empty");
            }

            Mail mail = new Mail();
            mail.setFrom(new Email(from));

            Personalization personalization = new Personalization();
            personalization.addTo(new Email(to));

            addDynamicData(emailTemplate.getDynamicTemplateData(), personalization);

            mail.addPersonalization(personalization);
            mail.setTemplateId(emailTemplate.getTemplateId());

            emailRequestHandler.sendEmailRequest(mail, new SendGrid(apiKey), new Request());
        } catch (Exception e) {
            logger.error("Failed to send email with template ID: " + emailTemplate.getTemplateId(), e);
            throw new EmailSendFailedException(e.getMessage());
        }
    }

    private void addDynamicData(Map<String, Object> dynamicData, Personalization personalization) {
        if (dynamicData != null && !dynamicData.isEmpty()) {
            logger.debug("Adding dynamic data to personalization");
            dynamicData.forEach(personalization::addDynamicTemplateData);
        }
    }
}
