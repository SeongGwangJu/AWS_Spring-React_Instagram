import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authenticate } from '../apis/api/account';

function AuthRoute({ element }) {
    const location = useLocation();
    const pathname = location.pathname;
    const permitAllPath = ["/accounts"];
    const [ authenticated, setAuthenticated ] = useState(false);

    // 처음 렌더링 될 때 user인증 수행.
    useEffect(() => { //Promise도 쓸 수 있어야함.
        authenticate()
        .then(response => {
            setAuthenticated(response.data); //data는 boolean타입으로 반환되어짐
        })
        setAuthenticated();
    }, []);

    for(let path of permitAllPath) {
        if(pathname.startsWith(path)) {
            if(authenticated) {
                return <Navigate to={"/"} />;
            }
            return element;
        }
    }

    if(!authenticated) {
        return <Navigate to={"/accounts/login"} />;
    }

    return element;
}

export default AuthRoute;