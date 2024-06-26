import { Carousel, Dropdown, Spinner } from 'flowbite-react'

import React, { useEffect, useState } from 'react'
import { addProductManually } from '../../config/Firebase/Firebase'
import axios from 'axios'
// import  {Map}  from 'react-map-gl'
import Mapcomp from '../../components/Map/Map'
import { useNavigate } from 'react-router-dom'
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "../../components/ui/select"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import Swal from 'sweetalert2'
import Linefiller from '../../components/Linefiller/Linefiller'
import userdetails from '../../context/Usercontextprovider'
import { Loader2, LoaderCircle } from 'lucide-react';




export const AddProd = () => {
  const navigate = useNavigate()
  const [title, settitle] = useState('')
  const [desc, setdesc] = useState('')
  const [category, setcategory] = useState('sell')
  const [price, setprice] = useState(0)
  const [id, setid] = useState(31)
  const [file, setFile] = useState()
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState('home')
  const [noOfBathrooms, setnoOfBathrooms] = useState(1)
  const [noOfBedrooms, setnoOfBedrooms] = useState(1)
  const [propertySize, setpropertySize] = useState([])
  const [floorType, setfloorType] = useState('marble')
  const [propertyAge, setpropertyAge] = useState('')
  const [discount, setdiscount] = useState(5)
  const [loading, setLoading] = useState(false);
  const {AdandUpdate,addetails}=userdetails()

  const handleNextStep = () => {


    setStep(step + 1);
  };

  const upload = async (e) => {
setLoading(true)

    e.preventDefault()

    const formData = new FormData()
    if (file?.size > 100000) {
      settitle('')
      setprice('')
      setdesc('')
      setFile()
      alert('please fill the form again')
    }
    else {
      formData.append("file", file)
      formData.append('title', title);
      formData.append('desc', desc);
      formData.append('price', price);
      formData.append('userId', localStorage.getItem('userId'));
      formData.append('username', localStorage.getItem('username'));

      // navigate('/addpicture')
      try {
        const response = await axios.post('/ads/uploadBasicDetails', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }).then((res) => {
          console.log(res.data.ad._id)
          AdandUpdate({adId:res.data.ad._id})
          console.log(addetails)
          setLoading(false)
          setStep(step + 1);

                  })

        console.log('File uploaded successfully:', response.data);
        
      } catch (error) {
        console.error('Error uploading file:', error.message);
      }
    }
  }
