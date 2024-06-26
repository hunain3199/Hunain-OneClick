import express from 'express'
import Ads, {  ImageSchema, upload } from '../model/Ads.js'
import verifyToken from '../middleware/verifyToken.js'
import fs from 'fs'
import { title } from 'process'
import e from 'express'
const adsRouter=express.Router()

adsRouter.get( '/', async(req,res)=>{
let postedads=[]
const ads=await Ads.find()
ads.forEach((e)=>{
if(ads?.verified)
    postedads.push(e)
})
    
    res.status(200).json({message:'Welcome to the Advertisement Route!',data:postedads})

})
adsRouter.post('/ad', async(req,res)=>{
    try{
    console.log(req?.body.prodid)
    const ad=await Ads.findById(req?.body.prodid)
    if(!ad) return res.status(400).send('Invalid ad')
    console.log('succ')
    res.status(200).send({message:'Welcome to the Advertisement Route!',data:ad})
    }
catch(e){
    console.log(e)
}
})
adsRouter.post('/uploadBasicDetails',upload.single('file'),async (req,res)=> {
    
     
    try{
         Ads.create({...req.body,
            
            images:{data:fs.readFileSync("uploads/" + req.file.filename),
            contentType:'image/*'}}).then( (newAdd)=>{

                console.log(req)
                
                if(!newAdd) { return res.status(400).send('Invalid ad')}
                res.status(200).send({message:'AD Basic Created',ad:newAdd})
            })
}
    catch(err){
        return res.status(400).send("Error creating new add")
    }
   
})
adsRouter.post('/uploadAdditionalDetails',async (req,res)=>{
    try{
        const filter = { _id: req.headers._id };
        const update = { additionalInfo:req.body };
      
        const result = await Ads.findOneAndUpdate(filter, update)
           if(!result) {
           res.status(404).send({error: "Post is not find !"})
        }
        else {
            console.log(result,"done")
        }
      }catch(err){
       res.status(500).send({error: err })
      }
})
adsRouter.put('/uploadimg',async (req,res)=>{
    // let imgLink=req.file.filename
    // console.log(imgLink)
    // await Ads.findByIdAndUpdate("66033b42b8ba9832fd1ec9b2",{$push:{images:{
    //     data:imgLink,
    //     contentType:'image/*'
    // }}})
    upload(req,res,(err)=>{
        if(err){console.log(err)}
        else{
            const newImage=new ImageSchema({
                image:req.file.filename,
                contentType:'image/*'
        })
        newImage.save().then(()=>{req.send('request sent successfully')}).catch((err)=>{console.log(err)})

        }
    })
    // console.log(req.user._id)
} )
export default adsRouter