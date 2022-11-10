import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { addMemberToGroup, chatState, editGroupName, removeFromGroup, toggleGroupMembersPopup } from '../../slice/chat/chatSlice';
import { Autocomplete, Avatar, IconButton, LinearProgress, List,  ListSubheader,  Paper, TextField } from '@mui/material';
import { getUsers, userState } from '../../slice/userSlice';
import { useState } from 'react';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useEffect } from 'react';
import { notificationState } from '../../slice/notification/notificationSlice';
import SingleMember from './SingleMember';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DoneIcon from '@mui/icons-material//Done';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: 600,
    display:"flex",
    alignItems:"center",
    justifyContent:"center", 
    flexDirection:"column",
  };
  
  export default function GroupMembers() {
    const { groupMembersPopup, selectedChat } = useSelector(chatState)
    const { user, allUsers } = useSelector(userState)
    const dispatch = useDispatch()
    const [searchUser, setSearchUser] = useState(null) 
    const [groupName, setGroupName] = useState(selectedChat?.chatName)
    
    const [ usersToAdd, setUsersToAdd ] = useState([])

    useEffect(() => {
      setUsersToAdd(allUsers?.filter((member) => {
        return selectedChat?.users.filter((us) => us._id === member._id).length < 1  
      }))
    }, [searchUser, groupMembersPopup, allUsers, selectedChat])
  
    useEffect(() => {
      setSearchUser(null)
      setGroupName(selectedChat?.chatName)
    }, [selectedChat])

    const changeGroupName = () => {
      if(!groupName || groupName === selectedChat?.chatName) return 
      dispatch(editGroupName({chatId:selectedChat._id, chatName:groupName}))
    }

    const addToGroup = () => {
      if(!searchUser || !selectedChat) return
      dispatch(addMemberToGroup({userId:searchUser._id, chatId:selectedChat._id}))
    }
    
    const handleClose = () => {
          dispatch(toggleGroupMembersPopup())
    }
    const leaveGroup = () => {
     dispatch(removeFromGroup({chatId:selectedChat._id, userId:user._id}))
      dispatch(toggleGroupMembersPopup())
    }

    if(!selectedChat && groupMembersPopup) return <LinearProgress/>
    return (
      <div>
        <Modal
          open={ groupMembersPopup }
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Paper sx={style}>
             <List  sx={{ width: '70vw', maxWidth: 700, maxHeight:150, height:"60vh", bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={<>
                    <ListSubheader sx={{textAlign:"center"}}>Group Name</ListSubheader>
                        <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", marginBottom:3}}>
                            <TextField sx={{marginLeft:5}} onChange={(e) => setGroupName(e.target.value)} aria-readonly variant="standard" defaultValue={groupName} />
                            <IconButton onClick={changeGroupName} color="primary" disabled={selectedChat?.chatName === groupName?.trim()}>
                                  <DoneIcon />
                            </IconButton>
                        </Box>
          
                       
                        <Box sx={{display:"flex", flexDirection:"row", gap:1}}>
                              <Autocomplete
                            value={searchUser}
                            sx={{backgroundColor:"white", borderRadius:"5px"}}
                            id="checkboxes-tags-demo"
                            options={usersToAdd ? usersToAdd : []}
                            getOptionLabel={(user) => user.email}
                            onChange={(event, newValue) => {
                              setSearchUser(newValue)
                            }}
                            renderOption={(props, user, { selected }) =>   (
                                <li {...props}>
                                  <Box sx={{display:"flex", alignItems:"center", width:"100%", justifyContent:"space-between"}}>
                                  <Box sx={{display:"flex", gap:1}}><Avatar sx={{maxWidth:"25px", maxHeight:"25px"}} src={user?.pic}/> <span>{user?.email}</span></Box>
                                  </Box>
                                </li>
                            )}
                            style={{ width: 600 }}
                            renderInput={(params) => (
                              <TextField {...params}  fullWidth  placeholder="Search User..." />
                            )}
                          />
                          
                          <Button disabled={!searchUser} onClick={addToGroup} color="primary" >Add</Button></Box>
                    </>
                    }
                    />
                    <Box sx={{overflow:"scroll", width:"70vw", maxWidth:700, maxHeight:700 , marginTop:5}}>
                        {selectedChat?.users.map((member) => <SingleMember  key={member._id} member={member} />)}
                    </Box>
                    <Button onClick={leaveGroup} sx={{marginTop:5}} variant="contained" color="error" fullWidth>LEAVE</Button>
                  {/* <Button type='submit' startIcon={<GroupAddIcon/>} onClick={createGroup} variant='contained' disabled={checkedUsers?.length > 1 && groupName? false: true}>Group</Button> */}
            <List/>
          </Paper>
        </Modal>
      </div>
    );
  }
  