const uploadadditional=async (e)=>{
  e.preventDefault()
  axios({
  
    method: 'post',
  
    url: '/ads/uploadAdditionalDetails',
    headers:{
      _id:addetails.adId
    },
  
    data: {
  
      propertyType,
      floorType,
      propertySize,
      propertyAge,
      noOfBedrooms,
      noOfBathrooms, 
      category,
      discount
  
    }
  
  })
  
    .then(response => console.log(response))
  
    .catch(error => console.log(error));
}

  const deleteimg = (index) => { console.log(images.splice(index, 1)) }
  // console.log(typeof images[0])

  return (
    <div className='h-fit' >
         {loading && (
          <Spinner className=''/>
         )} 
{step==1 &&(
      <div className="flex justify-center items-center my-10">
        <div className="bg-white dark:bg-gray-900 shadow-2xl shadow-slate-400 rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Add New Product</h1>
          <form action="/upload" method='POST' encType=' multipart/form-data' onSubmit={upload} className="space-y-4">
            
            <div>
              <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300" htmlFor="name">
                Property Title
              </label>
              <input
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none  focus:ring-gray-600 focus:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                id="name"
                placeholder="Enter product name"
                type="text"
                onChange={(e) => settitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300" htmlFor="description">
                Description
              </label>
              <textarea
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none  focus:ring-gray-600 focus:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                id="description"
                placeholder="Enter product description"
                rows={3} onChange={(e) => setdesc(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300" htmlFor="price">
                Price
              </label>
              <input
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none  focus:ring-gray-600 focus:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                id="price"
                placeholder="Enter product price"
                type="number" onChange={(e) => setprice(e.target.value)}
              />
            </div>
            {/* <div>
              <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300" htmlFor="category">
                Category
              </label>
              <select
                className="
                id="category" 
                // onChange={}
              >
                <option value="">Select a category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home</option>
                <option value="sports">Sports</option>
              </select>
            </div> */}
            <div>
              <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300" htmlFor="image">
                Image
              </label>
              <div className="flex items-center">
                <label
                  className="bg-primary-500 hover:bg-primary-600  font-medium py-2 px-4 rounded-md cursor-pointer"
                  htmlFor="image"
                >
                  <input className="hidden" id="image" type="file" onChange={e => { setFile(e.target.files[0]); console.log(file) }} />
                  Upload Image
                </label>
                <span className="ml-2 text-gray-500 dark:text-gray-400">{file ? file.name : "No file chosen"}</span>
              </div>
            </div>
            <Button
              onSubmit={handleNextStep}
              className="w-full bg-transparent hover:bg-gray-100 text-[#23970C] font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-600 dark:hover:bg-primary-700"
              type="submit"
              variant="outline"
            >
              Advance
            </Button>
          </form>
        </div>
      </div>
      )}
      {step==1.5 &&(
        <div className="flex justify-center items-center h-[450px]">
        <Linefiller step={step-1.5}/>
        </div>
      )}

{step==2 && (
      <div className="flex justify-center items-center my-10">
       
        <form className="bg-white space-y-4 dark:bg-gray-900 shadow-2xl shadow-slate-400 rounded-lg p-8 w-full max-w-md" onClick={uploadadditional}>
        <h1 className="text-2xl font-bold mb-4 text-center">Additional Info</h1>
         
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="category">
              Category
            </label>
            <Select defaultValue="sell"  id="category" onValueChange={(e)=>console.log(e)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className=''>
                <SelectItem value="sell">Sell</SelectItem>
                <SelectItem value="rent">Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="type">
              Property Type
            </label>
            <Select defaultValue="home" id="type">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="home" onClick={(e)=>setPropertyType(e.target.value)}>Home</SelectItem>
                <SelectItem value="plot" onClick={(e)=>setPropertyType(e.target.value)}>Plot</SelectItem>
                <SelectItem value="commercial" onClick={(e)=>setPropertyType(e.target.value)}>Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="floor">
              Floor Type
            </label>
            <Select defaultValue="marble" id="floor">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select floor type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="marble" onClick={(e)=>setfloorType(e.target.value)}>Marble</SelectItem>
                <SelectItem value="wood" onClick={(e)=>setfloorType(e.target.value)}>Wood</SelectItem>
                <SelectItem value="tile" onClick={(e)=>setfloorType(e.target.value)}>Tile</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium flex items-center gap-2" htmlFor="area">
              Area <Select>
              <SelectTrigger defaultValue='Marla' className="w-1/3">
                <SelectValue placeholder="Select floor Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='marla' >Marla</SelectItem>
                <SelectItem value='sq.ft' >Sq.ft</SelectItem>
              </SelectContent>
              </Select>
            </label>
            <Input id="area" placeholder="Enter area" type="number" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium"  htmlFor="bedrooms">
              No. of Bedrooms
            </label>
            <Input className="w-full" id="Bedrooms" placeholder="No. of Bedrooms" type="text" onChange={(e) => setnoOfBedrooms(e.target.value)} />

          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="bathrooms">
              No. of Bathrooms
            </label>
            <Input className="w-full" id="Bathrooms" placeholder="No. of Bathrooms" type="number" onChange={(e) => setnoOfBathrooms(e.target.value)} />

          </div>
         
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="discount">
              Discount (%)
            </label>
            <Input id="discount" placeholder="Enter discount" type="number" onChange={(e)=>setdiscount(e.target.value)}/>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="discount">
              Property Age
            </label>
            <Input id="propertyAge" placeholder="how Old is your property?" type="text" onChange={(e)=>setpropertyAge(e.target.value)}/>
          </div>
          <Button
              onSubmit={handleNextStep}
              className="w-full bg-transparent hover:bg-gray-100 text-[#23970C] font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-600 dark:hover:bg-primary-700"
              type="submit"
              variant="outline"
            >
              Advance
            </Button>
      </form>
      </div>
      )}
      </div>
      )
}




