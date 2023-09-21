import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';

function NavItem( { onClick, children } ) {

    return (
        <div css={S.SLayout} onClick={onClick}>
            {children}
        </div>
    );
}

export default NavItem;

