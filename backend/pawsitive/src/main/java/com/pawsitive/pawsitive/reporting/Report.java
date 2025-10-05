package com.pawsitive.pawsitive.reporting;

import com.pawsitive.pawsitive.messaging.mailing.model.EmailSenderDetail;

public interface Report {
    EmailSenderDetail getSenderDetail();
    String getRecipient();
    String getTitle();
    String getContent();
}
