import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './components/login/LoginPage'
import Register from './components/login/Register'

import MainPage from './components/main/Main'

import { userState, userValidation } from './slice/userSlice';


const App = () => {
  const { token , user} = useSelector(userState)
  const dispatch = useDispatch()



  useEffect(() => {
    if(token && !user) {
      dispatch(userValidation(token))
    }
  }, [token])
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/" element={<MainPage />}/>
        </Routes>
    </BrowserRouter>     
    </>
  )
}

export default App