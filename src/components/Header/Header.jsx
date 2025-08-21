import { AlignJustify, LogOut, Moon, Sun } from 'lucide-react'
import React from 'react'
import { Link } from "react-router-dom"
import icon from "../../assets/blogLogo.png";
import { useHeader } from '../../Hooks/useHeader';

export default function Header({ toggleDark, dark }) {
    
    const {isHidden , isScroll , logOut , setIsHidden  , token} = useHeader();
    
    return (
        <nav 
        className={
            `bg-white dark:bg-blue-950 dark:text-white min-h-[50px] py-6 
             ${isScroll ? 'fixed top-0  w-screen z-30' : '' }`
            } >
            <div className=" cont flex flex-row lg:items-center lg:max-h-[30px] ">
                <div className="wrapper ">
                    <div className="brand row-start-1 my-auto flex gap-3 items-center ">
                        <div className="logo">
                            <img src={icon} alt='site icon' width={50} className='rounded-full' />
                        </div>
                        <div className="logo_texts">
                            <h1 className='font-bold'>Social app</h1>
                        </div>
                    </div>
                    <div className={` links overflow-hidden lg:h-fit transition-all duration-500 ${isHidden ? "h-0  " : "h-20 "}  lg:block row-start-2 lg:row-start-1 lg:mx-auto lg:my-auto`} >
                        <ul className='flex flex-col lg:flex-row  gap-2 font-mono mt-2  ' >
                            <li hidden={!token}><Link to={"/home"} className='nav-link'>home</Link></li>
                            <li hidden={!token}><Link to={"/profile"} className='nav-link'>profile</Link></li>
                            <li hidden={token}><Link to={"/register"} className='nav-link'>register</Link></li>
                            <li hidden={token}><Link to={"/login"} className='nav-link'>login</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="icons flex gap-5 w-fit">
                    {
                        dark == "light" ?
                            <Moon
                                size={30}
                                color='midnightblue'
                                onClick={toggleDark}
                            /> :
                            <Sun size={30}
                                color='red'
                                onClick={toggleDark}
                            />
                    }
                    <AlignJustify
                        color="#22b4b2"
                        size={30}
                        strokeWidth={3}
                        className='lg:hidden'
                        onClick={() => setIsHidden(!isHidden)}
                    />

                    <LogOut size={30} color='crimson' onClick={logOut}/>

                </div>
            </div>
        </nav>
    )
}
