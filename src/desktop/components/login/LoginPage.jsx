import React from 'react';
import { useState , useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userState } from '../../../slice/userSlice';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import styles from './style'

const LoginPage = () => {
    const {token} = useSelector(userState)
    const dispatch = useDispatch()
    const [user, setUser] = useState({email:"", password:""})
    let navigate = useNavigate();


    const handleChange = (e) => {
        setUser(user => ({...user, [e.target.name]:e.target.value}))
    }

    const onSubmit = (e) => {
      e.preventDefault()
      dispatch(userLogin(user))
      setUser({email:"", password:""})
    }
    
    useEffect(() => {
      if(token) navigate("/")
    }, [token, navigate])

    
  return (
    <>
      <Box sx={styles.main_box}>
    <Paper sx={styles.login_paper}>
      <form style={styles.login_form} onSubmit={onSubmit}>
          <Box>      
            <Typography sx={styles.login_font} variant='h4'>Login</Typography>
          </Box>
          <TextField label="Email"  name='email' onChange={handleChange} type="email" />
          <TextField label="Password" name="password" onChange={handleChange}  type="password" />
          <Link to={'/register'} style={styles.to_register_link}>Dont have account?</Link>
          <Button type='submit' >Login</Button>
      </form>
    </Paper>
    </Box>
    </>
  )
}

export default LoginPage