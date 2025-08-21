import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SyncLoader } from 'react-spinners'
import { useLogin } from '../../Hooks/useLogin'

export default function LogIn() {
    const { handleSubmit, onSubmit, register, errors, isLoading } = useLogin();


    return (


        <div className='card my-auto'>
            
            <div className="title">
                LogIn
            </div>
            <div className="forms">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input">
                        <label htmlFor="email">email</label>
                        <input type="text" name='email' id='email'
                            className='input-dark' {...register("email",
                                {
                                    required: { value: true, message: "email is required" },
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "valid email must be example@gmail.com or examplenumber@gmail.com "
                                    }
                                })} />
                        {errors.email && <p className='alert'>{errors.email.message}</p>}
                    </div>
                    <div className="input">
                        <label htmlFor="pass">password</label>
                        <input type="password" name='password' id='pass'
                            className='input-dark' {...register("password",
                                {
                                    required: { value: true, message: "password is required" },
                                    pattern: {
                                        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                        message: "valid password can contain any small or capital characters "
                                    }
                                })} />
                        {errors.password && <p className='alert'>{errors.password.message}</p>}
                    </div>

                    <div className="flex flex-col-reverse gap-2  justify-between items-center py-5 md:w-1/2 mx-auto  ">
                        <Link to={'/register'}>don`t have an account ? <span className='specialSpan'>register</span></Link>
                        <button type='submit' className='submitBtn' disabled={isLoading}>
                            {isLoading ? <SyncLoader size={10} color="#fff" /> : "login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
    )
}
