package com.toyproject.instagram.controller;

import com.toyproject.instagram.dto.SignupReqDto;
import com.toyproject.instagram.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AccountController {

	private final UserService userService;

	@PostMapping("/user")
	public ResponseEntity<?> signup(@Valid @RequestBody SignupReqDto signupReqDto, BindingResult bindingResult) {

		if(bindingResult.hasErrors()) {
			bindingResult.getFieldErrors().forEach(error -> {
				System.out.println(error.getDefaultMessage());
			});
		}
		userService.signupUser(signupReqDto);
		return ResponseEntity.ok(null);
	}
}
