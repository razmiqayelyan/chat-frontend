import { Avatar, Box, Button, Modal, Paper, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { profileEdit, toggleUserModal, userState } from '../../../slice/user/userSlice'
import styles from './style'

  
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
        handleClose()      
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
            <Paper  sx={styles.user_popup_paper}>
               <Box sx={styles.user_popup_box}>
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