import { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode'

export const tokenContext = createContext(null);

export default function TokenProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') ?? null);
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (token) {
            const userHash = jwtDecode(token).user;
            setUser(userHash)          
        }

    }, [token])



    return (
        <tokenContext.Provider value={{ token, setToken, user, setUser }}>
            {children}
        </tokenContext.Provider>
    )
}
