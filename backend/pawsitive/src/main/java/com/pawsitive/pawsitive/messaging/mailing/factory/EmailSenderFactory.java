package com.pawsitive.pawsitive.messaging.mailing.factory;

public interface EmailSenderFactory<T extends BaseEmailSender> {
    T create();
}
