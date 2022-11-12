import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {  userRegister, userState } from '../../slice/userSlice'
import styles from './style'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MobileRegister = () => {

  const {token} = useSelector(userState)
  const [userInfo, setUserInfo] = useState({email:"", password:"", name:"", confirmPassword:""})

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const disabled = (!userInfo.email || !userInfo.name || !userInfo.password || !userInfo.confirmPassword) || userInfo.password !== userInfo.confirmPassword
  
  const handleChange = (e) => {
    setUserInfo(user => ({...user, [e.target.name]:e.target.value}))
  }
  const onSubmit = (e) => {
      e.preventDefault()
      if(userInfo.password !== userInfo.confirmPassword) return toast.error('Password and Confirm Passwords are not match!', {
        position: toast.POSITION.TOP_CENTER
    });
      else {dispatch(userRegister(userInfo))
      setUserInfo({email:"", password:"", name:"", confirmPassword:""})
      }
  }

  
  useEffect(() => {
    if(token) navigate("/")
  }, [token, navigate])



  return (
    <>
     <ToastContainer/>
     <Box data_name="main_box" sx={styles.main_box}>
    <Paper data_name="register_papper" sx={styles.register_papper}>
      <form onSubmit={onSubmit} style={styles.mobile_register_form}>
        <Typography data_name="register_title" sx={styles.register_title}>Create Account</Typography>
        <TextField onChange={handleChange} name="name" aria-required required type="text" label="Name" />
        <TextField onChange={handleChange} name="email" aria-required required type="email" label="Email" />
        <TextField onChange={handleChange} name="password" aria-required required type="password" label="Password" />
        <TextField onChange={handleChange} name="confirmPassword" aria-required required type="password" label="Confirm Password" />
        <Link data_name="login_link" style={styles.login_link} to="/login">Already have account?</Link>
        <Button type='submit' variant="contained" disabled={disabled} >Register</Button>
      </form>
    </Paper>
  </Box>
    </>

  )
}

export default MobileRegister