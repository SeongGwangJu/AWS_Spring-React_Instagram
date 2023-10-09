package com.toyproject.instagram.service;

import com.toyproject.instagram.dto.SigninReqDto;
import com.toyproject.instagram.dto.SignupReqDto;
import com.toyproject.instagram.entity.User;
import com.toyproject.instagram.exception.JwtException;
import com.toyproject.instagram.exception.SignupException;
import com.toyproject.instagram.repository.UserMapper;
import com.toyproject.instagram.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

        String emailPattern = "^[a-zA-Z0-9]+@[0-9a-zA-Z]+\\.[a-z]*$";
        String phonePattern = "^[0-9]{11}+$";

        Pattern emailRegex = Pattern.compile(emailPattern);
        Pattern phoneRegex = Pattern.compile(phonePattern);

        Matcher emailMatcher = emailRegex.matcher(signupReqDto.getPhoneOrEmail());
        Matcher phoneMatcher = phoneRegex.matcher(signupReqDto.getPhoneOrEmail());

/* 위를 4줄로 표현
        Matcher emailMatcher = Pattern.compile("^[a-zA-Z0-9]+@[0-9a-zA-Z]+\\.[a-z]*$")
                .matcher(signupReqDto.getPhoneOrEmail());
        Matcher phoneMatcher = Pattern.compile("^[0-9]{11}+$")
                .matcher(signupReqDto.getPhoneOrEmail());
*/
        if(emailMatcher.matches()) {
            user.setEmail(signupReqDto.getPhoneOrEmail());
        }

        if(phoneMatcher.matches()) {
            user.setPhone(signupReqDto.getPhoneOrEmail());
        }

        checkDuplicated(user);
        userMapper.saveUser(user);

//        Integer executeCount = userMapper.saveUser(user);
//        System.out.println(executeCount);
    }

    private void checkDuplicated(User user) {
        if(StringUtils.hasText(user.getPhone())) {
            //null이 아니다 -> 중복
            if(userMapper.findUserByPhone(user.getPhone()) != null) {
                Map<String, String> errorMap = new HashMap<>();
                errorMap.put("phone", "이미 사용중인 연락처입니다.");
                throw new SignupException(errorMap);
            }
        }
        if(StringUtils.hasText(user.getEmail())) {
            if(userMapper.findUserByEmail(user.getEmail()) != null) {
                Map<String, String> errorMap = new HashMap<>();
                errorMap.put("email", "이미 사용중인 이메일입니다.");
                throw new SignupException(errorMap);
            }
        }
        if(StringUtils.hasText(user.getUsername())) {
            if(userMapper.findUserByUsername(user.getUsername()) != null) {
                Map<String, String> errorMap = new HashMap<>();
                errorMap.put("username", "이미 사용중인 사용자이름입니다.");
                throw new SignupException(errorMap);
            }
        }
    }

    public String signinUser(SigninReqDto signinReqDto) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(signinReqDto.getPhoneOrEmailOrUsername(), signinReqDto.getLoginPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        //JWT
        String accessToken = jwtTokenProvider.generateAccessToken(authentication);
        return accessToken;
    }

    //Provider로 jwt토큰 검증. 유효하지 않으면 예외 던짐

    public Boolean authenticate(String token) {
        String accessToken = jwtTokenProvider.convertToken(token);
        if(!jwtTokenProvider.validateToken(accessToken)) {     //못쓰는 토큰이면(Boolean)
            throw new JwtException("사용자 정보가 만료되었습니다. 다시 로그인하세요.");
        }
        return true;
    }
}








