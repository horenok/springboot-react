package com.ok.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@Configuration
public class WebMvcConfig extends WebMvcConfigurationSupport {

    @Override
    protected void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("GET", "POST")
                .allowedOrigins("*")
                .allowedHeaders("*")
                .allowCredentials(false)
                .maxAge(3600);
    }

    // localhost:8080/api/backing/images/** 로 호출 시 /Users/OK/Documents/springboot-react/src/main/resources/static/images/경로 아래 파일 탐색
    /*@Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/api/backing/images/**")
                .addResourceLocations("file:/Users/OK/Documents/springboot-react/src/main/resources/static/images/");
    }*/
}
