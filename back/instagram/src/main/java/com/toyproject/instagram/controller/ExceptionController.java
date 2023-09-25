package com.toyproject.instagram.controller;

import exception.SignupException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionController {


	//예외처리
	@ExceptionHandler(SignupException.class)
	public ResponseEntity<?> SignupExceptionHandle(SignupException signupException) {
		return ResponseEntity.badRequest().body(signupException);

	}
}
