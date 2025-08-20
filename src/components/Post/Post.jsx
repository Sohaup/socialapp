import { Ellipsis, MessageCircleMore, Heart, Reply , Pen , Trash, Edit } from 'lucide-react'
import React, { useContext, useState } from 'react'
import Comment from '../Comment/Comment'
import { Link } from 'react-router-dom'
import CreateForm from '../CreateForm/CreateForm'
import axios from 'axios'
import { tokenContext } from '../../Context/TokenContext';
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'


export default function Post({ post , isDetailed=false , className="" }) {    
    const {token , user} = useContext(tokenContext);  
    const [isHidden , setIsHidden]  = useState(true);
    const manageQuery = useQueryClient()
    const {mutate} = useMutation({
        mutationFn:deletePost , 
        onSuccess:()=> {
            toast.success("post deleted successfuly");
            manageQuery.invalidateQueries(["get posts"]);
        } ,
        onError:(err) => {
            toast.error(err.message);
        }
    })
    function postComment(content , postId=post._id) {       
        return  axios.post("https://linked-posts.routemisr.com/comments" , {content , post:postId} , {headers:{token}})        
        
    }

    function deletePost(postId) {
        return axios.delete(`https://linked-posts.routemisr.com/posts/${postId}` ,
            {headers : {token}}
        )
    }
        
    return (
        <div className={`post ${className}`}>
            <div className="header">
                <div className="group">
                    <div className="avatar ">
                        <img src={post.user.photo} className='w-full h-full object-cover  '/>
                    </div>
                    <div className="texts">
                        <p className='font-bold'>{post.user.name}</p>
                        <p>{post.createdAt}</p>
                    </div>
                </div>

               { post.user._id == user ?
                <div className="icon flex flex-col relative " >
                    <Ellipsis size={40} onMouseEnter={()=>setIsHidden(false)} />
                    <ul onMouseLeave={()=>setIsHidden(true)}
                    className={`flex flex-col gap-3 bg-slate-300 dark:bg-black  absolute top-0 left-[-50%] shadow-lg rounded-lg ${!isHidden ? 'h-fit' : 'h-0'} transition-all`} hidden={isHidden}>
                    <li className=' w-full  hover:bg-green-200 dark:hover:text-black py-4 transition-colors '>
                        <Link to={`/posts/update/${post._id}`}>
                        <div className="icon justify-evenly ">
                            <Edit color='green'/>
                            <span className='text-sm leading-tight'>edit</span>
                        </div>
                        </Link>
                    </li>
                    <li className='hover:bg-red-200 dark:hover:text-black w-full py-4 transition-colors '>
                        <div className="icon justify-evenly" onClick={()=> { 
                             mutate(post._id);                             
                            }}>
                            <Trash color='crimson' size={23}/>
                            <span className='text-sm leading-tight '>delete</span>
                        </div>
                    </li>
                  </ul>    
                </div> : ""
             }

            </div>

            <div className="body">
                <div className="postContent">
                    <p>
                        {post.body}
                    </p>
                </div>
                <div className="postImg">
                   {post.image ?  <img src={post.image} className='w-full object-cover' /> : ""}
                </div>
            </div>

            <div className="footer">
                <div className="icons">
                    <div className="icon">
                        <MessageCircleMore />
                        <span className='font-sans'>{post.comments.length} Comments</span>
                    </div> 
                    <div className="icon">
                         <Heart />
                         <span className='font-sans'>like</span>
                    </div>
                    <div className="icon">
                        <Reply/>
                        <span className='font-sans'>Share</span>
                    </div>
                </div>
            </div>

            <CreateForm submitAction={postComment}/>            

            { post.comments.length ? <div className="commentsCont space-y-5 ">
                {isDetailed ? post.comments.reverse().map((comment)=> <Comment key={comment._id} comment={comment}/> ) :  <Comment comment={post.comments[post.comments.length-1]}/> }
            </div>  : ""}
           
            
             {  !isDetailed && <div className="link ms-auto pe-2">
                <Link to={`/posts/${post._id}`} className=' text-blue-950 dark:text-main font-bold py-2 text-lg '>
                  see all post details
                </Link>
             </div>}
        </div>
    )
}

