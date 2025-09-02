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
    private String corsAllowedOriginsTest;

    @Value("${CORS_ALLOWED_ORIGINS_PROD}")
    private String corsAllowedOriginsProd;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Combine allowed origins into a single array
        String[] allowedOrigins = Stream.of(corsAllowedOriginsTest, corsAllowedOriginsProd)
                .flatMap(s -> Arrays.stream(s.split(",")))
                .map(String::trim)
                .toArray(String[]::new);

        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
