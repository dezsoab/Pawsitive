package com.pawsitive.pawsitive.mailing.service;

import com.pawsitive.pawsitive.exception.EmailSendFailedException;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class EmailRequestHandler {
    private static final Logger logger = LoggerFactory.getLogger(EmailRequestHandler.class);

    public void sendEmailRequest(Mail mail, SendGrid sg, Request request) throws IOException {
        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());
        Response response = sg.api(request);

        if (response.getStatusCode() == 400 ||
                response.getStatusCode() == 401 ||
                response.getStatusCode() == 403) {
            logger.error("Error sending email");
            logger.error("SendGrid API returned error code {}", response.getStatusCode());
            logger.error(response.getBody());
            throw new EmailSendFailedException("Error sending email");
        }

        logger.info("Email is successfully sent. Status: {}", response.getStatusCode());
    }
}
