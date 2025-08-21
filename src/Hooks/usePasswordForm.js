import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { tokenContext } from '../Context/TokenContext'


export function usePasswordForm() {

     const {token , setToken} = useContext(tokenContext);
     const navigate = useNavigate();
    const scheme = zod.object({
        password: zod
            .string("password must be a string")
            .nonempty("password is required")
            .min(8, "password cannot be less than 8 chars")
            .max(100, "password c annot be more than 100 chars")
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
                , "password must start with a capital litter then a small litter follwed by a number then a symbol ")
        ,
        newPassword: zod
            .string("new password must be a string")
            .nonempty("new password is required")
            .min(8, "new password cannot be less than 8 chars")
            .max(100, "new password cannot be more than 100 chars")
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
                , "password must start with a capital litter then a small litter follwed by a number then a symbol ")
    })
    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        defaultValues: {
            password: "",
            newPassword: ""
        },
        resolver: zodResolver(scheme)
    })
    const {mutate} = useMutation({
        mutationFn:patchPassword , 
        onSuccess:(res)=> {
            toast.success("your password is changed suuccessfuly");
            setToken(res.data.token);
            localStorage.setItem("token" , res.data.token);       
            
        } ,
        onError:(err)=>{
            toast.error(err.response.data.error);
        }
    })   

    function onSubmit(formValues) {        
        reset();
        mutate(formValues);
    }

    function patchPassword(formData ) {
        return axios.patch("https://linked-posts.routemisr.com/users/change-password" , formData , 
            {headers : {token}}
         )
    }

    return {
        handleSubmit ,
        onSubmit ,
        register ,
        errors
    }
}