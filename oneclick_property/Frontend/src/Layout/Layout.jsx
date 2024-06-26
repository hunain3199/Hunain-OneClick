import React, { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
// import {  products, response } from '../config/Firebase/Api'
import { Addproducts } from '../config/Firebase/Firebase'
import { useState } from 'react'
import axios from 'axios'
// import second from '../../'
import { UserProvider } from '../context/Usercontextprovider'
const Layout = () => {
    const [productbuck, setproductbuck] = useState([])
    const [category, setcategory] = useState([])
     const Getproducts=async()=>{
      const products=[]
    
    try{
      await axios.get('/ads/')
      
        .then(response => {response.data.data.map((item)=>products.push(item)); console.log(products)})
      
        .catch(error => console.log(error));
       
    }catch(e){
      console.error(e)
    }
    return products
    
    }
    useEffect(() => {
      Addproducts()
      // console.log(response)

 Getproducts().then(resp=>
 setproductbuck(resp))
  
        // products().then((res)=>{setcategory(res)})
        }, [])
  console.log(productbuck)

  const [user, setUser] = useState({username:localStorage.getItem('username'),userToken:localStorage.getItem('authToken')}) 
const [addetails, setAddetails] = useState({})
const AdandUpdate=(newad)=>{
  setAddetails({addetails,...newad})
  console.log(addetails)
}

  const loginAndUpdate=(newUser)=>{
setUser({user,...newUser})
  }  
  const contextValue = { user:user, loginAndUpdate:loginAndUpdate,productbuck,Getproducts,AdandUpdate,addetails};
        // Addproducts().then((res)=>{setproductbuck(res)})
  return (
    
    <div className='h-fit   w-screen'>
      <UserProvider  value={contextValue}>
     
    <Header categories={category} />
    {/* {user.userToken ? <Outlet/> : <Link to="/login"/> */}
 <Outlet />
    </UserProvider>
    </div>
  )
}

export default Layout