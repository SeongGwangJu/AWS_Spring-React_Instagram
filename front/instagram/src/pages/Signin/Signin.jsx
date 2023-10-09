import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style'
import { useNavigate } from 'react-router';
import SigninAndUpLayout from '../../components/SigninAndUpLayout/SigninAndUpLayout';
import Top from '../../components/SigninAndUpLayout/Top/Top';
import Input from '../../components/SigninAndUpLayout/Input/Input';
import OrBar from '../../components/SigninAndUpLayout/OrBar/OrBar';
import { signin } from '../../apis/api/account';
import {RiKakaoTalkFill} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';

function Signin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const emptyAccount = {
        phoneOrEmailOrUsername: "",
        loginPassword: ""
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

    const handleSigninSubmit = async () => {
        try {
            const response = await signin(account);
            localStorage.setItem("accessToken", "Bearer " + response.data);
            //
            // window.location.reload();
            console.log(localStorage.getItem("accessToken"))
            queryClient.invalidateQueries(["authenticate"]);
            navigate("/");
        } catch(error) {
            setErrorMsg(error.response.data.errorMessage);
        }
    }

    return (
        <SigninAndUpLayout>
            <Top>
                <div css={S.SLayout}>
                    <Input placeholder={"전화번호, 사용자이름 또는 이메일"} name={"phoneOrEmailOrUsername"} changeAccount={changeAccount}/>
                    <Input placeholder={"비밀번호"} type={"password"} name={"loginPassword"} changeAccount={changeAccount}/>
                    <button onClick={handleSigninSubmit} disabled={isAccountValuesEmpty} css={S.SLoginBtn}>로그인</button>
                    <OrBar />
                        <button css={S.SKakaoLoginBtn}><RiKakaoTalkFill/> kakao 로그인</button>
                    <div>
                        {errorMsg}
                    </div>
                    <div>
                    비밀번호를 잊으셨나요?
                    </div>

                    <Link to="/accounts/emailsignup"> 가입하기 </Link>
                </div>
            </Top>
        </SigninAndUpLayout>
    );
}

export default Signin;