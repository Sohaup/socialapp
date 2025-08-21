import React, { useContext, useEffect, useMemo, useState } from 'react'
import { tokenContext } from '../Context/TokenContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

export function useComment(comment) {

    const [imgPath, setImgPath] = useState(comment?.commentCreator?.photo)
    const [isHidden, setIsHidden] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const { token, user } = useContext(tokenContext)
    const manageQuery = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteComment,
        onSuccess: () => {
            toast.success("comment deleted successfuly");
            manageQuery.invalidateQueries(["get posts"]);
        },
        onError: (err) => {                 
            toast.error(err.response.data.message);
        },
        onSettled:()=>{
            setIsHidden(true);
        }
    })

    function deleteComment(commentId) {
        return axios.delete(`https://linked-posts.routemisr.com/comments/${commentId}`, {
            headers: { token }
        })
    }

     function updateComment(content) {        
        setModalOpen(false);      
        return axios.put(`https://linked-posts.routemisr.com/comments/${comment._id}` , 
           {content} , 
           {headers : {token}}
        );
    }

    return {
        isHidden ,
        setIsHidden ,
        modalOpen ,
        setModalOpen ,
        mutate ,
        deleteComment ,
        updateComment ,
        imgPath ,
        setImgPath ,
        user
    }
}