package com.pawsitive.pawsitive.mailing.model;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public class EmailTemplateData {
    private final String templateId;
    private final Map<String, Object> dynamicTemplateData;

    public EmailTemplateData(String templateId) {
        this.templateId = templateId;
        this.dynamicTemplateData = new HashMap<>();
    }

    public EmailTemplateData addDynamicTemplateData(String key, Object value) {
        dynamicTemplateData.put(key, value);
        return this;
    }
}
