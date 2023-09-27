import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { authenticate } from '../apis/api/account';

function AuthRoute({ element }) {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const permitAllPath = ["/accounts"];
    const [ authenticated, setAuthenticated ] = useState(false);

    // 처음 렌더링 될 때 user인증 수행.
    useEffect(() => { //Promise도 쓸 수 있어야함.
        authenticate() //요청
        .then(response => { //data는 boolean타입으로 반환=>true(정상)이면 then 아래가 실행
            setAuthenticated(response.data);
            for(let path of permitAllPath) { //permitAllPath를 모두 꺼냄(나중엔 여러개)
                if(pathname.startsWith(path)) { //"accounts"로 시작하고
                    if(authenticated) { //인증이 되었다면
                        navigate("/") //
                    }
                }
            }
        })
        .catch(error => {
            alert("error.response.data")
            setAuthenticated(false); //값을 변하긴 하지만 비동기라서 아래 코드에 영향을 미치진 않음
            if(!authenticated) { //인증이 안되어있다면
                navigate("/accounts/login");
            }
        })
    }, [authenticated]);
    return element; //home
}

export default AuthRoute;