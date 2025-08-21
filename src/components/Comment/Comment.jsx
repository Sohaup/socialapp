import React from 'react'
import AnonymusPersonAvatar from '../../assets/person.png'
import { Edit, Ellipsis, Trash  , X} from 'lucide-react'
import { Link } from 'react-router-dom'


import CreateForm from '../CreateForm/CreateForm'
import { useComment } from '../../Hooks/useComment'

export default function Comment({ comment }) {   
   const {isHidden , setIsHidden , mutate , modalOpen , setModalOpen , deleteComment , updateComment , imgPath , setImgPath , user } = useComment(comment)

    return (
        <div className='comment' >
            <div className="header ">
                <div className="group">
                    <div className="avatar bg-transparent w-10 h-10 my-auto">
                        <img src={imgPath} onError={() => setImgPath(AnonymusPersonAvatar)} className='rounded-full w-full' />
                    </div>
                    <div className="texts text-md ">
                        <p className='font-bold'>{comment?.commentCreator?.name}</p>
                        <p className='text-sm'> {comment?.createdAt}</p>
                    </div>
                </div>

                {comment?.commentCreator?._id == user ?
                    <div className="icon flex flex-col relative   mb-3" >
                        <Ellipsis size={40} onMouseEnter={() => setIsHidden(false)} />
                        <ul onMouseLeave={() => setIsHidden(true)}
                            className={`flex flex-col gap-3 bg-white dark:bg-blue-950   absolute top-0  shadow-lg rounded-lg ${!isHidden ? 'h-fit' : 'h-0'} transition-all`} hidden={isHidden}>
                            <li className=' w-full  hover:bg-green-200 dark:hover:text-black py-4 transition-colors '>
                                <Link to={"/"}>
                                    <div className="icon justify-evenly " onClick={() => setModalOpen(true)}>
                                        <Edit color='green' />
                                        <span className='text-sm leading-tight'>edit</span>
                                    </div>
                                </Link>
                            </li>

                            <li className='hover:bg-red-200 dark:hover:text-black w-full py-4 transition-colors'>
                                <div className="icon justify-evenly" onClick={() => {
                                    mutate(comment._id);
                                }}>
                                    <Trash color='crimson' size={23} />
                                    <span className='text-sm leading-tight '>delete</span>
                                </div>
                            </li>
                        </ul>
                    </div> : ""
                }

            </div>
            <div className="body">
                <div className="postContent ps-3">

                    <UpdateCommentDialog isOpen={modalOpen} setIsOpen={setModalOpen} comment={comment} updateAction={updateComment}/>
                    <p >
                        {comment?.content}
                    </p>
                </div>
            </div>
        </div>
    )
}


function UpdateCommentDialog({ isOpen, setIsOpen  , comment , updateAction}) {
    
    return (
        <dialog className='fixed inset-0 bg-black/20 flex items-center justify-center w-screen h-screen' hidden={!isOpen}>
            <div className="cont p-0 bg-white dark:bg-blue-950 dark:text-white rounded-lg">
                <div className="title text-green-400 font-bold text-center border-b-2 my-5 ">
                    update your comment
                </div>
                <div className="form px-5">
                    <CreateForm isUpdate={comment} submitAction={updateAction}/>
                </div>

                <div onClick={()=>setIsOpen(false)} className="iconWrapper absolute top-5 right-5 p-3 ">
                    <X />
                </div>

                <div className="footer w-full h-30 bg-slate-200 dark:bg-emerald-400 mt-3 rounded-bl-lg rounded-br-lg">
                </div>
            </div>
        </dialog>
    )
}