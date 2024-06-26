import { AvatarImage, AvatarFallback, Avatar, } from "../../components/ui/avatar"
import { Button } from "../../components/ui/button"

import { useEffect, useState } from "react"
import userdetails from "../../context/Usercontextprovider"
// import { Avatar } from "Frontend/src/Shadcnsrc/components/ui/avatar"
// import { Avatar, AvatarGroup } from "flowbite-react"
import Prodcard from "../../components/Prodcard/Prodcard"
import axios from "axios"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

export default function UserProfile() {
    const {user,productbuck,loginAndUpdate}=userdetails()
    const [userProductBuck, setUserProductBuck] = useState([])
  const navigate = useNavigate()

    useEffect(() => {
      console.log(user)

      const dummyProdlst=[]
      productbuck.forEach(element => {
        if(element.userId==localStorage.getItem('userId'))
        dummyProdlst.push(element)
      });
      setUserProductBuck(dummyProdlst)
    }, [productbuck,user])
    
    const userlogout = (e) => {

      e.preventDefault()
      Swal.fire({
        title: "Are you sure you want to Logout?",
        text: "You won't be able post Ad!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout!",
        showLoaderOnConfirm: true,
      }).then((result) => {
        if (result.isConfirmed) {
          
          try{
            axios({
  
        method: 'put',
  
        url: '/users/logout',
  
        headers: {
  
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
  
  
        },
        
        
  
      }).then(response => {
        
        
        localStorage.removeItem('username')
          localStorage.removeItem('authToken')
          localStorage.removeItem('userId')  
          loginAndUpdate({username:null,userToken:null})
          Swal.fire({
            title: "LOGOUT SUCCESSFUL",
            text: "You were Logout !",
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
catch (e){console.error("Error in logging out",e)}


}
});
}
  

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="flex  space-x-10 justify-between">
          <div className="flex space-x-10">

        <Avatar className="w-16 h-16">
            <AvatarImage alt="User Avatar" src="https://github.com/MRsabcod.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
      
          <div>
            <h2 className="text-xl font-semibold">{user.username}</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Experienced real estate agent with a passion for helping clients find their dream homes.
            </p>
          </div>
          </div>
        
          <Button className="mt-4 " variant="outline"  onClick={userlogout}>
            Logout
          </Button>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 px-6 py-8">
        <h3 className="text-lg font-semibold mb-4">Active Listings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       
          
           {userProductBuck?.map((items,i) => {
          console.log(items)
          return <Prodcard items={items} i={i}  />
        })}
        </div>
      </div>
    </div>
  )
}