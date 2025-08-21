import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { tokenContext } from '../Context/TokenContext'

export function useLogin() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",

    })
    const [isLoading, setIsLoading] = useState(false);
    const { token, setToken } = useContext(tokenContext);

    function onSubmit(inputValues) {
        setIsLoading(true)
        axios.post("https://linked-posts.routemisr.com/users/signin",
            inputValues
        )
            .then((res) => {
                toast.success(res.data.message);
                setToken(res.data.token);
                setTokenInLocaleStorage(res.data.token)
                navigate('/home')
            })
            .catch((err) => {
                toast.error(err.response.data.error)
            })
            .finally(() => {
                setIsLoading(false)
            })

    }

    function setTokenInLocaleStorage(value) {
        localStorage.setItem("token", value)
    }

    return {
        handleSubmit , 
        onSubmit ,
        register ,
        errors , 
        isLoading
    }

}