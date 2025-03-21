package com.pawsitive.pawsitive.mailing.factory;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class TemplateEmailSenderFactoryImpl implements EmailSenderFactory<TemplatedEmailSender> {
    private final TemplateEmailSender templateEmailSender;

    @Override
    public TemplatedEmailSender create() {
        return templateEmailSender;
    }
}
