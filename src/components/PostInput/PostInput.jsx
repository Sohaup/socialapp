import React, { useState, useEffect, useRef, useContext } from 'react';
import CreateForm from '../CreateForm/CreateForm';
import { useForm } from 'react-hook-form';
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { Image, X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { tokenContext } from '../../Context/TokenContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function PostInput({ post = null }) {
    const [image, setImage] = useState('');
    const imgInputRef = useRef(null);
    const navigate = useNavigate();
    const scheme = zod.object({
        body: zod
            .string("post must be a string")
            .max(150, "post cannot be more than 150 chars")
    })
    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        defaultValues: {
            body: post ? post.body : ""
        },
        resolver: zodResolver(scheme)
    })
    const { token } = useContext(tokenContext)
    const manageQuery = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: post ? updatePost : postAPost,
        onSuccess: (res) => {
            if (post) {
                toast.success("post is updated successfuly");
                navigate("/home");
            } else {
                toast.success("post is created successfuly");
                manageQuery.invalidateQueries(["get posts"]);
            }
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    useEffect(() => {
        post ? setImage({ path: post?.image, name: post?.body }) : ""
    }, [])

    function postAPost(postData) {
        return axios.post("https://linked-posts.routemisr.com/posts",
            postData,
            { headers: { token } })
    }

    function updatePost(postData) {
        return axios.put(`https://linked-posts.routemisr.com/posts/${post._id}`, postData,
            { headers: { token } }
        )
    }

    function onSubmit(inputValues) {
        const formValues = new FormData();

        if (inputValues.body) {
            formValues.append("body", inputValues.body);
        }

        if (imgInputRef.current.files[0]) {
            formValues.append("image", imgInputRef.current.files[0]);
        }

        if (formValues.get("body") || formValues.get("image")) {
            mutate(formValues);
            reset()
            setImage("");
        } else {
            toast.error("can not create a post with an empty image and content");
        }

    }

    function handleSelectImage() {
        console.log(imgInputRef.current.files[0]);
        if (imgInputRef.current.files[0]) {
            setImage({ path: URL.createObjectURL(imgInputRef.current.files[0]), name: imgInputRef.current.files[0].name });
        }
    }

    function closeImageModel() {
        setImage("")
        imgInputRef.current.value = ""
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {post && <legend className='flex gap-3 text-green-600 font-bold my-4 text-xl '>update the post</legend>}
            <div className={`createInput `}>
                <input type={'text'} name={'body'} id={'body'} placeholder={post ? `update your post` : `create your post`} {...register('body')} />
                <button type='submit' className='submitBtn ms-auto '>
                    {post ? "update" : "create"}
                </button>
            </div>
            {errors.body && <p className='alert'>{errors.body.message}</p>}
            <div className="inputImg my-3">
                <label className='self-center flex items-center gap-3 ' >
                    <input type='file' hidden ref={imgInputRef} onChange={handleSelectImage} />
                    <Image color='#41478c' size={40} />
                    <span className='text-blue-950 dark:text-emerald-400'>
                        {image ? image.name : "choose your image"}
                    </span>
                </label>
                {image?.path &&
                    <div className="imgCont w-full relative ">
                        <img src={image.path} className='w-full object-cover' />
                        <div onClick={closeImageModel} className="iconWrapper absolute top-5 right-5 p-3 ">
                            <X />
                        </div>
                    </div>}
            </div>
        </form >
    );
}


