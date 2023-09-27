package com.toyproject.instagram.service;

import com.toyproject.instagram.dto.SigninReqDto;
import com.toyproject.instagram.dto.SignupReqDto;
import com.toyproject.instagram.entity.User;
import com.toyproject.instagram.exception.JwtException;
import com.toyproject.instagram.repository.UserMapper;
import com.toyproject.instagram.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    //DI
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

    public void signupUser(SignupReqDto signupReqDto) {
        User user = signupReqDto.toUserEntity(passwordEncoder);
        Integer executeCount = userMapper.saveUser(user);
        System.out.println(executeCount);
    }

    public String signinUser(SigninReqDto signinReqDto) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(signinReqDto.getPhoneOrEmailOrUsername(), signinReqDto.getLoginPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        //JWT
        String accessToken = jwtTokenProvider.generateAccessToken(authentication);
        return accessToken;
    }

    //Proveider로 jwt토큰 검증. 유효하지 않으면 예외 던짐
    public Boolean authenticate(String token) {
        String accessToken = jwtTokenProvider.convertToken(token);
        if(!jwtTokenProvider.validateToken(accessToken)) { //못쓰는 토큰이면(Boolean)
            throw new JwtException("유효하지 않은 에세스 토큰입니다.");
        }
//        #####?
        return null;
    }
}








