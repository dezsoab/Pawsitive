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
    SCANNED_PET_WITH_LOCATION(Map.of(
            "en", "d-f74e842bbeee4eeb84ea8001ab925b5f",
            "hu", "d-1d33ba194631424a8066a71aca98cc85",
            "de", "d-bb92eed1689c410da16e89dca441211c"
    )),
    SCANNED_PET_NO_LOCATION(Map.of(
            "en", "d-cb0377555ad14c44bc413e6762e39322",
            "hu", "d-2641a8b2dc3049348892f1c14e8c756a",
            "de", "d-cd28a8fac8954eb5a3e7e4e59a4ed941"
    )),
    RESET_PASSWORD(Map.of(
            "en", "d-f8d2aeb202e34ad4981fd417a5b22cab",
            "hu", "d-645fdbff38f842baac1b413c368bffad",
            "de", "d-9c4b812e63334ae8a7d049889d13eb80"
    )),
    PASSWORD_CHANGED(Map.of(
            "en", "d-4af485bf877149f6b4a891327387a3c7",
            "hu", "d-3aea12f453164c0eb3f20407882a42a3",
            "de", "d-719be1f69b424807ae0225e35fa86a3e"
    ));

    private final Map<String, String> templateIds;

    EmailTemplateID(Map<String, String> templateData) {
        this.templateIds = templateData;
    }

    public String getId(String language) {
        return templateIds.getOrDefault(language, templateIds.get("en"));
    }
}
