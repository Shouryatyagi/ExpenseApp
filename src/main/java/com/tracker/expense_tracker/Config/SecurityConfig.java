package com.tracker.expense_tracker.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // ✅ new syntax in Spring Security 6
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/expense/signup").permitAll()
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}
