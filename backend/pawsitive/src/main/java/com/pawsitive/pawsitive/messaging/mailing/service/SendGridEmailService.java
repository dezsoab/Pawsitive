package com.pawsitive.pawsitive.messaging.mailing.service;

import com.pawsitive.pawsitive.dto.ContactUsEmailRequestDTO;
import com.pawsitive.pawsitive.dto.ResetPasswordDTO;
import com.pawsitive.pawsitive.dto.ScannedLocationDTO;
import com.pawsitive.pawsitive.geolocation.model.ScannedLocation;
import com.pawsitive.pawsitive.messaging.mailing.model.EmailSenderDetail;
import com.pawsitive.pawsitive.messaging.mailing.model.EmailTemplateData;
import com.pawsitive.pawsitive.constants.EmailTemplateID;
import com.pawsitive.pawsitive.messaging.mailing.factory.BasicEmailSender;
import com.pawsitive.pawsitive.messaging.mailing.factory.TemplateEmailSender;
import com.pawsitive.pawsitive.owner.model.Owner;
import com.pawsitive.pawsitive.pet.model.Pet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

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

    public void sendScannedPet(ScannedLocation location, ScannedLocationDTO scannedLocationDTO) {
        logger.info("Preparing scanned pet email...");

        Pet pet = location.getPet();
        Owner owner = pet.getOwner();

        EmailTemplateData emailTemplateData = new EmailTemplateData(
                EmailTemplateID.SCANNED_PET.getId(scannedLocationDTO.locale())
        );

        emailTemplateData.addDynamicTemplateData("petName", pet.getName());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
        emailTemplateData.addDynamicTemplateData("scanDateTime", formatter.format(location.getScannedAt()));
        emailTemplateData.addDynamicTemplateData("ownerFirstName", owner.getFirstName());
        emailTemplateData.addDynamicTemplateData("lat", location.getLatitude());
        emailTemplateData.addDynamicTemplateData("lon", location.getLongitude());

        logger.info("Sending scanned pet email to: {}", owner.getUser().getEmail());
        templateEmailSender.sendEmail(senderDetail, owner.getUser().getEmail(), emailTemplateData);
    }

    public void sendForgotPassword(String resetURL, String toEmail, String language) {
        logger.info("Preparing reset password email...");
        EmailTemplateData emailTemplateData = new EmailTemplateData(
                EmailTemplateID.RESET_PASSWORD.getId(language)
        );

        emailTemplateData.addDynamicTemplateData("resetURL", resetURL);
        logger.info("Sending reset password email to: {}", toEmail);
        templateEmailSender.sendEmail(senderDetail, toEmail, emailTemplateData);
    }

    public void sendChangedPassword(ResetPasswordDTO dto) {
        logger.info("Preparing password changed email...");
        EmailTemplateData emailTemplateData = new EmailTemplateData(
                EmailTemplateID.PASSWORD_CHANGED.getId(dto.preferredLanguage())
        );

        logger.info("Sending password changed email to: {}", dto.email());
        templateEmailSender.sendEmail(senderDetail, dto.email(), emailTemplateData);
    }
}
