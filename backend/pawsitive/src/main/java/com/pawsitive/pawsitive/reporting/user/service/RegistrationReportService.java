package com.pawsitive.pawsitive.reporting.user.service;

import com.pawsitive.pawsitive.messaging.mailing.model.EmailSenderDetail;
import com.pawsitive.pawsitive.reporting.Report;
import com.pawsitive.pawsitive.user.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class RegistrationReportService implements Report {
    private final UserService userService;

    private final String recipient;
    private final String senderEmail;
    private final String senderName;

    public RegistrationReportService(
            UserService userService,
            @Value("${AUTHORIZED_RECEIVER_EMAIL}") String recipient,
            @Value("${AUTHORIZED_SENDER_EMAIL}") String senderEmail,
            @Value("${AUTHORIZED_SENDER_NAME}") String senderName
    ) {
        this.userService = userService;
        this.recipient = recipient;
        this.senderEmail = senderEmail;
        this.senderName = senderName;
    }

    @Override
    public EmailSenderDetail getSenderDetail() {
        return new EmailSenderDetail(senderEmail, senderName);
    }

    @Override
    public String getRecipient() {
        return recipient;
    }

    @Override
    public String getTitle() {
        return "Daily Registration Report";
    }

    @Override
    public String getContent() {
        LocalDate today = LocalDate.now();
        long count = userService.countUsersByRegistrationDate(today);
        return "Number of users registered today: " + count;
    }
}
