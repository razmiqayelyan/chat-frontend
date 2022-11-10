import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import Cancel from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { userState } from '../../slice/userSlice';
import { chatState, removeMemberFromGroup } from '../../slice/chat/chatSlice';

const SingleMember = ({member}) => {
  const { selectedChat } = useSelector(chatState)
  const { user } = useSelector(userState)
  const dispatch = useDispatch()
  if(!user || !member || !selectedChat) return


  const removeMemberFromGroupHandler = () => {
    if(!selectedChat || !member) return
    dispatch(removeMemberFromGroup({userId:member._id, chatId:selectedChat._id}))
  }


  return (
    <>
        <ListItem sx={{width:"50vw", maxWidth:700}}>
          <ListItemIcon>
               <Avatar src={member.pic} /> 
          </ListItemIcon>
          <ListItemText sx={{textTransform:"capitalize"}}  primary={selectedChat.groupAdmin._id === member._id? 
          <div style={{display:"flex", flexDirection:"row"}}>
             {member.name}
            <div style={{fontSize:"9px", minWidth:"12px", textAlign:"start", marginLeft:"5px", border:"1px solid red", height:"16px", borderRadius:"5px", color:"red", backgroundColor:"white", padding:"3px", display:"flex", alignItems:"center"}}>ADMIN</div>
          </div> :
          member.name 
        }/>
        {selectedChat.groupAdmin._id === user._id && member._id !== user._id &&
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