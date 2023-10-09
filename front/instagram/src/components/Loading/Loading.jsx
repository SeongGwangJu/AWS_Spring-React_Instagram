import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style'



function Loading(props) {
    return (
        <div css={S.SLayout}>
            <div css={S.SLoader} />
        </div>
    );
}

export default Loading;