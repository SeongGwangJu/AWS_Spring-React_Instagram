import { css } from '@emotion/react';

export const SLayout =css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    line-height: 12px;

    & > button, link > button {
        font-weight: 600;
        border-radius: 6px;
        border: 0px;
        width: 269px;
        height: 32px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
    }

`;

export const SSignupBtn = css`
    background-color: #4cb5f9;
    color: white;
    margin: 12px 0px;
`;

export const SKakaoLoginBtn = css`
    background-color: #fee608;
    margin-top: 12px;
    color: black;
`;

export const SLoginLinkBtn = css`
    background-color: #ebebeb;
    margin-top: 6px;
    color: black;
    font-weight: 600;
    width: 269px;
    height: 32px;
    border-radius: 6px;
    border: 0px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
`;