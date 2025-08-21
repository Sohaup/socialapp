import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { tokenContext } from '../Context/TokenContext';
import toast from 'react-hot-toast';

export function useHeader() {
    const [isHidden, setIsHidden] = useState(false);
    const [isScroll, setIsScroll] = useState(false)
    const { token, setToken } = useContext(tokenContext);
    const navigate = useNavigate();

    function logOut() {
        try {
            setToken(null);
            localStorage.removeItem('token');
            navigate('/login');
            toast.success("you loged out successfuly");
        } catch (err) {
            toast.error(err);
        }
    }

    return {
        isHidden ,
        setIsHidden ,
        isScroll ,
        setIsScroll ,
        logOut ,
        token
    }

}