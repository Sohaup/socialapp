import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { tokenContext } from '../Context/TokenContext';
import axios from 'axios';
import toast from 'react-hot-toast';

export function useProfile() {

    const [image, setImage] = useState('');
    const imgInputRef = useRef(null);
    const { token, user } = useContext(tokenContext)
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: uploadProfileImg,
        onSuccess: () => {
            toast.success("image uploaded successfuly");
        },
        onError: (err) => {
            toast.error(err.response.data.error);
        }
    })
    const { data, isLoading, isError } = useQuery({
        queryKey: ["get user data", user],
        queryFn: getLoggedUserDetails
    });

    const {data:userPostsData , isLoading:userPostsLoading } = useQuery({
        queryKey:["get user posts" , [user]] , 
        queryFn:getUserPosts ,
        refetchOnMount:true ,
        gcTime:1000*10*60 ,
        retry:3 ,
        enabled:Boolean(user)
    })

    useEffect(() => {
        if (!isLoading) {
           setImage({ path: data.data.user.photo });      
                     
        }    
    }, [data])
    

    function getLoggedUserDetails() {
        return axios.get("https://linked-posts.routemisr.com/users/profile-data", { headers: { token } })
    }

    function uploadProfileImg(photo) {
        return axios.put(`https://linked-posts.routemisr.com/users/upload-photo`,photo,
            { headers: { token } }
        )
    }

    function getUserPosts() {   
        return axios.get(`https://linked-posts.routemisr.com/users/${user}/posts` , {
            headers:{token}
        })
    }    

    function handleSelectImage() {        
        if (imgInputRef.current.files[0]) {
            setImage({ path: URL.createObjectURL(imgInputRef.current.files[0]), name: imgInputRef.current.files[0].name });
        }
    }

    function handleSave() {
        const fileData = new FormData();
        if (imgInputRef.current.files[0]) {
        fileData.append("photo" , imgInputRef.current.files[0])
        mutate(fileData);
        }
    }

    return {
        isLoading ,
        data ,
        image ,
        handleSave ,
        imgInputRef ,
        handleSelectImage ,
        userPostsData ,
        userPostsLoading
    }
}