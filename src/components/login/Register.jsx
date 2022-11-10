import React from 'react'
import { useState , useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { userRegister, userState } from '../../slice/userSlice';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import "./auth.css"

const LoginPage = () => {
    const {user:auth, token} = useSelector(userState)
    const dispatch = useDispatch()
    const [user, setUser] = useState({email:"", password:"", name:"", confirmPassword:""})
    let navigate = useNavigate();

    const handleChange = (e) => {
        setUser(user => ({...user, [e.target.name]:e.target.value}))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(user.password !== user.confirmPassword) return
        dispatch(userRegister(user))
        setUser({email:"", password:"", name:"", confirmPassword:""})
    }

    
    useEffect(() => {
      if(token) navigate("/")
    }, [token])


    
  return (
    <Box sx={{width:"100vw", height:"100vh", display:"flex", alignItems:"center", justifyContent:"center", flexGrow:1}}>
    <Paper sx={{height:"70vh", display:"flex", alignItems:"center", justifyContent:"center", flexGrow:1, flexDirection:"column", maxWidth:"60vw", gap:3}}>
      <Box>      
        <Typography variant='h4'>Create Account</Typography>
      </Box>
      <TextField  required style={{maxWidth:"30vw"}} fullWidth label="Name"  name='name' onChange={handleChange} type="text" />
      <TextField required style={{maxWidth:"30vw"}} fullWidth  label="Email"  name='email' onChange={handleChange} type="email" />
      <TextField required style={{maxWidth:"30vw"}} fullWidth  label="Password" name="password" onChange={handleChange}  type="password" />
      <TextField required style={{maxWidth:"30vw"}} fullWidth  label="Confirm Password" name="confirmPassword" onChange={handleChange}  type="password" />
      <Link to={'/login'} style={{fontSize:"10px", textDecoration:"none", color:"blue"}}>Already have account?</Link>
      <Button type='submit' onClick={onSubmit} >Register</Button>
    </Paper>
    </Box>
  )
}

export default LoginPage