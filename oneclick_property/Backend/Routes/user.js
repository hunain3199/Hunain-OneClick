
import express from 'express'
import User from '../model/User.js'
import router from './index.js'
import verifyToken from '../middleware/verifyToken.js'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'
// import GoogleStrategy from 'passport-google-oauth2'
// import strategy from '../config/passport.js'

const userRouter=express.Router()
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  }
passport.use(new GoogleStrategy({
    clientID:     '632911683736-7mr2jvb48jk46lt9o8edghb6r2pjatto.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3001/users/auth/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    console.log(profile)
    try {
        // Find or create a user based on Google profile
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
            user = await User.create({
                email: profile.emails[0].value,
                username: profile.displayName,
                // Add any other fields you need here
            });
        }
        
        // Generate JWT token
        // const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const token=user.generateToken();
user.token.push(token)
await user.save()
        return done(null, { user, token });
    } catch (err) {
        return done(err, null);
    }
  }
));
passport.serializeUser(function(user, done) {
    done(null, {user,text:"gg"});
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
userRouter.get('/',async (req, res) => {
const users=await User.find()
res.send({data:users,message:"FETCH SUCCESSFULLY"})
})
userRouter.post('/register',  async (req, res)=>{
    const body = req.body;
    try{
    if(body)
       return  User.create(body).then((user)=>res.status(201).json({data:user, message:'USER CREATED'}))
if(!body)
return  res.status(400).json({
    message:'DATA IS MISSING'})
    }
    catch(err){
        console.log(err)
    }
    })
    userRouter.put("/login",async (req, res)=>{
       const {email,password}=req.body

        const user=await User.findOne({email})
    if(!user) return res.status(400).send({ error: 'Invalid Email' })
    const isMatch= await user.isCorrectPassword(password)
if(!isMatch) return res.status(400).send({ error: 'Invalid Password' })
const token=user.generateToken();
console.log(token)
user.token.push(token)
await user.save()
return  res.send({message:"Logged in successfully",userId:user._id,token,username:user.username});

})
    userRouter.put('/logout',verifyToken,async(req,res)=>{
        
      await  User.findByIdAndUpdate(req?.userId ,{$pull:{token:req.tokenToLogout}},)
      res.send({message:"Successfully logged out!",userId:req.userId})
    })
    userRouter.get('/auth/google',
    passport.authenticate('google', { scope:
        [ 'email', 'profile' ] }
  ));
  
  userRouter.get( '/auth/google/callback',
      passport.authenticate( 'google', {
        
          failureRedirect: 'http://localhost:5173/login'
  }),
  (req, res) => {
    // Access the user and token from the profile
    const { user, token } = req.user;
    res.redirect(`http://localhost:5173/auth/success?token=${token}&username=${user?.username}&userId=${user?._id}`);
}
);
  userRouter.get('/auth/google/success', (req, res) => {
    const {username,_id,token}=req.user?.user.user
    console.log(req.user)
    return  res.send({message:"Logged in successfully",userId:_id,token,username});
  });
  userRouter.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
  });
export default userRouter
