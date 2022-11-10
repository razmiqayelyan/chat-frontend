import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OneToOneChat, setSelectedChat, toggleAddGroupModel, toggleModel } from '../../../slice/chat/chatSlice'
import './Navbar.css'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import { Autocomplete, Avatar, IconButton, TextField } from '@mui/material'
import { getUsers, setWithUser, toggleUserModal, userInitial, userState } from '../../../slice/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';


const Navbar = () => {
  const dispatch = useDispatch()
  const { user , allUsers, withUser} = useSelector(userState)
  const [searchUser, setSearchUser] = useState(null) 
  const [logout, setLogout] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    if(allUsers) return
    else dispatch(getUsers())
  }, [allUsers])

  useEffect(() => {
    if(withUser) {
      dispatch(OneToOneChat(withUser))
    }
  }, [withUser])



  useEffect(() => {
    if(!searchUser) return
    else {
      dispatch(setWithUser(searchUser))
      setSearchUser(null)
    }
  }, [searchUser])

  const openModal = () => {
    dispatch(toggleUserModal())
  }


  const handleOpen = () => {
    dispatch(toggleAddGroupModel())
  }

  useEffect(() => {
    if(logout){
      setLogout(false)
      navigate("/login")
      window.location = "/"
    }
  }, [logout])
  const signOut = () => {
    localStorage.removeItem("token")
    dispatch(userInitial())
    setLogout(true)
  }
  return (
    <div className='navbar'   style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap:"10px", width:"100vw"}}>
        <div style={{display:"flex",marginLeft:"100px", alignItems:"center", justifyContent:"space-between", minWidth:"20vw"}}>
        <Link onClick={() => dispatch(setSelectedChat())} style={{color:"white", textDecoration:"none"}} to="/" >Chat App</Link>
        <div  onClick={handleOpen} style={{ display:"flex", justifyContent:"center", alignItems:"center", textAlign:"center",cursor:"pointer",}}>
          <GroupAddIcon />
              <span>Group</span>    
        </div>    
        </div>

        <Autocomplete
                      value={searchUser}
                      sx={{backgroundColor:"white", borderRadius:"5px"}}
                      id="checkboxes-tags-demo"
                      options={allUsers ? allUsers : []}
                      getOptionLabel={(user) => user.email}
                      // getOptionLabel={(user) => (<Box sx={{display:"flex", gap:1}}><Avatar sx={{maxWidth:"25px", maxHeight:"25px"}} src={user?.pic}/> <span>{user?.name}</span></Box>)}
                      onChange={(event, newValue) => {
                        setSearchUser(newValue)
                      }}
                      renderOption={(props, user, { selected }) =>   (
                          <li {...props}>
                            <Box sx={{display:"flex", alignItems:"center", width:"100%", justifyContent:"space-between"}}>
                            <Box sx={{display:"flex", gap:1}}><Avatar sx={{maxWidth:"25px", maxHeight:"25px"}} src={user?.pic}/> <span>{user?.email}</span></Box>
                            <ChatBubbleOutlineOutlinedIcon color='primary'  />
                            </Box>
                          </li>
                      )}
                      style={{ width: 500 }}
                      renderInput={(params) => (
                        <TextField {...params}  placeholder="Search User..." />
                      )}
                    />
   
        <div style={{display:"flex", gap:"20px"}}>
          <IconButton onClick={openModal}>
            <Avatar alt={user?.name} src={user?.pic}/>
          </IconButton >
          
          <IconButton onClick={signOut} sx={{color:"white"}}>
            <LogoutIcon/>
          </IconButton>
        </div>
    </div>
  )
}

export default Navbar