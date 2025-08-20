import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { tokenContext } from '../../Context/TokenContext'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function PasswordForm() {
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
            toast.error(err.message);
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
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/2 self-center' >
            <legend className='text-blue-950 font-bold my-2 text-2xl'>Change your Password</legend>
            <div className="input">
                <label htmlFor='password'>your password</label>
                <input name='password' id='password'  {...register("password")} />
                {errors.password && <p className='alert'>{errors.password.message}</p>}
            </div>
            <div className="input">
                <label htmlFor='newPassword'>Create your new password</label>
                <input name='newPassword' id='newPassword' {...register("newPassword")} />
                {errors.newPassword && <p className='alert'>{errors.newPassword.message}</p>}
            </div>
            <div className='flex place-content-center'>
                <button className="submitBtn my-2">change your password</button>
            </div>
        </form>
    )
}
