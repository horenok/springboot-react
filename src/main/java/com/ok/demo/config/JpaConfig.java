package com.ok.demo.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
//@ComponentScan(basePackages = {"com.kt.aicc.ktbot"})
@EntityScan({"com.ok.demo.entity"})
//@EnableJpaRepositories("com.kt.aicc.ktbot")
@EnableJpaAuditing
public class JpaConfig {}