export const PHONE_AND_EMAIL = /[a-zA-Z0-9]+@[0-9a-zA-Z]+\.[a-z]*$|^[0-9]{11}/;
export const NAME = /[가-힣]{2,6}$/; //2자리에서 6자리 한글
export const USERNAME = /(?=.*[a-z])[a-z0-9_.]$/;
export const PASSWORD = /(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
//사용자 패스워드에 대한 정규식 - 대소문자 + 숫자 + 특수문자. \\d = 숫자만, \\W = !문자만