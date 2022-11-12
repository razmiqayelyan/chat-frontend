import { Avatar, AvatarGroup, Box, IconButton } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatState, setSelectedChat, toggleGroupMembersPopup } from '../../../../../slice/chat/chatSlice'
import { toggleLeftDrawer, userState } from '../../../../../slice/userSlice'
import styles from './style'
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { clearMessages } from '../../../../../slice/messages/messageSlice'


const MobileChatHeader = () => {
  const { selectedChat } = useSelector(chatState)
  const {user} = useSelector(userState)
  const privateChatUser = selectedChat?.users.filter((u) => u.email !== user?.email)[0]
  const dispatch = useDispatch() 
  const openMembersModal = () => {
    dispatch(toggleGroupMembersPopup())
  }
  
  const removeSelectedChat = () => {
    window.location = "/"
  }

  const openLeftDrawer = () => {
    dispatch(toggleLeftDrawer())
  }

  // varibles
  let alt;
  let src;
  if(selectedChat && selectedChat.users && !selectedChat.users[1]){
    alt = selectedChat?.users[0].name !== user?.name?selectedChat.users[1].name:selectedChat?.users[0].name
    alt = selectedChat?.users[0].name !== user?.name?selectedChat.users[1].name:selectedChat?.users[0].name
  }
  else{
    alt = selectedChat?.users[1].name !== user?.name?selectedChat.users[1].name:selectedChat?.users[0].name
    alt = selectedChat?.users[1].name !== user?.name?selectedChat.users[1].name:selectedChat?.users[0].name
}
  let total = selectedChat.users.length === 2? 1 : selectedChat.users.length

  return (
    <>
    <header className="msger-header">
    <div className="msger-header-title">
      <i className="fas fa-comment-alt"></i> 
      <div style={styles.main_div}> 
      <>
      <Box>
      <IconButton onClick={removeSelectedChat} >
           <ArrowBack/>
        </IconButton>
      <IconButton  onClick={openLeftDrawer} >
           <MenuIcon/>
        </IconButton>
      </Box>

        {selectedChat.chatName === "sender"? 
        <>
                <p style={styles.sender_paragraph_user}>{privateChatUser?.name}</p>
            <IconButton  sx={styles.sender_icon_button}>
              <Avatar src={privateChatUser?.pic} />
            </IconButton>
        </>
   
            :
        <p style={styles.sender_paragraph_chat}>{selectedChat.chatName}</p>}
        </>
        {selectedChat.isGroupChat? 
         <AvatarGroup onClick={openMembersModal} sx={styles.avatar_group} spacing="small" total={total}>
            <Avatar alt={alt} src={src}/>
        </AvatarGroup>
      : ""}
      </div>
    </div>
    <div className="msger-header-options">
      <span><i className="fas fa-cog"></i></span>
    </div>
  </header>
    </>
  )
}

export default MobileChatHeader