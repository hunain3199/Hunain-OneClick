import React, { StrictMode, useContext, useEffect, useState } from 'react'
import { IoCartOutline, IoHomeOutline, IoLaptopOutline, IoPhonePortraitOutline } from 'react-icons/io5'
import { BrowserRouter, Link, useNavigate } from 'react-router-dom'
import { FaPaintbrush, FaUser } from "react-icons/fa6";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { auth, db, userprofiledata } from '../../config/Firebase/Firebase';
import { data } from 'autoprefixer';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import axios from 'axios';

import userdetails, { Usercontext } from '../../context/Usercontextprovider';
import { Button } from "../../components/ui/button"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu } from "../../components/ui/dropdown-menu"
import { Input } from "../../components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "../../components/ui/select"
const Header = ({ categories }) => {
    const [countries, setCountries] = useState([])
    // const [userdetails, setuserdetails] = useState(null)
    const [screenChange, setscreenChange] = useState(false)
    const [categoryname, setcategoryname] = useState('')
    const navigate = useNavigate()
    const { user } = userdetails()
    const showcart = useSelector(state => state?.prods?.count)
    console.log(showcart)
    const citydropdown = () => {
        axios.get('https://gist.githubusercontent.com/immujahidkhan/014fb1629ddc931e6f6d4a3a4d31abaa/raw/8f5cc4f88b9dc4efc5058c5354b9f955e4bda16f/cities.json')

            .then(response => setCountries(response.data))

            .catch(error => console.log(error));
    }


    /**
     * Summary: This code is written in JavaScript (JSX) language.
     * It contains a useEffect hook that navigates to a specific category page.
     */

    useEffect(() => {
        if (categoryname != '')
            navigate(`/${categoryname}`)



    }, [categoryname, navigate])


    let s = ''
    // document.addEventListener('click',()=>{
    //     setscreenChange(!screenChange)
    // })
   
    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      };
    useEffect(() => {
        console.log(user)
        // setuserdetails(localStorage.getItem('username'))
        // onAuthStateChanged(auth, async (user) => {


        //     const usercur = auth?.currentUser
        //     console.log(usercur)
        //     const q = query(collection(db, "users"), where("email", "==", user.email))
        //     // console.log(q)
        //     const querySnap = await getDocs(q);

        //     querySnap.forEach((doc) => {
        //         // doc.data() is never undefined for query doc snapshots
        //         console.log(doc.id, " => ", doc.data());
        //         setuserdetails(doc.data())
        //         console.log(doc.data())

        //     });
        // })
    }, [])
    console.log(categoryname)


    return (
        <div className=''>
        


      
    
            <header className="w-full">
                <div className=" bg-white py-4 px-6 flex items-center justify-between">
                    <Link className="flex items-center h-16 gap-2" href="#">
  
                    <img className='h-60 w-full'  src='../public/logo2.png'  />
                     
                    </Link>
                    <div className="flex items-center gap-4">
                        <nav className="hidden md:flex gap-4">
                            
                            <Link  className=" hover:text-gray-600" onClick={()=>scrollToSection('adp')}>
                                Buy
                            </Link>
                            <Link  className=" hover:text-gray-600" href="#" onClick={()=>scrollToSection('slider')}>
                                Rent
                            </Link>
                            <Link className=" hover:text-gray-600" to="/addproduct">
                                Sell
                            </Link>
                            <Link className=" hover:text-gray-600" href="#">
                                About
                            </Link>
                            <Link className=" hover:text-gray-600" href="#">
                                Contact
                            </Link>
                        </nav>
                        {user.username=== null ? <div className=' flex gap-2 hover:border-b-transparent  ' ><Link to='/login' >LOGIN</Link><span>|</span><Link to='/signin'>Sign Up</Link></div> :

                        <DropdownMenu  >
                            <DropdownMenuTrigger asChild className='bg-white'>
                                <Button size="icon" variant="ghost">
                                    <img
                                        alt="User Avatar"
                                        className="rounded-full"
                                        height={32}
                                        src="https://github.com/MRsabcod.png"
                                        style={{
                                            aspectRatio: "32/32",
                                            objectFit: "cover",
                                        }}
                                        width={32}
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className='bg-white'>
                                <DropdownMenuItem><Link to='/userprofile'>Profile</Link></DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuSeparator className='bg-black' />
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>}
                    </div>
                </div>
                <div className="bg-gradient-to-tr from-[#35A71B] via-[#40992E]  to-[#239B08] py-4 px-6 flex items-center justify-between gap-4  ">
                    <div className="flex flex-1 items-center gap-4 " >
                        <Select onOpenChange={citydropdown} >
                            <SelectTrigger className="w-40 text-gray-500 !bg-white">
                                <SelectValue placeholder="Search by city" className='' />
                            </SelectTrigger>
                            <SelectContent className='[&_*]:text-gray-500  bg-white'>
                                
                                { countries.length?
                                    countries.map( (city)=>{
                                        return  <SelectItem value={city.name}>{city.name}</SelectItem>
                                    } )
                                : <SelectItem></SelectItem>}
                            </SelectContent>
                        </Select>
                        <div className="flex-1">
                            <Input className="w-full flex-1" placeholder="Search by keyword..." />
                        </div>
                    </div>
                        <Link to='/addproduct'>
                    <Button  className="bg-white text-green-500 hover:bg-gray-100" variant="solid">
                        Sell Property  
                    </Button>
                        </Link>
                </div>
            </header>
        </div>
    )
}
function ChevronDownIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    )
}


function MountainIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    )
}

export default Header