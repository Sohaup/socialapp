import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate , Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { SyncLoader } from 'react-spinners'

export default function Register() {
    const scheme = zod.object({
        name: zod.string("name must be  string").nonempty("name is required")        
        .min(3 , "name can not be more than 3 chars")
        .max(100 , "name can not be more than 100 chars")
        ,
        email: zod.email("email must be example@gmail.com").nonempty("email is required"),
        password: zod.string("pass must be string").nonempty("pass is required")
        .min(8 , "pass must be at least 8 chars").max(100 , "pass can not be more than 100 chars ")
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
         , "password must start with a capital litter then a small litter follwed by a number then a symbol " )
        ,
        rePassword: zod.string("repassword must be string")
        .nonempty("repassword is required").refine((repasswordInputValue)=> {
            return getValues('password') != repasswordInputValue ? 
            setError('repassword' , "repassword must match the password") : 
            true
        } , "repassword must match the password"),
        dateOfBirth: zod.date("date must be a date").refine((dateInputValue)=> {         
           return (new Date().getFullYear() - dateInputValue.getFullYear()) < 18 ?
           setError('date' , 'age of the user must be at least 18') : true
            
        }, "age of the user must be at least 18").transform((dateInputValue)=> {
             const  unifiedDateForm = {
                identity:()=>new Date() ,
                combine:(dateValue)=>{
                    return `${dateValue.getMonth()+1}-${dateValue.getDate()}-${dateValue.getFullYear()}`
                }
            }

            return unifiedDateForm.combine(dateInputValue);
        }),
        gender: zod.enum(["male" , "female"] , "gender must be string of male or female")
    })
    const { handleSubmit, register, formState: { errors } , setError , getValues } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            dateOfBirth: "",
            gender: "male"
        } ,
        mode:"onChange" ,
        resolver:zodResolver(scheme)
    })
    const navigate = useNavigate();
     const [isLoading , setIsLoading] = useState(false);

    function onSubmit(formValues) {  
        setIsLoading(true)            
         const options = {
            url:'https://linked-posts.routemisr.com/users/signup'
             , method:"POST" ,
              data:formValues
         }
         axios.request(options)
         .then((res)=> {
            toast.success(res.data.message) 
            navigate("/login")           
         })
         .catch((err) => {
            toast.error(err.message);            
         })
         .finally(()=>{
            setIsLoading(false)
         })

    }


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
                            className='input-dark' {...register("dateOfBirth" , {valueAsDate:true})} />
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
                        <Link to={'/login'}> have an account ? <span  className='specialSpan'>login</span></Link>
                        <button type='submit' className='submitBtn'  disabled={isLoading}>
                           {isLoading ? <SyncLoader size={10} color="#fff"/> : "register"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
