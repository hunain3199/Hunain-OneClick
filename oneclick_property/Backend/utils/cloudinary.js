import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
          
const uploadOnCloudinary=async(localfilepath) => {
    try{ 
    if(!localfilepath)
    return console.log("No file path provided");
const response= await cloudinary.uploader.upload(localfilepath,{resource_type:'auto'})
console.log("file uploaded",response.url) 
return response
}
 catch(err){console.error(err)
fs.unlinkSync(localfilepath)
return null
}
}    
cloudinary.config({ 
  cloud_name: 'dvidvllsh', 
  api_key: '268882725547574', 
  api_secret: 'f5fzIF5mn2dC6swxWWu07SGb9i0' 
});