package com.toyproject.instagram.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.security.Principal;
import java.util.Date;

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
		String accessToken = null;

		//loadUserByUsername할 때 principalUser를 리턴함
		PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();

		//현재기준 +1시간의 객체 생성
		Date tokenExpiresDate = new Date(new Date().getTime() + (1000 * 60 * 60 * 24)); //1초 *60 *60 = 1시간

		accessToken = Jwts.builder()
				.setSubject("AccessToken")
				.claim("username", principalUser.getUsername())
				.setExpiration(tokenExpiresDate)
				.signWith(key, SignatureAlgorithm.HS256)
				.compact();
		System.out.println(principalUser.getUsername());
		System.out.println(principalUser.getPassword());
		return  accessToken;
	}
}
