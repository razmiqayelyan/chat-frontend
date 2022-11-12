import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './components/login/LoginPage';
import Register from './components/register/Register';
import MainPage from './components/main/Main';
import { userState, userValidation } from '../slice/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { token , user, error} = useSelector(userState)
  const dispatch = useDispatch()

  const setToast = (error) => {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER
      })
  }

  useEffect(() => {
    if(!error) return
    else setToast(error)
    // eslint-disable-next-line
}, [error])


  useEffect(() => {
    if(token && !user) {
      dispatch(userValidation(token))
    }
    // eslint-disable-next-line 
  }, [token])
  return (
    <React.Fragment>
    <ToastContainer/>
     <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/" element={<MainPage />}/>
        </Routes>
    </BrowserRouter>     
    </React.Fragment>
  )
}

export default App