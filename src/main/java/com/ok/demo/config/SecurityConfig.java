package com.ok.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {

        http.csrf().disable(); //csrf공격방지 해제 (403 에러 방지)

        http.sessionManagement()
                .maximumSessions(1)
                .maxSessionsPreventsLogin(false)
                .expiredUrl("http://localhost:3000/login"); //로컬 환경일때만 적용

        http.authorizeRequests()
                .antMatchers("/**").permitAll() // 모든 경로 다 허용
                .anyRequest().authenticated();

        // logout
        http.logout()
                .logoutUrl("/api/users/logout")
                .deleteCookies("BACKINGSESSIONID")
                .logoutSuccessUrl("http://localhost:3000/login");//로컬 환경일때만 적용
    }
}