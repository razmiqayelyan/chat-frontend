import { Avatar, IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import Cancel from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { userState } from '../../../slice/userSlice';
import { chatState, removeMemberFromGroup } from '../../../slice/chat/chatSlice'
import styles from './style'

const SingleMember = ({member}) => {
  const { selectedChat } = useSelector(chatState)
  const { user } = useSelector(userState)
  const dispatch = useDispatch()
  if(!user || !member || !selectedChat) return
  
  const permission = selectedChat.groupAdmin._id === user._id && member._id !== user._id
  
  const removeMemberFromGroupHandler = () => {
    if(!selectedChat || !member) return
    dispatch(removeMemberFromGroup({userId:member._id, chatId:selectedChat._id}))
  }
  

  return (
    <>
        <ListItem sx={styles.list_item}>
          <ListItemIcon>
               <Avatar src={member.pic} /> 
          </ListItemIcon>
          <ListItemText sx={styles.list_item_text}  primary={selectedChat.groupAdmin._id === member._id? 
          <div style={styles.member_name_div}>
             {member.name}
            <div style={styles.admin_label}>ADMIN</div>
          </div> :
          member.name 
        }/>
        {permission &&
         <ListItemIcon>
              <IconButton onClick={removeMemberFromGroupHandler}>
                  <Cancel /> 
              </IconButton>
          </ListItemIcon>}
        </ListItem>
    </>
  )
}

export default SingleMember