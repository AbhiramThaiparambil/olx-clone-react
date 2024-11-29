import React,{useEffect,useContext} from 'react';
import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Signup from './Pages/Signup'
 import Login from './Pages/Login'
 import {UserContext,FirebaseContext} from './store/firebaseContext'
 import {onAuthStateChanged } from "firebase/auth";
 import ViewProduct from './Pages/ViewPost'
import Create from './Components/Create/Create';
/**
 * ?  =====Import Components=====
 */


import Home from './Pages/Home';
import ShimmerUI from './Pages/shimmer';

 
const appRouter = createBrowserRouter([
  {
    path:'/',
    element: <Home />
 
  },
  {
    path:'/signup',
    element:<Signup/>
  },{
    path:'/login',
    element:<Login/>
  },{
    path:'/sell-Product',
    element:<Create/>
  },{
    path:'/product-details/:id',
    element:<ViewProduct/>
  }
  // ,
  // {
  //   path:'/shimmer',
  // }
]);

function App() {
  const {authUser,setAuth}=useContext(UserContext);
const {auth} = useContext(FirebaseContext)

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      setAuth(user)
    })

    

    
       
  },[authUser])
  return <RouterProvider router={appRouter} />

}



export default App;
