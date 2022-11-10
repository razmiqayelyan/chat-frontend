import React from 'react'
import { useState , useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { userLogin, userState } from '../../slice/userSlice';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import "./auth.css"

const LoginPage = () => {
    const {user:auth, token} = useSelector(userState)
    const dispatch = useDispatch()
    const [user, setUser] = useState({email:"", password:""})
    let navigate = useNavigate();


    const handleChange = (e) => {
        setUser(user => ({...user, [e.target.name]:e.target.value}))
    }

    const onSubmit = () => {
        dispatch(userLogin(user))
    }

    
    useEffect(() => {
      if(token) navigate("/")
    }, [token])


    
  return (
    <Box sx={{width:"100vw", height:"100vh", display:"flex", alignItems:"center", justifyContent:"center", flexGrow:1}}>
    <Paper sx={{height:"70vh", display:"flex", alignItems:"center", justifyContent:"center", flexGrow:1, flexDirection:"column", maxWidth:"60vw", gap:3}}>
      <Box>      
        <Typography variant='h4'>Login</Typography>
      </Box>
      <TextField label="Email"  name='email' onChange={handleChange} type="email" />
      <TextField label="Password" name="password" onChange={handleChange}  type="password" />
      <Link to={'/register'} style={{fontSize:"10px", textDecoration:"none", color:"blue"}}>Dont have account?</Link>
      <Button  onClick={onSubmit} >Login</Button>
    </Paper>
    </Box>
  )
}

export default LoginPage