import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { tokenContext } from '../../Context/TokenContext'
import { Atom } from 'react-loading-indicators';
import axios from 'axios';
import { X, Image } from 'lucide-react';
import toast from 'react-hot-toast';
import PasswordForm from '../../components/PasswordForm/PasswordForm';


export default function Profile() {
    const [image, setImage] = useState('');
    const imgInputRef = useRef(null);
    const { token, user } = useContext(tokenContext)
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: uploadProfileImg,
        onSuccess: () => {
            toast.success("image uploaded successfuly");
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
    const { data, isLoading, isError } = useQuery({
        queryKey: ["get user data", user],
        queryFn: getLoggedUserDetails
    });

    function getLoggedUserDetails() {
        return axios.get("https://linked-posts.routemisr.com/users/profile-data", { headers: { token } })
    }

    function uploadProfileImg(photo) {
        return axios.put(`https://linked-posts.routemisr.com/users/upload-photo`,photo,
            { headers: { token } }
        )
    }
    useEffect(() => {
        if (!isLoading) {
           setImage({ path: data.data.user.photo });      
                     
        }      


    }, [data])

    function handleSelectImage() {        
        if (imgInputRef.current.files[0]) {
            setImage({ path: URL.createObjectURL(imgInputRef.current.files[0]), name: imgInputRef.current.files[0].name });
        }
    }

    function handleSave() {
        const fileData = new FormData();
        if (imgInputRef.current.files[0]) {
        fileData.append("photo" , imgInputRef.current.files[0])
        mutate(fileData);
        }
    }

    return (
        <div className=' flex flex-col place-items-center py-8 space-y-10  h-full'>
            <div className=" flex flex-col gap-5 bg-white rounded-lg items-center w-fit p-5  ">
            {isLoading ?
                <Atom color={'midnightblue'} />
                :
                <>
                    <div className="photo rounded-lg w-80 h-80 bg-slate-400 relative ">
                        <img className='w-full h-full object-cover object-center rounded-lg' src={image?.path} />

                        <div className="buttonConfirm absolute bottom-0 right-50 translate-x-full p-3 ">
                            <button className='submitBtn outline-2 outline-white' onClick={handleSave}>Save</button>
                        </div>
                    </div>
                    <div className="texts text-center flex flex-col items-center">
                        <div className="title">
                            <h1>{data.data.user.name}</h1>
                        </div>
                        <div className="sub">
                            <p className='text-slate-400 text-center'>
                                {data.data.user.email}
                            </p>
                        </div>
                    </div>
                </>
            }

            <div className="inputImg my-3">
                <label className='self-center flex items-center gap-3 ' >
                    <input type='file' hidden ref={imgInputRef} onChange={handleSelectImage} />
                    <Image color='#41478c' size={40} />
                    <span className='text-blue-950 dark:text-emerald-400'>
                        {"choose your image"}
                    </span>
                </label>

            </div>            
            </div>
            <PasswordForm/>
        </div>
    )
}
