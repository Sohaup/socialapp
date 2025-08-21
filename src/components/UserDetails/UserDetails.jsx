import React from 'react'
import { Atom } from 'lucide-react'
import CreateForm from '../CreateForm/CreateForm'
import PostInput from '../PostInput/PostInput'
import { useUserDetails } from '../../Hooks/useUserDetails'

export default function UserDetails() {
    const {data , isLoading } = useUserDetails();

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
