import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { authenticate } from '../apis/api/account';
import { useQuery } from 'react-query';
import Loading from '../components/Loading/Loading';

function AuthRoute({ element }) {

    const location = useLocation();
    const pathname = location.pathname;
    const permitAllPath = ["/accounts"];


    const authenticateState = useQuery(["authenticate"], authenticate, {
        retry: 0,
        refetchOnWindowFocus: false
    });

    if(authenticateState.isLoading) {
        return <Loading />;
    }


    if(authenticateState.isError) {
        // console.log(authenticateState.error.response.data)
        // 인증 요청이 오류인경우
        for(let path of permitAllPath) {
            if(pathname.startsWith(path)) {
                return element; //경로와 같으면
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
}

export default AuthRoute;