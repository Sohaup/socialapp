import React from 'react'
import PostInput from '../../components/PostInput/PostInput'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { Helmet } from 'react-helmet';
import { useUpdatePost } from '../../Hooks/useUpdatePost'

export default function UpdatePost() {

    const { data, isLoading } = useUpdatePost();

    return (
        <div>
            <Helmet>
                <title>socail app post update</title>
            </Helmet>
            <div className='userBoard w-full md:w-3/4  mx-auto my-10 '>
                {
                    isLoading ?
                        <div className="loader  w-full ">
                            <Skeleton count={10} baseColor='#fff' className='h-100 my-5' />
                        </div> :
                        <div className="forms flex flex-col gap-3">
                            <PostInput post={data.data.post} />
                        </div>
                }
            </div>
        </div>
    )

}
