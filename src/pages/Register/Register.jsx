import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { SyncLoader } from 'react-spinners'
import { useRegister } from '../../Hooks/useRegister'

export default function Register() {
    const { handleSubmit, onSubmit, register, errors, isLoading } = useRegister()

    return (
        <div className='card my-auto'>           
            <div className="title">
                Register
            </div>
            <div className="forms">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input">
                        <label htmlFor="name">name</label>
                        <input type="text" name='name' id='name'
                            className='input-dark' {...register("name")} />
                        {errors.name && <p className='alert'>{errors.name.message}</p>}
                    </div>
                    <div className="input">
                        <label htmlFor="email">email</label>
                        <input type="text" name='email' id='email'
                            className='input-dark' {...register("email")}
                        />
                        {errors.email && <p className='alert'>{errors.email.message}</p>}
                    </div>
                    <div className="input">
                        <label htmlFor="pass">password</label>
                        <input type="password" name='password' id='pass'
                            className='input-dark' {...register("password")} />
                        {errors.password && <p className='alert'>{errors.password.message}</p>}
                    </div>
                    <div className="input">
                        <label htmlFor="rePassword">repassword</label>
                        <input type="password" name='rePassword' id='rePassword'
                            className='input-dark' {...register("rePassword")} />
                        {errors.rePassword && <p className='alert'>{errors.rePassword.message}</p>}
                    </div>
                    <div className="input">
                        <label htmlFor="dateOfBirth">date</label>
                        <input type="date" name='dateOfBirth' id='dateOfBirth'
                            className='input-dark' {...register("dateOfBirth", { valueAsDate: true })} />
                        {errors.dateOfBirth && <p className='alert'>{errors.dateOfBirth.message}</p>}
                    </div>
                    <div className="input flex-row justify-between my-2 w-1/2 mx-auto">

                        <div className="flex gap-1">
                            <input type="radio" name='gender' value={'male'}
                                id='male' {...register("gender")}
                                className='accent-terquise dark:accent-red-500' />
                            <label htmlFor="male">male</label>
                        </div>

                        <div className="flex gap-1">
                            <input type="radio" name='gender' value={'female'} {...register("gender")}
                                id='female' className='accent-terquise dark:accent-red-500' />
                            <label htmlFor="female">female</label>
                        </div>
                    </div>

                    <div className="flex flex-col-reverse gap-2  justify-between items-center py-5 md:w-1/2 mx-auto  ">
                        <Link to={'/login'}> have an account ? <span className='specialSpan'>login</span></Link>
                        <button type='submit' className='submitBtn' disabled={isLoading}>
                            {isLoading ? <SyncLoader size={10} color="#fff" /> : "register"}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}
