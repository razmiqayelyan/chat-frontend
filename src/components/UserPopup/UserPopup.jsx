import { Avatar, Box, Button, Modal, Paper, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { profileEdit, toggleUserModal, userState } from '../../slice/userSlice';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    width:"50vw",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    minHeight: "50vh",
    display:"flex",
    alignItems:"center",
    justifyContent:"center", 
    flexDirection:"column",
  };
  
const UserPopup = () => {
    const { user, userModal } = useSelector(userState)
    const [ updatedUser, setUpdatedUser ] = useState({name:"" , pic:""})

    const dispatch = useDispatch()


    const handleChange = (e) => {
        setUpdatedUser((user) => ({...user, [e.target.name]:e.target.value}))
    }
    const handleClose = () => {
      dispatch(toggleUserModal())
      setUpdatedUser({name:"" , pic:""})
      }

    const editMyProfile = () => {
        let {name, pic} = updatedUser
        if(!name && !pic) return 
        dispatch(profileEdit({name, pic}))        
    }
      if(!user) return
    return (
        <div>
          <Modal
            open={ userModal }
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Paper sx={style}>
               <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:3 , minWidth:300, maxWidth:500, width:"30vw", maxHeight:"60vh"}}>
                    <h3>Profile Settings</h3>
                    <Avatar src={user.pic}/>
                    <TextField onChange={handleChange} name='name' fullWidth label="Name" placeholder='Name' defaultValue={user.name} variant="standard" />
                    <TextField fullWidth label="Email" aria-readonly  placeholder='Email' value={user.email} variant="standard" />
                    <TextField onChange={handleChange} name="pic" fullWidth label="Image URL"  aria-readonly  placeholder='Picture URL' defaultValue={user.pic} variant="standard" />
                    <Button onClick={editMyProfile} disabled={updatedUser.name || updatedUser.pic? false : true} fullWidth variant="text">SAVE</Button>
               </Box>
            </Paper>
          </Modal>
        </div>
      );
}

export default UserPopup