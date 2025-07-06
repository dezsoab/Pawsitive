package com.pawsitive.pawsitive.messaging.mailing.controller;

import com.pawsitive.pawsitive.dto.ContactUsEmailRequestDTO;
import com.pawsitive.pawsitive.dto.RESTResponse;
import com.pawsitive.pawsitive.messaging.mailing.service.SendGridEmailService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/mail")
@AllArgsConstructor
public class MailController {
    private final SendGridEmailService sendGridEmailService;

    @PostMapping("/emailContactUs")
    public ResponseEntity<RESTResponse> emailContactUs(@RequestBody ContactUsEmailRequestDTO email) {
        sendGridEmailService.sendContactUsEmail(email);
        return ResponseEntity.ok(new RESTResponse("Email inquiry successfully sent. Thank you!"));
    }
}
