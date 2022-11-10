import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { chatState, createGroupChat, toggleAddGroupModel, toggleModel } from '../../slice/chat/chatSlice';
import { Autocomplete, Avatar, Checkbox, FormControlLabel, FormGroup, Paper, TextField } from '@mui/material';
import { getUsers, userState } from '../../slice/userSlice';
import { useState } from 'react';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useEffect } from 'react';
import { notificationState } from '../../slice/notification/notificationSlice';

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
        <Paper sx={style}>
           <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:3}}>
                <h3>Create Group Chat</h3>
                <form>
                <TextField  required fullWidth onChange={myGroupName} id="standard-basic" label="Group Name" variant='outlined' />
                    {/* <TextField fullWidth onChange={searchUser} id="standard-basic" label="Users..." variant="standard" />  */}
                    
                    <Autocomplete
                      sx={{maxWidth:"25vw", marginTop:3}}
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
                            <Checkbox  style={{ marginRight: 8 }} checked={selected}/>
                            <Box sx={{display:"flex", gap:1}}><Avatar sx={{maxWidth:"25px", maxHeight:"25px"}} src={user?.pic}/> <span>{user?.email}</span></Box>
                          </li>
                      )}
                      style={{ width: 500 }}
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
