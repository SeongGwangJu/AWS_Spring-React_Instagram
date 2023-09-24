import React, { useEffect, useState } from "react";
// /** @jsxImportSource @emotion/react */
// import * as S from './Style'
import SigninAndUpLayout from "../../components/SigninAndUpLayout/SigninAndUpLayout";
import Top from "../../components/SigninAndUpLayout/Top/Top";
import Input from "../../components/SigninAndUpLayout/Input/Input";
import OrBar from "../../components/SigninAndUpLayout/OrBar/OrBar";

function Signup(props) {

	const empytAccount = {
		phoneAndEmail: "",
		name: "",
		username: "",
		password: "",
	};

	const [account, setAccount] = useState(empytAccount);
	const [isAccountValuesEmpty, setIsAccountValuesEmpty] = useState(true);

	const changeAccount = (name, value) => {
		setAccount({
			...account,
			[name]: value,
		});
	};

	useEffect(() => {
		setIsAccountValuesEmpty(Object.values(account).includes(""));
	}, [account]);

	const handleSignupSubmit = () => {
		Signup(account);
	}

	return (
		<SigninAndUpLayout>
			<Top>
				<div>
					<div>
                        친구들의 사진과 동영상을 보려면 가입하세요.
                    </div>
					<button>
                        kakao로 로그인
                    </button>
					<OrBar />
					<Input
						placeholder={"휴대폰 번호 또는 이메일 주소"}
						name={"phoneAndEmail"}
						changeAccount={changeAccount}
					/>
					<Input placeholder={"성명"} name={"name"} changeAccount={changeAccount}/>
					<Input placeholder={"사용자 이름"} name={"username"} changeAccount={changeAccount} />
					<Input type={"password"} placeholder={"비밀번호"} name={"password"} changeAccount={changeAccount} />
					<button disabled={isAccountValuesEmpty}>
                        가입
                    </button>
				</div>
			</Top>
		</SigninAndUpLayout>
	);
}

export default Signup;
