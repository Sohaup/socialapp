import React, { useContext, useState } from 'react'
import axios from 'axios'
import { tokenContext } from '../Context/TokenContext'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function usePost(post) {
    const { token, user } = useContext(tokenContext);
    const [isHidden, setIsHidden] = useState(true);
    const manageQuery = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            toast.success("post deleted successfuly");
            manageQuery.invalidateQueries(["get posts"]);
        },
        onError: (err) => {
            toast.error(err.response.data.error);
        }
    })
    function postComment(content, postId = post._id) {
        return axios.post("https://linked-posts.routemisr.com/comments", { content, post: postId }, { headers: { token } })

    }

    function deletePost(postId) {
        return axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`,
            { headers: { token } }
        )
    }

    return {
        isHidden ,
        setIsHidden ,
        mutate ,
        user ,
        postComment ,
        deletePost ,
    }

}