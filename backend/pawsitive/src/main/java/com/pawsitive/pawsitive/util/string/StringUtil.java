package com.pawsitive.pawsitive.util.string;

import java.text.Normalizer;

public class StringUtil {
    public static String removeAccent(String text) {
        return Normalizer.normalize(text, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "");
    }
}
