import React, { useContext, useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { tokenContext } from '../../Context/TokenContext';



export default function UserLayout({children}) {
  const {pathname} = useLocation();
  const {token} = useContext(tokenContext)
  const navigate = useNavigate()
  
  
  if ((pathname == "/login" || pathname == "/register") && token) {
   return <Navigate to={'/home'}/>
  } else {
    return children;
  }
}
