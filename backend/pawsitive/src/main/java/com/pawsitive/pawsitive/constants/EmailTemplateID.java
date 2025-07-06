package com.pawsitive.pawsitive.constants;

import java.util.Map;

public enum EmailTemplateID {
    NOTIFY_CONTACT_US_PROCESSING(Map.of(
            "en", "d-c9ee22b3a5a742d18dfd089dd625970a",
            "hu", "d-ab1b33ee831840fdb009a9350141d651",
            "de", "d-fa39818e138346c3ae96cab09b2956d0"
    )),
    WELCOME_REGISTERED(Map.of(
            "en", "d-9a06522950f94ea88305a7f244e0aea7",
            "hu", "d-490d66751aae49848a5133c361c2dac0",
            "de", "d-50b5a07db4744b57900ae858ecdea68b"
    )),
    SCANNED_PET(Map.of(
            "en", "d-f74e842bbeee4eeb84ea8001ab925b5f",
            "hu", "d-1d33ba194631424a8066a71aca98cc85",
            "de", "d-bb92eed1689c410da16e89dca441211c"
    ));

    private final Map<String, String> templateIds;

    EmailTemplateID(Map<String, String> templateData) {
        this.templateIds = templateData;
    }

    public String getId(String language) {
        return templateIds.getOrDefault(language, templateIds.get("en"));
    }
}
