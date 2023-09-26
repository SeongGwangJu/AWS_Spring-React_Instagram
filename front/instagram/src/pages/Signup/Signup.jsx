import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from './Style'
import SigninAndUpLayout from "../../components/SigninAndUpLayout/SigninAndUpLayout";
import Top from "../../components/SigninAndUpLayout/Top/Top";
import Input from "../../components/SigninAndUpLayout/Input/Input";
import OrBar from "../../components/SigninAndUpLayout/OrBar/OrBar";
import { useNavigate } from "react-router";
import { signup } from "../../apis/api/account";

function Signup(props) {

	const navigate = useNavigate();

	const emptyAccount = {
		phoneOrEmail: "",
		name: "",
		username: "",
		password: ""
	}
	const [ account, setAccount ] = useState(emptyAccount);
	const [ isAccountValuesEmpty, setIsAccountValuesEmpty ] = useState(true);
	const [ errorMsg, setErrorMsg ] = useState("");

	const changeAccount = (name, value) => {
		setAccount({
			...account,
			[name]: value
		});
	}

	useEffect(() => {
		setIsAccountValuesEmpty(Object.values(account).includes(""))
	}, [account])

	const handleSignupSubmit = async () => {
		try{
			await signup(account);
			navigate("/accounts/login");

		} catch(error) {
			const responseErrorMsg = error.response.data
			const keys = Object.keys(responseErrorMsg);

			if(keys.includes("username")) {
				setErrorMsg(responseErrorMsg.username);
			}else if(keys.includes("phoneOrEmail")) {
				setErrorMsg(responseErrorMsg.phoneOrEmail);
			}else if(keys.includes("name")) {
				setErrorMsg(responseErrorMsg.name);
			}else if(keys.includes("password")) {
				setErrorMsg(responseErrorMsg.password);
			}
		}
	}

	return (
		<SigninAndUpLayout>
			<Top>
				<div css={S.SLayout}>
					<div>
                        친구들의 사진과 동영상을 보려면 가입하세요.
                    </div>
					<button css={S.SKakaoLoginBtn}>
                        kakao로 로그인
                    </button>
					<OrBar />
					<Input
						placeholder={"휴대폰 번호 또는 이메일 주소"}
						name={"phoneOrEmail"}
						changeAccount={changeAccount}
					/>
					<Input placeholder={"성명"} name={"name"} changeAccount={changeAccount} />
					<Input placeholder={"사용자 이름"} name={"username"} changeAccount={changeAccount} />
					<Input type={"password"} placeholder={"비밀번호"} name={"password"} changeAccount={changeAccount} />
					<button onClick={handleSignupSubmit} disabled={isAccountValuesEmpty} css={S.SSignupBtn}> 가입 </button>
					<div>
						{errorMsg}
					</div>
				</div>
			</Top>
		</SigninAndUpLayout>
	);
}

export default Signup;
