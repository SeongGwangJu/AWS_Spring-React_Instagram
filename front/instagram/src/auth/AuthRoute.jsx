import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { authenticate } from '../apis/api/account';
import { useQuery } from 'react-query';
import Loading from '../components/Loading/Loading';

function AuthRoute({ element }) {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const permitAllPath = ["/accounts"];
    const [ authenticated, setAuthenticated ] = useState(false);
    const authenticateState = useQuery(["authenticate"], authenticate, {
        retry: 1
        // onError: (error) => {
        //     console.log(error);
        //     console.log("error");
        // }
    });

    if(authenticateState.isLoading) {
        console.log("로딩 중...")
        // return <>로딩중...</>;
        return <Loading />;
    }


    if(authenticateState.isError) {
        // console.log(authenticateState.error.response.data)
        // 인증 요청이 오류인경우
        for(let path of permitAllPath) {

            if(pathname.startsWith(path)) {
                // return element; //경로와 같으면
            }
        }
        // navigate("/accounts/login"); //같지 않으면
        return <Navigate to={"/accounts/login"} />;//같지 않으면
    }

    // 에러가 아닌 경우
    for(let path of permitAllPath) {
        if(pathname.startsWith(path)) {
            console.log("홈으로이동");
            return <Navigate to={"/"} />;
        }
    }
    return element;

//     // 처음 렌더링 될 때 user인증 수행.
//     useEffect(() => { //Promise도 쓸 수 있어야함.
//         authenticate() //요청
//         .then(response => { //data는 boolean타입으로 반환=>true(정상)이면 then 아래가 실행
//             setAuthenticated(response.data);
//             for(let path of permitAllPath) { //permitAllPath를 모두 꺼냄(나중엔 여러개)
//                 if(pathname.startsWith(path)) { //"accounts"로 시작하고
//                     if(authenticated) { //인증이 되었다면
//                         navigate("/") //
//                     }
//                 }
//             }
//         })
//         .catch(error => {
//             alert("error.response.data")
//             setAuthenticated(false); //값을 변하긴 하지만 비동기라서 아래 코드에 영향을 미치진 않음
//             if(!authenticated) { //인증이 안되어있다면
//                 navigate("/accounts/login");
//             }
//         })
//     }, [authenticated]);
//     return element; //home
}

export default AuthRoute;