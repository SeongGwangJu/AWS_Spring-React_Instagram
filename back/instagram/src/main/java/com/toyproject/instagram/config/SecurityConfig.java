package com.toyproject.instagram.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity  // 현재 내가 만든 시큐리티 설정 정책을 따르겠다.(기본설정이 존재함)
@Configuration
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private final AuthenticateExceptionEntryPoint authenticateExceptionEntryPoint;
	//암호화
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors();    // cors정책을 따름
		http.csrf().disable();   // csrf토큰 비활성화

		http.authorizeRequests()
				.antMatchers("/api/v1/auth/**")     // /api/v1/auth로 시작하는 모든 요청
				.permitAll()   // 인증 없이 모든 요청 허용
				.anyRequest()   // 나머지 모든 요청은
				.authenticated() // 인증을 받아라
				.and()
				.exceptionHandling()
				.authenticationEntryPoint(authenticateExceptionEntryPoint);


	}
}