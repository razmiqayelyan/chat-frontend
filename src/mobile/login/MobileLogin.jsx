import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userLogin, userState } from '../../slice/user/userSlice'
import styles from './style'


const MobileLogin = () => {
  const {token} = useSelector(userState)
    const dispatch = useDispatch()
    const [userInfo, setUserInfo] = useState({email:"", password:""})
    let navigate = useNavigate();
    const disabled = !userInfo.email || !userInfo.password

    const handleChange = (e) => {
      setUserInfo(user => ({...user, [e.target.name]:e.target.value}))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(userLogin(userInfo))
        setUserInfo({email:"", password:""})
    }
    
    useEffect(() => {
      if(token) navigate("/")
    }, [token, navigate])

  return (<>
       <Box data_name="main_box" sx={styles.main_box}>
      <Paper data_name="login_papper" sx={styles.login_papper}>
        <form style={styles.mobile_login_form} onSubmit={onSubmit}>
        <Typography data_name="login_title" sx={styles.login_title}>Login</Typography>
          <TextField onChange={handleChange} name="email" aria-required required type="email" label="Email" />
          <TextField onChange={handleChange} name="password" aria-required required type="password" label="Password" />
          <Link data_name="register_link" style={styles.register_link} to="/register">Dont have account?</Link>
          <Button type='submit' variant="contained"  disabled={disabled}>Login</Button>   
        </form>
      </Paper>
    </Box>
  
  </>
 
  )
}

export default MobileLogin