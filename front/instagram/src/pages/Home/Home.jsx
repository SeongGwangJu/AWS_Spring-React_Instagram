import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style'
import { getUser } from '../../apis/api/user';
import jwt_decode from "jwt-decode";

function Home(props) {

    try {
        let decoded = jwt_decode(localStorage.getItem("accessToken").substring(7));
        console.log(decoded.username)

        const response = getUser(decoded.username);
        console.log(response);
    } catch(error) {
        console.log(error);
    }

    return (
        <div>
            welcome~ you are correct. perfect!
        </div>
    );
}

export default Home;