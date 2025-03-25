package com.pawsitive.pawsitive.constants;

public enum EmailTemplateID {
    NOTIFY_CONTACT_US_PROCESSING("d-c9ee22b3a5a742d18dfd089dd625970a"),
    TEST_TEMPLATE_EMAIL("d-5f5d2eac38694f5b9081bcdb5286f087");

    private final String id;

    EmailTemplateID(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
}
