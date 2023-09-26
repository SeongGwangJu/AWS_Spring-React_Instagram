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

function Signin(props) {
    const navigate = useNavigate();

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
            await signin(account);
        } catch(error) {
            setErrorMsg(error.response.data.errorMessage);
        }
    }

    return (
        <SigninAndUpLayout>
            <Top>
                <div>
                    <Input placeholder={"전화번호, 사용자이름 또는 이메일"} name={"phoneOrEmailOrUsername"} changeAccount={changeAccount}/>
                    <Input placeholder={"비밀번호"} type={"password"} name={"loginPassword"} changeAccount={changeAccount}/>
                    <div css={S.SBtnLayout}>
                    <button onClick={handleSigninSubmit} disabled={isAccountValuesEmpty} css={S.SLoginBtn}>로그인</button>
                    </div>
                    <OrBar />
                    <div css={S.SBtnLayout}>
                        <button css={S.SKakaoLoginBtn}><RiKakaoTalkFill/> kakao 로그인</button>
                    </div>
                    <div>
                        {errorMsg}
                    </div>
                </div>
            </Top>
        </SigninAndUpLayout>
    );
}

export default Signin;