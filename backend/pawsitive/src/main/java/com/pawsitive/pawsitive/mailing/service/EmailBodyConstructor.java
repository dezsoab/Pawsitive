package com.pawsitive.pawsitive.mailing.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class EmailBodyConstructor {
    private static final Logger logger = LoggerFactory.getLogger(EmailBodyConstructor.class);

    String constructContactUsEmailBody(String senderName, String senderEmail, String emailBody, String language) {
        StringBuilder emailContent = new StringBuilder();
        emailContent
                .append("Sender Name: ")
                .append(senderName)
                .append("\n")
                .append("Sender Email: ")
                .append(senderEmail)
                .append("\n")
                .append("Language: ")
                .append(language)
                .append("\n")
                .append("\n")
                .append("Email Body: ")
                .append(emailBody)
                .append("\n");
        logger.debug("Constructed email body: {}", emailContent);
        return emailContent.toString();
    }
}