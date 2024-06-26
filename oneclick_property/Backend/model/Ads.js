
import mongoose from 'mongoose';
const { Schema } = mongoose;
import multer from 'multer'

const addSchema = new Schema({
  verified:{
    type:Boolean,
    default:false 
  },
  title: {
    type: String,
    required:  true,
  }, 
 
    desc: {
    type: String,
    required:  true,
  },
  
  price: {
    type: Number,
    required:  true,
  },
  username: { type: String },

  userId :{
    type:String,
    required:true
  
  },
  images:{
   data: Buffer,
   contentType: String
  },
  contact:{
    type:[String],
  },
 
    additionalInfo:{
      category: {
        type: String,
        
        },
      propertyType:{
        type:String,
     },
     floorType:{
        type:String,
     },
     
       propertyAge:{
        type:Number,
        },
        noOfBedrooms:{
          type:Number
        },
        noOfBathrooms:{
          type:Number
        },
        discount:{
          type:Number
        }
    },location:{
      city:{
        type:String
      }
    }

  
})
const Ads = mongoose.model('ads', addSchema);
const imageSchema=new Schema({
  images:{
    data: Buffer,
    contentType: String
  }, 
})
export const ImageSchema = mongoose.model('image', imageSchema);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null,  uniqueSuffix+file.originalname)
    }
  })
  export const upload = multer({ storage})
export  default Ads;