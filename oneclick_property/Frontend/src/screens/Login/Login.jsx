import React, { useContext, useEffect, useState } from 'react'
// import Usercontext from '../../context/Usercontext'
import Usercontextprovider from '../../context/Usercontextprovider'
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"

import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import axios from 'axios'
import userdetails from '../../context/Usercontextprovider'
// import { ChromeIcon } from 'lucide-react'
import { FaGoogle } from 'react-icons/fa6'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
// or via CommonJS


const Login = (req,res) => {
  
  // const { setuser }=useContext(Usercontext)
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  // const [user, setUser] = useState([])
  const navigate = useNavigate()
  // const [user, setUser] = useState({})
  const {loginAndUpdate,user}=userdetails()

// const GoogleUserCredentials = useGoogleLogin({
//   onSuccess: (codeResponse) => setUser(codeResponse),
//   onError: (error) => console.log('Login Failed:', error)
// });
const Googlelogin=()=>{
  // axios.get('/users/google/redirect')
  
  //   .then(response => console.log(response.data))
  
  //   .catch(error => console.log(error));
  window.location.href='/users/google'
}
const handleLoginWithGoogle = async () => {
  const googleAuthUrl = 'http://localhost:3001/users/auth/google';
        const newWindow = window.open(googleAuthUrl,'_blank', 'width=500,height=600');

        const checkWindowClosed = setInterval(() => {
            if (newWindow.closed) {
                clearInterval(checkWindowClosed);
                
                const token = localStorage.getItem('authToken');
                const email = localStorage.getItem('userId');
                const username = localStorage.getItem('username');
                loginAndUpdate({username:username,userToken:token})
                console.log(user)
            }
               
        }, 100);
};
const fetchUserProfile = async (token) => {
  try {
      const response = await fetch('http://localhost:3001/users/profile', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      const data = await response.json();
      setUser(data.user);
  } catch (error) {
      console.error('Error fetching user profile:', error);
  }
};


  const login =  (e) => {
  
    e.preventDefault();

    // setuser('harshit')
    try {


      axios({

        method: 'put',

        url: '/users/login',

        data: {

          email,
          password,



        }

      })

        .then(response => {
          console.log(response.data.token)
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('userId', response.data.userId);
          localStorage.setItem('username', response.data.username);
          loginAndUpdate({username:response.data.username,userToken:response.data.token})
          Swal.fire({
            title: "LOGIN SUCCESSFUL",
            text: "You are Registered!",
            icon: "success",

          }).then((result) => {
            if (result['isConfirmed']) {
              navigate('/')
            }
          })


        })

        .catch(error =>
        Swal.fire({
          title: `${error}`,
          icon: "error",

        }).then((result) => {
          if (result['isConfirmed']) {
            navigate('/')
          }
        })
);


    }
    catch (e) {
      console.error(e)

    }
  }
  

  return (

  <>
    
    <div key="1" className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Welcome</h2>
          <p className="text-gray-500 dark:text-gray-400">Sign in or create an account to continue</p>
        </div>
        <form className="space-y-4" onSubmit={(e)=>{e.preventDefault()}}>
          <div>
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input className="w-full" id="email" placeholder="name@example.com" type="email" onChange={(e) => setemail(e.target.value)} />
          </div>
          <div>
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input className="w-full" id="password" placeholder="Password" type="password"onChange={(e) => setpassword(e.target.value)}  />
          </div>
          <div className="flex flex-col gap-2">
            <Button className="w-full bg-transparent border hover:bg-gray-200 border-gray-300 text-green-500" type="submit" onClick={login}>
              Sign in
            </Button>
            {/* <Link to='/users/google'> */}
            {/* <a href="/users/google"> */}

            <Button onClick={handleLoginWithGoogle} className="w-full hover:bg-gray-200" variant="outline">
              <FaGoogle className="mr-2 h-4 w-4" /> 
               Sign in with Google
              {/* <GoogleLogin  width='100%' onSuccess={responseMessage} onError={errorMessage}/> */}
            </Button>
            {/* </a> */}
            {/* </Link> */}
              <Link to={'/signin'}>

            <Button   className="w-full  border bg-[#23970C] hover:bg-[#23970C] text-gray-100" type="button">
              Create account
            </Button>
              </Link>
          </div>
          <div className="text-center">
            <Link className="text-sm text-gray-500 dark:text-gray-400 underline" href="#">
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </div>
    </>

  )
}

export default Login