package com.pawsitive.pawsitive.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.stream.Stream;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Value("${CORS_ALLOWED_ORIGINS_TEST}")
    private String CORS_ALLOWED_ORIGINS_TEST;

    @Value("${CORS_ALLOWED_ORIGINS_PROD}")
    private String CORS_ALLOWED_ORIGINS_PROD;

    @Value("${CORS_ALLOWED_ORIGINS_PROD_WWW}")
    private String CORS_ALLOWED_ORIGINS_PROD_WWW;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://10.0.0.136:3000", "http://localhost:3000",
                        CORS_ALLOWED_ORIGINS_PROD, CORS_ALLOWED_ORIGINS_TEST, CORS_ALLOWED_ORIGINS_PROD_WWW)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
