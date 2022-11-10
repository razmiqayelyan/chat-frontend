import { Avatar, AvatarGroup, Button, IconButton } from '@mui/material'
import React from 'react'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { useDispatch, useSelector } from 'react-redux';
import { chatState, toggleGroupMembersPopup } from '../../slice/chat/chatSlice';
import { Box } from '@mui/system';
import { userState } from '../../slice/userSlice';

const ChatHeader = () => {
  const {selectedChat} = useSelector(chatState)
  const {user} = useSelector(userState)
  const privateChatUser = selectedChat?.users.filter((u) => u.email !== user?.email)[0]
  const dispatch = useDispatch() 
  const openMembersModal = () => {
    dispatch(toggleGroupMembersPopup())
  }

  return (
    <>
    <header className="msger-header">
    <div className="msger-header-title">
      <i className="fas fa-comment-alt"></i> 
      <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}> 
      {selectedChat.isGroupChat? 
         <AvatarGroup onClick={openMembersModal} sx={{cursor:"pointer", marginRight:2}} spacing="small" total={selectedChat.users.length === 2? 1 : selectedChat.users.length }>
            <Avatar  alt={selectedChat?.users[1].name !== user?.name?selectedChat.users[1].name:selectedChat?.users[0].name} src={selectedChat?.users[1].name !== user.name? selectedChat?.users[1].pic:selectedChat?.users[0].pic }/>
        </AvatarGroup>
      : ""}
        {/* {selectedChat.isGroupChat?<IconButton onClick={openMembersModal}>
          <SupervisedUserCircleIcon/>
        </IconButton>:""} */}
        {selectedChat.chatName === "sender"? <Box sx={{display:"flex", alignItems:"center"}}>
                                                    <IconButton  sx={{marginRight:2}}>
                                                      <Avatar src={privateChatUser?.pic} />
                                                    </IconButton>
                                                    <p style={{fontSize:"17px", fontStyle:"italic", textTransform:"capitalize"}}>{privateChatUser?.name}</p>
                                                 
                                                </Box>
                                                :
                                                <p style={{fontSize:"17px", fontStyle:"italic"}}>{selectedChat.chatName}</p>}
      </div>
    </div>
    <div className="msger-header-options">
      <span><i className="fas fa-cog"></i></span>
    </div>
  </header>
    </>
  )
}

export default ChatHeader