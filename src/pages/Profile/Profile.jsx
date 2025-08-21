import React from 'react'
import { Atom } from 'react-loading-indicators';
import { Image } from 'lucide-react';
import PasswordForm from '../../components/PasswordForm/PasswordForm';
import Post from '../../components/Post/Post';
import { Helmet } from 'react-helmet-async';
import { useProfile } from '../../Hooks/useProfile';


export default function Profile() {

    const { data, userPostsData, isLoading, userPostsLoading, handleSave, handleSelectImage, image, imgInputRef } = useProfile();

    return (
        <div className=' flex flex-col place-items-center py-8 space-y-10  h-full'>
            <Helmet>
                <title>socail app profile</title>
            </Helmet>
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
            <PasswordForm />
            <div className='my-8'>
                <h3 className='text-blue-950 dark:text-white text-2xl text-center font-bold'>Your posts</h3>
                <div className="cont space-y-5 w-full md:w-3/4 lg:w-1/2 my-5">
                    {
                        userPostsLoading ?
                            <Atom color={"midnightblue"} /> :
                            userPostsData?.data?.posts.map((post) => <Post key={post._id} post={post} />)
                    }
                </div>
            </div>
        </div>
    )
}
