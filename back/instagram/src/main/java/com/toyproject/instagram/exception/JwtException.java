package com.toyproject.instagram.exception;

//JWT 검증 중 발생하는 예외
public class JwtException extends RuntimeException {
	public JwtException(String message) {
		super(message);
	}
}
