package com.pawsitive.pawsitive.messaging.sms.twillio.service;

import com.pawsitive.pawsitive.dto.ScannedLocationDTO;
import com.pawsitive.pawsitive.exception.SmsSendFailException;
import com.pawsitive.pawsitive.geolocation.model.ScannedLocation;
import com.pawsitive.pawsitive.messaging.mailing.service.SendGridEmailService;
import com.pawsitive.pawsitive.util.string.StringUtil;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.ResourceBundle;

@Service
public class TwilioSmsService implements SmsService {
    private static final Logger logger = LoggerFactory.getLogger(TwilioSmsService.class);

    @Value("${TWILLIO_SID}")
    private String accountSid;

    @Value("${TWILLIO_AUT_TOKEN}")
    private String authToken;

    @Value("${TWILLIO_PHONE_NUMBER}")
    private String fromNumber;

    @PostConstruct
    public void init() {
        Twilio.init(accountSid, authToken);
    }

    @Override
    public void sendSms(String phoneNumberTo, String message) {
        Message.creator(new PhoneNumber(phoneNumberTo), new PhoneNumber(fromNumber), message).create();
    }

    public void sendSmsToOwnerOnScannedLocation(ScannedLocationDTO dto, ScannedLocation location) {
        logger.info("Sending SMS about scanned location to owner");
        try {
            String message = getLocalizedSmsMessage(dto.locale(), dto.pet().name(), dto.latitude(), dto.longitude());
            logger.warn(message);
            sendSms(location.getPet().getOwner().getPhone(), message);
            logger.info("SMS has been sent to owner");
        } catch (Exception e) {
            logger.error("Could not send SMS to owner", e);
            throw new SmsSendFailException("Could not send SMS to owner");
        }
    }

    private String getLocalizedSmsMessage(String localeCode, String petName, double lat, double lon) {
        Locale locale = Locale.forLanguageTag(localeCode);
        ResourceBundle bundle = ResourceBundle.getBundle("messages", locale);
        String template = bundle.getString("sms.message");
        String mapsUrl = String.format("https://www.google.com/maps?q=%s,%s", lat, lon);
        return String.format(template, StringUtil.removeAccent(petName), mapsUrl);
    }
}
