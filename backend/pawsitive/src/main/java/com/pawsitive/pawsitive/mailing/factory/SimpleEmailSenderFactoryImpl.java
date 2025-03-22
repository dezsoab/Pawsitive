package com.pawsitive.pawsitive.mailing.factory;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class SimpleEmailSenderFactoryImpl implements EmailSenderFactory<BasicEmailSender> {
    private final SimpleEmailSender simpleEmailSender;

    @Override
    public BasicEmailSender create() {
        return simpleEmailSender;
    }
}
