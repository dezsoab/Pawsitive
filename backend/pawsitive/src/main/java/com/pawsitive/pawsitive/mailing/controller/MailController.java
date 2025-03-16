package com.pawsitive.pawsitive.mailing.controller;


import com.pawsitive.pawsitive.mailing.service.SendGridEmailService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/mail")
@AllArgsConstructor
public class MailController {
    private final SendGridEmailService sendGridEmailService;

    @GetMapping("/test")
    public void testSendEmail() {
        sendGridEmailService.sendTemplateEmail();
    }
}
