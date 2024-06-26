import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import userdetails from '../context/Usercontextprovider'

const PrivateRoutes = () => {
    const { user }=userdetails()
    
  return (
    <div>{user?.userToken ? <Outlet/> : <Navigate to="/login"/>}</div>
  )
}

export default PrivateRoutes