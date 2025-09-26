package com.pawsitive.pawsitive.reporting.service;

import com.pawsitive.pawsitive.messaging.mailing.factory.BasicEmailSender;
import com.pawsitive.pawsitive.messaging.mailing.model.EmailSenderDetail;
import com.pawsitive.pawsitive.reporting.Report;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ReportSenderService implements ReportSender {
    private static final Logger logger = LoggerFactory.getLogger(ReportSenderService.class);

    private final BasicEmailSender sender;

    public ReportSenderService(BasicEmailSender sender) {
        this.sender = sender;
    }

    @Override
    public void sendReport(Report report) {
        String recipient = report.getRecipient();
        String title = report.getTitle();
        logger.info("Preparing to send report: '{}' to {}", title, recipient);
        try {
            String content = report.getContent();
            EmailSenderDetail senderDetail = report.getSenderDetail();

            sender.sendEmail(senderDetail, recipient, title, content);

            logger.info("Successfully sent report: '{}' to {}", title, recipient);
        } catch (Exception e) {
            logger.error("Failed to send report: '{}' to {}. Error: {}", title, recipient, e.getMessage(), e);
        }
    }
}
