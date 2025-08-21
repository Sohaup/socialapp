import axios from 'axios'
import React, { useContext } from 'react'
import { tokenContext } from '../Context/TokenContext'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export function useUpdatePost() {
     const { id } = useParams()
        const { token } = useContext(tokenContext)
        const { data, error, isLoading } = useQuery(
            { queryKey: ["get post details", id],
              queryFn: getPostDetails 
            }
        )
    
    
        function getPostDetails() {
            return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, { headers: { token } })
        }
    
    return {
        data ,
        isLoading
    }
}