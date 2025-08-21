import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'


export function useCreateForm(inputName, submitAction, isUpdate) {

    const configObj = { defaultOptions: {}, zodSchemeValidationValues: {} }
    configObj.defaultOptions[inputName] = isUpdate ? isUpdate?.content : "";
    configObj.zodSchemeValidationValues[inputName] = zod.string(`${inputName} must be a string`)
        .nonempty(`${inputName} is required`)
        .min(3, `${inputName} must be at least 3 chars`)
        .max(100, `${inputName} must can not be more than 100 chars `)
    const scheme = zod.object(configObj.zodSchemeValidationValues)

    const { register, formState: { errors }, reset, handleSubmit, getValues } = useForm(
        { defaultValues: configObj.defaultOptions, resolver: zodResolver(scheme), resetOptions: true },
    );
    const mangeQuery = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: submitAction,
        onSuccess: (res) => {
            toast.success(isUpdate ? "comments is updated successfuly" : "comment is created successfuly");
            mangeQuery.invalidateQueries(["get posts"]);
        },
        onError: (err) => { toast.error(err.message) }
    })

    useEffect(() => {
        if (isUpdate) {
            reset({ [inputName]: isUpdate?.content })
        }
    }, [isUpdate])

    function onSubmit(inputValues) {
        reset();
        mutate(inputValues[inputName]);
    }

    return {
        handleSubmit ,
        onSubmit ,
        errors ,
        register
    }

}