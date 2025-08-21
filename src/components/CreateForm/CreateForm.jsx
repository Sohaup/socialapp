import React from 'react'
import { useCreateForm } from '../../Hooks/useCreateForm'

export default function CreateForm({inputType="text" , inputName="comment" , className="" , submitAction  , isUpdate=false}) {

   const {handleSubmit , onSubmit , errors  , register } = useCreateForm(inputName , submitAction , isUpdate);   
     
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
