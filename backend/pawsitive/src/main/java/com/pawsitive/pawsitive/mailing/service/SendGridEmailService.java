package com.pawsitive.pawsitive.mailing.service;

import com.pawsitive.pawsitive.mailing.factory.BasicEmailSender;
import com.pawsitive.pawsitive.mailing.factory.TemplateEmailSender;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class SendGridEmailService {

    private final TemplateEmailSender templateEmailSender;
    private final BasicEmailSender basicEmailSender;

    public void sendTemplateEmail(String from, String to, String templateID) {
        templateEmailSender.sendEmail(from, to, templateID);
    }

    public void sendSimpleEmail(String from, String to, String subject, String body) {
        basicEmailSender.sendEmail(from, to, subject, body);
    }

}
