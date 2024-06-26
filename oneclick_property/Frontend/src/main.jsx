import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,Route,
  HashRouter
} from "react-router-dom";
import Details from './screens/Details/Details.jsx'
import SignIn from './screens/SignIn/SignIn.jsx';
import Login from './screens/Login/Login.jsx';
import Category from './screens/Category/Category.jsx';
import Layout from './Layout/Layout.jsx';
import Forgotpassword from './screens/Login/Forgotpassword.jsx';
import { Provider } from 'react-redux';
import {store,persistor} from './app/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import Cart from './screens/Cart/Cart.jsx';
import  { AddProd } from './screens/Details/AddProd.jsx';
import UserProfile from './screens/UserProfile/UserProfile.jsx';
import PrivateRoutes from './Routes/PrivateRoutes.jsx';
import { GoogleAuthProvider } from 'firebase/auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthSuccess from './screens/Login/AuthSuccess.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route path="/" element={<Layout />} >
    <Route element={<PrivateRoutes/>}>
 
{/* <HashRouter> */}
        <Route path="/:prodcategory" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/addproduct" element={<AddProd />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        {/* <Route path="/addpicture" element={<Addpicture />} /> */}
        <Route path="/userprofile" element={<UserProfile />} />
    </Route>
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route path="/" element={<App />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/details/:prodid" element={<Details />}  />
        
        </Route>
        
  // </HashRouter>
  ) 
  );

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='632911683736-7mr2jvb48jk46lt9o8edghb6r2pjatto.apps.googleusercontent.com'>

  <Provider store={store}>
 <PersistGate loading={null} persistor={persistor}>
 

    
 <RouterProvider router={router}/>
 </PersistGate>
  </Provider>,
  </GoogleOAuthProvider>
)
