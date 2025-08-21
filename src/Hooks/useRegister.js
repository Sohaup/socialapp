import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'


export function useRegister() {
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
                toast.error(err.response.data.error);            
             })
             .finally(()=>{
                setIsLoading(false)
             })
    
        }
    
      return {
        handleSubmit ,
        onSubmit ,
        register ,
        errors ,
        isLoading
      }  
}