package com.toyproject.instagram.security;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;

//JWT 토큰을 관리해주는 로직
@Component
public class JwtTokenProvider {

	private final Key key;
	// *AutoWired : IoC 컨테이너에서 객체를 자동 주입
	// Value는 application.yml에서 변수 데이터를 자동 주입

	//@Value : 컴포넌트가 IoC에서 생성될때 DI가 됨.
	public JwtTokenProvider(@Value("${jwt.secret}") String secret) {
		//Key값을 만들어줌
		key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
	}

	// JWT 토큰을 생성
	public String generateAccessToken(Authentication authentication) {
		return  null;
	}
}
