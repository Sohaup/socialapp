import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import toast from 'react-hot-toast'
import FileForm from '../PostInput/PostInput'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function CreateForm({inputType="text" , inputName="comment" , className="" , submitAction  , isUpdate=false}) {

    const configObj = {defaultOptions:{} , zodSchemeValidationValues:{}}   
    configObj.defaultOptions[inputName] = isUpdate ? isUpdate?.content : "";   
    configObj.zodSchemeValidationValues[inputName] = zod.string(`${inputName} must be a string`)
        .nonempty(`${inputName} is required`)
        .min(3 , `${inputName } must be at least 3 chars`)
        .max(100 , `${inputName} must can not be more than 100 chars ` )        
    const scheme = zod.object(configObj.zodSchemeValidationValues)     
    
    const {register , formState:{errors } , reset , handleSubmit , getValues} = useForm(
        {defaultValues:configObj.defaultOptions , resolver:zodResolver(scheme) ,resetOptions:true } ,       
    );   
    const mangeQuery = useQueryClient();
    const {mutate } = useMutation({
        mutationFn:submitAction ,
        onSuccess:(res)=> {
            toast.success( isUpdate ? "comments is updated successfuly" :"comment is created successfuly");
            mangeQuery.invalidateQueries(["get posts"]);
        } ,
        onError:(err)=> { toast.error(err.message) }
    })

    function onSubmit(inputValues) {        
        reset();       
        mutate(inputValues[inputName]);      
    }
    
     
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className={`createInput ${className}`}>       
        <input type={inputType} name={inputName} id={inputName} placeholder={ isUpdate ? `Update your ${inputName}`:`create your ${inputName}`} {...register(inputName)}/>
        <button type='submit' className='submitBtn ms-auto '>
            {isUpdate ? "update" : "create"}
        </button>
    </div>
     {errors[inputName] && <p className='alert'>{errors[inputName].message}</p> }
     
    </form>
  )
}
