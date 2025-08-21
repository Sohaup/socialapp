import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom"
import MainLayout from './layouts/MainLayout'
import LogIn from './pages/LogIn/LogIn'
import Register from './pages/Register/Register'
import { Toaster } from 'react-hot-toast'
import GuestLayout from './layouts/GuestLayout/GuestLayout'
import UserLayout from './layouts/UserLayout/UserLayout'
import Home from './pages/Home/Home'
import TokenProvider from './Context/TokenContext'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import PostDetails from './pages/PostDetails/PostDetails'
import UpdatePost from './pages/UpdatePost/UpdatePost'
import Profile from './pages/Profile/Profile'
import { HelmetProvider } from 'react-helmet-async'



function App() {
  const [count, setCount] = useState(0)

  function isLoged() {
    return localStorage.getItem('token');
  }

  const routes = createBrowserRouter([
    {
      path: "/", element: <UserLayout><MainLayout /></UserLayout>, children: [
        { index: true, element: isLoged() ? <Home /> : <LogIn /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <LogIn /> }
      ]
    },
    {
      path: "/", element: <GuestLayout> <MainLayout /></GuestLayout>, children: [
        { path: "/profile", element: <Profile /> },
        { path: "/home", element: <Home /> },
        { path: "/posts/:id", element: <PostDetails /> },
        { path: "/posts/update/:id", element: <UpdatePost /> }
      ]
    }
  ])

  const client = new QueryClient();

  return (
    <TokenProvider>
      <QueryClientProvider client={client}>       
          <RouterProvider router={routes} />
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />       
      </QueryClientProvider>
    </TokenProvider>
  )
}

export default App
