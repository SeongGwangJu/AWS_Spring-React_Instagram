package com.toyproject.instagram.controller;

import com.toyproject.instagram.exception.JwtException;
import com.toyproject.instagram.exception.SignupException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionController {


    @ExceptionHandler(SignupException.class)
    public ResponseEntity<?> signupExceptionHandle(SignupException signupException) {
        return ResponseEntity.badRequest().body(signupException.getErrorMap());
    }

    //SignupException가 발생한 경우 호출
    @ExceptionHandler(JwtException.class)
    public ResponseEntity<?> jwtExceptionHandle(JwtException jwtException) {
        return ResponseEntity.badRequest().body(jwtException.getMessage());
    }
//    HTTP 응답을 생성해 예외 메시지를 jwtException.getMessage()를 사용하여 가져와 응답 본문에 포함
//    HTTP 상태 코드 400 (Bad Request)와 함께 예외 메시지를 포함한 응답을 생성
}









