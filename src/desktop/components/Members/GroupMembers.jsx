import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { addMemberToGroup, chatState, editGroupName, removeFromGroup, toggleGroupMembersPopup } from '../../../slice/chat/chatSlice'
import { Autocomplete, Avatar, IconButton, LinearProgress, List,  ListSubheader,  Paper, TextField } from '@mui/material';
import { userState } from '../../../slice/user/userSlice'
import { useState } from 'react';
import { useEffect } from 'react';
import SingleMember from './SingleMember';
import DoneIcon from '@mui/icons-material//Done';
import styles from './style'


  
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
          <Paper sx={styles.group_member_popup}>
             <List  sx={styles.group_member_list}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={<>
                    <ListSubheader sx={styles.list_subheader}>Group Name</ListSubheader>
                        <Box sx={styles.list_subheader_box}>
                            <TextField sx={styles.edit_group_name_input} onChange={(e) => setGroupName(e.target.value)} aria-readonly variant="standard" defaultValue={groupName} />
                            <IconButton onClick={changeGroupName} color="primary" disabled={selectedChat?.chatName === groupName?.trim()}>
                                  <DoneIcon />
                            </IconButton>
                        </Box>
          
                       
                        <Box sx={styles.autocomplate_main_box}>
                              <Autocomplete
                            value={searchUser}
                            sx={styles.group_member_autocomplete}
                            id="checkboxes-tags-demo"
                            options={usersToAdd ? usersToAdd : []}
                            getOptionLabel={(user) => user.email}
                            onChange={(event, newValue) => {
                              setSearchUser(newValue)
                            }}
                            renderOption={(props, user, { selected }) =>   (
                                <li {...props}>
                                  <Box sx={styles.li_main_box}>
                                  <Box sx={styles.li_avatar_box}><Avatar sx={styles.li_avatar} src={user?.pic}/> <span>{user?.email}</span></Box>
                                  </Box>
                                </li>
                            )}
                            style={styles.autocomplate_style}
                            renderInput={(params) => (
                              <TextField {...params}  fullWidth  placeholder="Search User..." />
                            )}
                          />
                          
                          <Button disabled={!searchUser} onClick={addToGroup} color="primary" >Add</Button></Box>
                    </>
                    }
                    />
                    <Box sx={styles.single_member_box}>
                        {selectedChat?.users.map((member) => <SingleMember  key={member._id} member={member} />)}
                    </Box>
                    <Button onClick={leaveGroup} sx={styles.leave_button} variant="contained" color="error" fullWidth>LEAVE</Button>
            <List/>
          </Paper>
        </Modal>
      </div>
    );
  }
  