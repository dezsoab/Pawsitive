package com.pawsitive.pawsitive.mailing.service;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Personalization;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class SendGridEmailService {

    @Value("${SENDGRID_API_KEY}")
    private String apiKey;
    private final String TEMPLATE_TEST_ID = "d-5f5d2eac38694f5b9081bcdb5286f087";

    public void sendTemplateEmail() {
        try {
            Mail mail = new Mail();
            Email from = new Email("binderdezso97random@gmail.com");

            mail.setFrom(from);

            Personalization personalization = new Personalization();
            personalization.addTo(new Email("binderdezso97@gmail.com", "recipient name"));
            mail.addPersonalization(personalization);

            mail.setTemplateId(TEMPLATE_TEST_ID);

            SendGrid sg = new SendGrid(apiKey);
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            Response response = sg.api(request);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

}
