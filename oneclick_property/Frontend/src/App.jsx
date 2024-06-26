import React, { useContext, useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Prodcard from './components/Prodcard/Prodcard'
import { auth } from './config/Firebase/Firebase'
// import Usercontext from './context/Usercontext'
import Usercontextprovider from './context/Usercontextprovider'
import Login from './screens/Login/Login'
import { useOutletContext } from 'react-router-dom'
import userdetails from './context/Usercontextprovider'
import { AdSlider } from './components/Slider/AdSlider'
import { SearchAd } from './components/SearchAd/SearchAd'

console.log(auth)

const App = () => {
  const [category, setCategory] = useState([])
  const {productbuck}=userdetails()
  
  
  // if(!productbuck.length){
  //   return(
  //     <div className='1.6rem  w-full   mt-[1.6rem] mb-[1.6rem] mr-auto ml-auto flex '>
  //     <h1>Fetching data</h1>
  //     </div>
  //   )
  // }
   return (
   <div className='flex flex-col items-center ' id=''>

   <div className='p-10'>

      <AdSlider  />
      <SearchAd/>
   </div>
      <div id='adp' className='1.6rem  w-full  max-w-screen-xl mt-[1.6rem] mb-[1.6rem] mr-auto ml-auto flex justify-evenly flex-wrap '>
        {productbuck?.map((items,i) => {
          console.log(items)
          return <Prodcard items={items} i={i} categories={category} />
        })}

      </div>
        </div>
      
        
    
  )
}


export default App