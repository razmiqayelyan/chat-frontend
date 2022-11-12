import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { chatState, createGroupChat, toggleAddGroupModel } from "../../../slice/chat/chatSlice"
import { Autocomplete, Avatar, Checkbox, FormGroup, Paper, TextField } from '@mui/material';
import { getUsers, userState } from "../../../slice/user/userSlice";
import { useState } from 'react';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useEffect } from 'react';
import { notificationState } from "../../../slice/notification/notificationSlice"
import styles from './style'



export default function BasicModal() {
  const { createGroupPopup } = useSelector(chatState)
  const { allUsers} = useSelector(userState)
  const dispatch = useDispatch()
  const [ checkedUsers, setCheckedUsers ] = useState([])
  const [groupName, setGroupName] = useState("")


  const { notifications } = useSelector(notificationState)

  useEffect(() => {
    if(notifications !== []){
      localStorage.setItem("notifications", JSON.stringify(notifications))
    }
  }, [notifications])

  useEffect(() => {
    if(!createGroupPopup) return
    dispatch(getUsers())
    // eslint-disable-next-line 
  } , [createGroupPopup])
  
  const handleClose = () => {
    dispatch(toggleAddGroupModel())
  }
  const myGroupName = (e) => {
    setGroupName(e.target.value)
  }

  const createGroup = (e) => {
    e.preventDefault()
    dispatch(createGroupChat({users:checkedUsers, name:groupName}))
    handleClose()
    setCheckedUsers([])
  }
  return (
    <div>
      <Modal
        open={ createGroupPopup }
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={styles.main_paper}>
           <Box sx={styles.add_group_box}>
                <h3>Create Group Chat</h3>
                <form>
                <TextField  required fullWidth onChange={myGroupName} id="standard-basic" label="Group Name" variant='outlined' />
                    {/* <TextField fullWidth onChange={searchUser} id="standard-basic" label="Users..." variant="standard" />  */}
                    
                    <Autocomplete
                      sx={styles.add_group_autocomplate}
                      multiple
                      id="checkboxes-tags-demo"
                      disableCloseOnSelect
                      options={allUsers ? allUsers : []}
                      // getOptionLabel={(user) => (<Box sx={{display:"flex", gap:1}}><Avatar sx={{maxWidth:"25px", maxHeight:"25px"}} src={user?.pic}/> <span>{user?.name}</span></Box>)}
                      getOptionLabel={(user) => user?.name}
                      onChange={(event, newValue) => {
                        setCheckedUsers(newValue);
                      }}
                      renderOption={(props, user, { selected }) =>   (
                          <li {...props}>
                            <Checkbox  style={styles.li_checkbox} checked={selected}/>
                            <Box sx={styles.li_box}><Avatar sx={styles.li_avatar} src={user?.pic}/> <span>{user?.email}</span></Box>
                          </li>
                      )}
                      style={styles.add_group_autocomplate_style}
                      renderInput={(params) => (
                        <TextField {...params} label="Users..." placeholder="Users" />
                      )}
                    />
                </form>
                <FormGroup>
                    {/* {allUsers && allUsers.length > 0 &&
                        allUsers.map((user) => {
                            return (
                                <Box key={user._id} sx={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                                    <FormControlLabel onChange={() => addToList(user)} key={user._id} control={<Checkbox checked={checkedUsers.filter((el) => el._id === user._id ).length === 1? true: false} />} label={`${user.email}`} />
                                    <Avatar sx={{maxWidth:"20px", maxHeight:"20px"}} alt={user.name} src={user.pic}/>
                                </Box>
                            )
                        })
                        } */}
                </FormGroup>
                <Button type='submit' startIcon={<GroupAddIcon/>} onClick={createGroup} variant='contained' disabled={checkedUsers?.length > 1 && groupName? false: true}>Group</Button>
           </Box>
        </Paper>
      </Modal>
    </div>
  );
}
