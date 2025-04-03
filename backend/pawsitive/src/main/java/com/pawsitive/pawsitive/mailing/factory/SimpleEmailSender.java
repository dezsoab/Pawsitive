package com.pawsitive.pawsitive.mailing.factory;

import com.pawsitive.pawsitive.exception.EmailSendFailedException;
import com.pawsitive.pawsitive.mailing.model.EmailSenderDetail;
import com.pawsitive.pawsitive.mailing.service.EmailRequestHandler;
import com.sendgrid.Request;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


@Component
public class SimpleEmailSender implements BasicEmailSender {
    private static final Logger logger = LoggerFactory.getLogger(SimpleEmailSender.class);

    EmailRequestHandler emailRequestHandler;
    private final String apiKey;

    public SimpleEmailSender(@Value("${SENDGRID_API_KEY}") String apiKey, EmailRequestHandler emailRequestHandler) {
        this.apiKey = apiKey;
        this.emailRequestHandler = emailRequestHandler;
    }

    @Override
    public void sendEmail(EmailSenderDetail emailSenderDetail, String to, String subject, String body) {
        Content content = new Content("text/plain", body);
        Mail mail = new Mail(new Email(emailSenderDetail.authorizedSenderEmail(), emailSenderDetail.authorizedSenderName())
                , subject, new Email(to), content);
        try {
            emailRequestHandler.sendEmailRequest(mail, new SendGrid(apiKey), new Request());
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw new EmailSendFailedException(e.getMessage());
        }
    }
}
