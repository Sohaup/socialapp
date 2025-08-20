import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { Outlet, useLocation } from 'react-router-dom'


export default function MainLayout() {
    const [dark, setDark] = useState('light')    


    function toggleDark() {
        if (dark == "light") {
            setDark("dark")
        } else {
            setDark("light")
        }
    }
    return (

        <div data-theme={dark}>
            <Header toggleDark={toggleDark} dark={dark} />

            <div className="cont flex flex-col  bg-slate-200 dark:bg-black dark:text-white w-full  min-h-[85vh] ">
                <Outlet />
            </div>

            <Footer />
        </div>

    )
}
