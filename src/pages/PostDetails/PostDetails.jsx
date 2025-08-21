import React from 'react'
import { Atom } from 'react-loading-indicators';
import Post from '../../components/Post/Post';
import { Helmet } from 'react-helmet-async';
import { usePostDetails } from '../../Hooks/usePostDetails';

export default function PostDetails() {
  const { data, isLoading } = usePostDetails();

  return (
    <div className='flex justify-center my-auto  w-full md:w-3/4 lg:w-1/2 mx-auto '>
      <Helmet>
        <title>socail app post details</title>
      </Helmet>
      {isLoading ?
        <div className="loader   ">
          <Atom color="#4e509b" size="medium" text="" textColor="" />
        </div>
        :
        <div className="postCont my-3 w-full">
          <Post post={data.data.post} isDetailed={true} />
        </div>
      }
    </div>
  )
}
