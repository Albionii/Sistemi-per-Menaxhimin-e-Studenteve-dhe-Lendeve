package com.projekti.sistemimenaxhimittefakulltetit.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfiguration implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/profile-pictures/**")
                .addResourceLocations("file:////home/medi/Documents/Sistemi-per-Menaxhimin-e-Studenteve-dhe-Lendeve/Sistemi-per-Menaxhimin-e-Studenteve-dhe-Lendeve/backend/sistemi-menaxhimit-te-fakulltetit/file_storage/Users/")
                .setCachePeriod(0)
                .resourceChain(false);
    }
}
