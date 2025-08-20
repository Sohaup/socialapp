import React, { useContext } from 'react'
import { Navigate  , useLocation} from 'react-router-dom';
import { tokenContext } from '../../Context/TokenContext';

export default function GuestLayout({children}) {
  const {token} = useContext(tokenContext);
  const {pathname} = useLocation();
  if ((pathname != "/login" || pathname != "/register") && !token) {
    return <Navigate to={'/login'}/>
  } else {
    return children;
  }

}
