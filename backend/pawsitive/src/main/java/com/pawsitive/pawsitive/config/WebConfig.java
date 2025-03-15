package com.pawsitive.pawsitive.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Value("${CORS_ALLOWED_ORIGINS_TEST}")
    private String CORS_ALLOWED_ORIGINS_TEST;

    @Value("${CORS_ALLOWED_ORIGINS_PROD}")
    private String CORS_ALLOWED_ORIGINS_PROD;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://10.0.0.136:3000", "http://localhost:3000",
                        CORS_ALLOWED_ORIGINS_PROD, CORS_ALLOWED_ORIGINS_TEST)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
