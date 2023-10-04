import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style'
import { getUser } from '../../apis/api/user';

function Home(props) {

    try {
        const response = getUser(1);
        console.log(response);

    } catch(error) {
        console.log(error);
    }

    return (
        <div>
            
        </div>
    );
}

export default Home;