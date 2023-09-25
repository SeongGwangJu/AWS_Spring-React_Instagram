import React, { useEffect, useState } from 'react';
import SigninAndUpLayout from '../../components/SigninAndUpLayout/SigninAndUpLayout';
import Top from '../../components/SigninAndUpLayout/Top/Top';
import Input from '../../components/SigninAndUpLayout/Input/Input';
import OrBar from '../../components/SigninAndUpLayout/OrBar/OrBar';
import { useNavigate } from 'react-router';

function Signin(props) {
    const navigate = useNavigate();

	const emptyAccount = {
		phoneAndEmailAndUsername: "",
		password: "",
	};

	const [account, setAccount] = useState(emptyAccount);
	const [isAccountValuesEmpty, setIsAccountValuesEmpty] = useState(true);
	const [errorMsg, setErrorMsg ] = useState("");

	const changeAccount = (name, value) => {
		setAccount({
			...account,
			[name]: value,
		});
	};

	useEffect(() => {
		setIsAccountValuesEmpty(Object.values(account).includes(""));
	}, [account]);

    return (
        <SigninAndUpLayout>
            <Top>
                <Input placeholder={"사용자이름 또는 휴대폰 또는 이메일"} name={"phoneAndEmailAndUsername"} changeAccount={changeAccount} />
                <Input type={'password'} name={"password"} changeAccount={changeAccount} />
                <button>로그인</button>
                <OrBar />
                <div>
                    kakao로 로그인
                </div>
            </Top>
        </SigninAndUpLayout>
    );
}

export default Signin;