package com.projekti.sistemimenaxhimittefakulltetit.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class AppConfig {
    @Bean
    SecurityFilterChain securityFpilterChain(HttpSecurity http) throws Exception {
        http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(Authorize -> Authorize
                        .requestMatchers("/api/admin/**").hasAnyRole("ADMIN")
                        .requestMatchers("/api/professor/**").hasAnyRole("PROFESSOR")
                        .requestMatchers("/api/student/**").hasAnyRole("STUDENT")
                        .requestMatchers("/api/**").authenticated()
                        .anyRequest().permitAll()
                ).csrf(csrf -> csrf.disable());

        return http.build();
    }
}
