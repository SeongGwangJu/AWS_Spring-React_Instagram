package com.toyproject.instagram.dto;

import lombok.Data;

@Data
public class SigninReqDto {
    private String PhoneOrEmailOrUsername;
    private String loginPassword;
}
