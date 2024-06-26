import express from 'express'
import router from './Routes/index.js'
import db from './config/db.js'
import passport from 'passport'
import session from 'express-session'
import cors from 'cors';
// import strategy from './config/passport.js'

db.connection.once('open', () => console.log("connected to db")).on("error", (err) => console.log("error connecting db -->", err))

const app=express()

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.session());
const port=3001
app.use(express.urlencoded({ extended: false }))
app.listen(port,()=>{
    console.log('server is running on port ',port)
   
})
app.use('/',router)
app.use(passport.initialize())