package com.pawsitive.pawsitive;

import com.pawsitive.pawsitive.user.service.UserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PawsitiveApplication {
    private static final Logger logger = LoggerFactory.getLogger(PawsitiveApplication.class);


    public static void main(String[] args) {
        ConfigurableApplicationContext app = SpringApplication.run(PawsitiveApplication.class, args);
        Environment env = app.getEnvironment();
        logger.info("Active profile: " + String.join(", ", env.getActiveProfiles()));
    }

}
