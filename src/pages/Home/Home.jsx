import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { tokenContext } from '../../Context/TokenContext'
import { Atom } from 'react-loading-indicators';
import Post from '../../components/Post/Post';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import UserDetails from '../../components/UserDetails/UserDetails';
import { userContext } from '../../Context/UserContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { MoveRight , MoveLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Home() {
    const { token } = useContext(tokenContext);
    const [page, setPage] = useState(1);   
    const manageQuery  = useQueryClient() 
    const { data, error, isError, isLoading, isFetching } = useQuery(
        { 
            queryKey: ["get posts"],
            queryFn: getPosts ,            
            gcTime: 1000*60*60,
            retry:3 ,   
            refetchOnMount:true                       
        }
    )

    function getPosts() {    
        return  axios.get(`https://linked-posts.routemisr.com/posts?limit=100&sort=-createdAt&page=${page}` , {headers: {token}})
    }    

   function getNextPage() {
     const nextPage = page+1
     setPage(nextPage)
     manageQuery.invalidateQueries(["get posts"]);     
     
   }
  
   function getPrevPage() {
     const prevPage = page-1
     setPage(prevPage)
     manageQuery.invalidateQueries(["get posts"]);
   }
  
   
   
    return (
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
    )



}
