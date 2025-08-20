import axios from 'axios'
import React, { useContext } from 'react'
import { tokenContext } from '../../Context/TokenContext'
import { useQuery } from '@tanstack/react-query'
import { Atom } from 'lucide-react'
import CreateForm from '../CreateForm/CreateForm'
import PostInput from '../PostInput/PostInput'
import { userContext } from '../../Context/UserContext'

export default function UserDetails() {
    const { token } = useContext(tokenContext)    
    const { data, error, isLoading } = useQuery({ queryKey: ["get looged user details"], queryFn: getLoggedUserDetails })
    
    function getLoggedUserDetails() {
        return axios.get("https://linked-posts.routemisr.com/users/profile-data", { headers: { token } })
    }  
    

    return (
        <div>
            {!isLoading && <UserBoard user={data.data.user} />} 
        </div>
    )
}

function UserBoard({ user }) {
    return (
        <div className='userBoard w-full  mx-auto '>
            <div className="infoCont">
                <div className="avatar">
                    <img src={user.photo} />
                </div>
                <div className="details">
                    <h2>{user.name}</h2>
                    <p className='text-gray-400 text-sm'>{user.email}</p>
                </div>
            </div>
            <div className="forms flex flex-col gap-3">
                <PostInput/>  
            </div>

        </div>
    )
}
