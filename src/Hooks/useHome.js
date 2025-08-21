import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { tokenContext } from '../Context/TokenContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';


export function useHome() {
     const { token } = useContext(tokenContext);
    const [page, setPage] = useState(1);   
    const manageQuery  = useQueryClient() 
    const { data, error, isError, isLoading, isFetching } = useQuery(
        { 
            queryKey: ["get posts" , page],
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
  
   return {
      data ,
      getPrevPage ,
      getNextPage ,
      isLoading
   }
}