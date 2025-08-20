import axios from 'axios'
import React, { useContext } from 'react'
import { tokenContext } from '../../Context/TokenContext'
import { useQuery } from '@tanstack/react-query'
import { Atom } from 'lucide-react'
import PostInput from '../../components/PostInput/PostInput'
import { userContext } from '../../Context/UserContext'
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export default function UpdatePost() {
    const { id } = useParams()
    const { token } = useContext(tokenContext)
    const { data, error, isLoading } = useQuery(
        { queryKey: ["get post details", id],
          queryFn: getPostDetails 
        }
    )


    function getPostDetails() {
        return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, { headers: { token } })
    }



    return (
        <div>
            <div className='userBoard w-full md:w-3/4  mx-auto my-10 '>
            {
                isLoading ? 
                <div className="loader  w-full ">
                    <Skeleton count={10}  baseColor='#fff' className='h-100 my-5' />
                </div> : 
                <div className="forms flex flex-col gap-3">
                    <PostInput post={data.data.post} />
                </div>
             }
            </div>           
        </div>
    )

}
