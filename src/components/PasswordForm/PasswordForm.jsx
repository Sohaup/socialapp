import React from 'react'
import { usePasswordForm } from '../../Hooks/usePasswordForm';

export default function PasswordForm() {
   const {handleSubmit , onSubmit , register , errors } = usePasswordForm();
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/2 self-center' >
            <legend className='text-blue-950 dark:text-white font-bold my-2 text-2xl'>Change your Password</legend>
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
