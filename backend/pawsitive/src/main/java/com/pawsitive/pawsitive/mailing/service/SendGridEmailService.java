package com.pawsitive.pawsitive.mailing.service;

import com.pawsitive.pawsitive.dto.ContactUsEmailRequestDTO;
import com.pawsitive.pawsitive.mailing.model.EmailSenderDetail;
import com.pawsitive.pawsitive.mailing.model.EmailTemplateData;
import com.pawsitive.pawsitive.constants.EmailTemplateID;
import com.pawsitive.pawsitive.mailing.factory.BasicEmailSender;
import com.pawsitive.pawsitive.mailing.factory.TemplateEmailSender;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SendGridEmailService {
    private static final Logger logger = LoggerFactory.getLogger(SendGridEmailService.class);

    private final TemplateEmailSender templateEmailSender;
    private final BasicEmailSender basicEmailSender;
    private final EmailBodyConstructor emailBodyConstructor;
    private final EmailSenderDetail senderDetail;
    private final String receiverEmail;

    public SendGridEmailService(
            TemplateEmailSender templateEmailSender,
            BasicEmailSender basicEmailSender,
            EmailBodyConstructor emailBodyConstructor,
            @Value("${AUTHORIZED_SENDER_EMAIL}") String senderEmail,
            @Value("${AUTHORIZED_SENDER_NAME}") String senderName,
            @Value("${AUTHORIZED_RECEIVER_EMAIL}") String receiverEmail
    ) {
        this.templateEmailSender = templateEmailSender;
        this.basicEmailSender = basicEmailSender;
        this.emailBodyConstructor = emailBodyConstructor;
        this.senderDetail = new EmailSenderDetail(senderEmail, senderName);
        this.receiverEmail = receiverEmail;
    }

    public void sendContactUsEmail(ContactUsEmailRequestDTO request) {
        logger.info("Received contact us email request");
        basicEmailSender.sendEmail(senderDetail, receiverEmail, "New \"contact us\" inquiry",
                emailBodyConstructor.constructContactUsEmailBody(request.senderName(), request.senderEmail(), //
                        request.emailBody(), request.language()));
        logger.info("Internal email send OK... now notifying user about processing time...");
        notifyUserAboutInquiryProcessing(request);
    }

    private void notifyUserAboutInquiryProcessing(ContactUsEmailRequestDTO request) {
        EmailTemplateData emailTemplateData = new EmailTemplateData(EmailTemplateID.NOTIFY_CONTACT_US_PROCESSING.getId(request.language()));
        emailTemplateData.addDynamicTemplateData("sender_name", request.senderName());
        emailTemplateData.addDynamicTemplateData("sender_email", request.senderEmail());
        emailTemplateData.addDynamicTemplateData("email_body", request.emailBody());
        templateEmailSender.sendEmail(senderDetail, request.senderEmail(), emailTemplateData);
        logger.info("Successfully notified user about inquiry processing");
    }

    public void sendWelcomeEmail(String firstName, String registeredEmail, String language) {
        logger.info("Processing welcome email to {}...", firstName);
        EmailTemplateData emailTemplateData = new EmailTemplateData(EmailTemplateID.WELCOME_REGISTERED.getId(language));
        emailTemplateData.addDynamicTemplateData("first_name", firstName);
        templateEmailSender.sendEmail(senderDetail, registeredEmail, emailTemplateData);
        logger.info("Successfully sent welcome email to {}...", firstName);
    }
}
