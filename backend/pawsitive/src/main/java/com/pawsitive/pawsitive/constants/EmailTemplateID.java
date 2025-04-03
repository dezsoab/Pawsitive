package com.pawsitive.pawsitive.constants;

import java.util.Map;

public enum EmailTemplateID {
    NOTIFY_CONTACT_US_PROCESSING(Map.of(
            "en", "d-c9ee22b3a5a742d18dfd089dd625970a",
            "hu", "d-ab1b33ee831840fdb009a9350141d651",
            "de", "d-fa39818e138346c3ae96cab09b2956d0"
    ));

    private final Map<String, String> templateIds;

    EmailTemplateID(Map<String, String> templateData) {
        this.templateIds = templateData;
    }

    public String getId(String language) {
        return templateIds.getOrDefault(language, templateIds.get("en"));
    }
}
