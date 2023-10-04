package com.toyproject.instagram.security;

import com.toyproject.instagram.entity.User;
import com.toyproject.instagram.repository.UserMapper;
import com.toyproject.instagram.service.PrincipalDetailsService;
import com.toyproject.instagram.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.security.Key;
import java.security.Principal;
import java.util.Date;

//JWT 토큰을 관리해주는 로직
@Component
public class JwtTokenProvider {

	private final Key key;
	private final PrincipalDetailsService principalDetailsService;
	// *AutoWired : IoC 컨테이너에서 객체를 자동 주입
	// Value는 application.yml에서 변수 데이터를 자동 주입

	//@Value : 컴포넌트가 IoC에서 생성될때 DI가 됨.
	public JwtTokenProvider(@Value("${jwt.secret}") String secret, @Autowired PrincipalDetailsService principalDetailsService) {
		//Key값을 만들어줌
		key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
		this.principalDetailsService = principalDetailsService;
	}

	// JWT 토큰을 생성
	public String generateAccessToken(Authentication authentication) {
		String accessToken = null;

		//loadUserByUsername할 때 principalUser를 리턴함
		PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();

		//현재기준 +1시간의 객체 생성
//		Date tokenExpiresDate = new Date(new Date().getTime() + (1000 * 30)); //1초 *60 *60 = 1시간
		Date tokenExpiresDate = new Date(new Date().getTime() + (1000 * 60 * 60 * 24)); //1초 *60 *60 = 1시간
		System.out.println(tokenExpiresDate);

		accessToken = Jwts.builder()
				.setSubject("AccessToken")
				.claim("username", principalUser.getUsername())
				.setExpiration(tokenExpiresDate)
				.signWith(key, SignatureAlgorithm.HS256)
				.compact();
		return  accessToken;
	}

	//토큰의 유효성 검사. 예외가 발생하지 않으면 유효 => true반환
	public Boolean validateToken(String token) {
		try {
			//다시 복호화 + 토큰의 유효성 판단 => 못쓰면 예외로 처리, false 반환
			Jwts.parserBuilder()
					.setSigningKey(key)
					.build()
					.parseClaimsJws(token);
		} catch (Exception e) {
			return false;
		}
		return true;
	}

	public String convertToken(String bearerToken) {
		String type = "Bearer ";

		// null 인지 확인, 공백인지 확인
		if(StringUtils.hasText(bearerToken) && bearerToken.startsWith(type)) {
			return bearerToken.substring(type.length()); //'bearer '글자수만큼 앞부분 짜른다
		}
		//??
		return "";
	}

	public Authentication getAuthentication(String accessToken) {
		Authentication authentication = null;

		String username = Jwts
				.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(accessToken)
				.getBody()
				.get("username")
				.toString(); //다운캐스팅 대신 toString


		System.out.println("usenrame : " + username);

		PrincipalUser principalUser = (PrincipalUser) principalDetailsService.loadUserByUsername(username);

		//param : principal, credentials, authorities 순.
		authentication = new UsernamePasswordAuthenticationToken(principalUser, null, null);
		return authentication;
	}
}
