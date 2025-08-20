import axios from 'axios';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { tokenContext } from '../../Context/TokenContext';
import { useQuery } from '@tanstack/react-query';
import { Atom } from 'react-loading-indicators';
import Post from '../../components/Post/Post';

export default function PostDetails() {
    const { id } = useParams()
    const { token } = useContext(tokenContext)
    const { data, error, isLoading } = useQuery({
        queryKey: [`get post ${id} details`],
        queryFn: getPostDetails
    })

    function getPostDetails() {
        return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, { headers: { token } })
    }


    return (
        <div className='flex justify-center my-auto  w-full md:w-3/4 lg:w-1/2 mx-auto '>
            {isLoading ?
             <div className="loader   ">
                <Atom color="#4e509b" size="medium" text="" textColor=""  />
             </div>
              :
              <div className="postCont my-3 w-full">
                <Post post={data.data.post} isDetailed={true} />
              </div>
             }
        </div>
    )
}
