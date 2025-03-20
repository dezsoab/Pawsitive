package com.pawsitive.pawsitive.mailing.factory;

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

@Component
public class TemplateEmailSender implements TemplatedEmailSender {
    private static final Logger logger = LoggerFactory.getLogger(TemplateEmailSender.class);

    EmailRequestHandler emailRequestHandler;
    private String apiKey;

    public TemplateEmailSender(@Value("${SENDGRID_API_KEY}") String apiKey, EmailRequestHandler emailRequestHandler) {
        this.emailRequestHandler = emailRequestHandler;
        this.apiKey = apiKey;
    }

    @Override
    public void sendEmail(String from, String to, String templateID) {
        try {
            if (templateID == null || templateID.isEmpty()) {
                logger.error("TemplateID is null or empty");
                throw new IllegalArgumentException("Template ID must not be null or empty");
            }

            Mail mail = new Mail();
            mail.setFrom(new Email(from));

            Personalization personalization = new Personalization();
            personalization.addTo(new Email(to));

            mail.addPersonalization(personalization);
            mail.setTemplateId(templateID);

            emailRequestHandler.sendEmailRequest(mail, new SendGrid(apiKey), new Request(), logger);
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw new EmailSendFailedException(e.getMessage());
        }
    }
}
