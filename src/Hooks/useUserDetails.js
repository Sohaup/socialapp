import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { tokenContext } from '../Context/TokenContext'

export function useUserDetails() {
    const { token } = useContext(tokenContext)    
    const { data, error, isLoading } = useQuery({ queryKey: ["get looged user details"], queryFn: getLoggedUserDetails })
    
    function getLoggedUserDetails() {
        return axios.get("https://linked-posts.routemisr.com/users/profile-data", { headers: { token } })
    }  
    
    return {
        data ,
        isLoading         
    }
}