import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style'
import {GoHomeFill, GoHome} from 'react-icons/go';
import {FiSearch, FiInstagram} from 'react-icons/fi';
import {AiFillPlusSquare, AiOutlinePlusSquare} from 'react-icons/ai';
import NavItem from  './NavItem/NavItem';
import { useNavigate } from 'react-router';

function Sidebar(props) {

    const navigate = useNavigate();
    const [ isSelectedList, setIsSelectedList] = useState([true, false, false, false]);

    const handleHomeClick = () => {
        setIsSelectedList([true, false, false, false])
    }

    const handleSearchClick = () => {
        setIsSelectedList([false, true, false, false])
    }


    const handleAddContentClick = () => {
        setIsSelectedList([false, false, true, false])
    }

    const handleProfileClick = () => {
        setIsSelectedList([false, false, false, true])
    }

    return (
        <div css={S.SLayout}>
            <NavItem onClick={handleHomeClick}>
                <FiInstagram />
            </NavItem>

            <NavItem onClick={handleHomeClick}>
                {isSelectedList[0] ? <GoHomeFill /> : <GoHome />}
            </NavItem>

            <NavItem onClick={handleSearchClick}>
                <FiSearch />
            </NavItem>

            <NavItem onClick={handleAddContentClick}>
                {isSelectedList[2] ? <AiFillPlusSquare /> : <AiOutlinePlusSquare/>}
            </NavItem>

            <NavItem onClick={handleProfileClick}>
                <FiInstagram />
            </NavItem>
        </div>
    );
}

export default Sidebar;