package com.pawsitive.pawsitive.mailing.factory;

public interface EmailSenderFactory<T extends BaseEmailSender> {
    T create();
}
