package com.pawsitive.pawsitive.mailing.controller;


import com.pawsitive.pawsitive.auth.controller.AuthController;
import com.pawsitive.pawsitive.dto.SimpleEmailRequestDTO;
import com.pawsitive.pawsitive.dto.TemplateEmailRequestDTO;
import com.pawsitive.pawsitive.mailing.service.SendGridEmailService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/mail")
@AllArgsConstructor
public class MailController {
    private static final Logger logger = LoggerFactory.getLogger(MailController.class);

    private final SendGridEmailService sendGridEmailService;

    @PostMapping("/testTemplate")
    public void sendTemplateEmail(@RequestBody TemplateEmailRequestDTO emailRequestDTO) {
        final String TEMPLATE_TEST_ID = "d-5f5d2eac38694f5b9081bcdb5286f087";
        logger.info("Received template email request: {}", TEMPLATE_TEST_ID);
        sendGridEmailService.sendTemplateEmail(emailRequestDTO.from(), emailRequestDTO.to(), TEMPLATE_TEST_ID);
    }

    @PostMapping("/testSimple")
    public void sendSimpleEmail(@RequestBody SimpleEmailRequestDTO emailRequestDTO) {
        logger.info("Received simple email request");
        sendGridEmailService.sendSimpleEmail(emailRequestDTO.from(), emailRequestDTO.to(),
                emailRequestDTO.subject(), emailRequestDTO.body());
    }
}
