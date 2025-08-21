import React from 'react'
import { Atom } from 'react-loading-indicators';
import Post from '../../components/Post/Post';
import UserDetails from '../../components/UserDetails/UserDetails';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { MoveRight , MoveLeft } from 'lucide-react';
import { useHome } from '../../Hooks/useHome';
import Head from '../../components/Head/Head';


export default function Home() {
   const {data , isLoading, getPrevPage , getNextPage } = useHome();   
   
    return (
        <>
       
        <div className='flex justify-center my-auto  w-full md:w-3/4 lg:w-1/2 mx-auto '>
            
            {
                isLoading ?
                    <div className="  self-center w-full  ">
                        <Skeleton count={10}  baseColor='#fff' className='h-100 my-5'/>
                    </div> :
                    <div className='space-y-5 my-20  '>
                        <UserDetails/>
                        {data.data.posts.map((post) => <Post key={post._id} post={post} />)}
                        <div className="paginate   ">
                            <button onClick={getPrevPage}>
                                prev
                                <MoveLeft />
                            </button>
                            <button onClick={getNextPage}>
                                next
                                <MoveRight />
                            </button>
                        </div>
                    </div>
            }
        </div>
        </>
    )



}
