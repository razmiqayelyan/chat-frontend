import { Avatar, AvatarGroup, IconButton } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { chatState, toggleGroupMembersPopup } from '../../../../slice/chat/chatSlice';
import { Box } from '@mui/system';
import { userState } from '../../../../slice/user/userSlice';
import styles from './style'


const ChatHeader = () => {
  const {selectedChat} = useSelector(chatState)
  const {user} = useSelector(userState)
  const privateChatUser = selectedChat?.users.filter((u) => u.email !== user?.email)[0]
  const dispatch = useDispatch() 
  const openMembersModal = () => {
    dispatch(toggleGroupMembersPopup())
  }

  let alt;
  let src;

  if(selectedChat && selectedChat.users && !selectedChat.users[1]){
    alt = selectedChat?.users[0].name !== user?.name?selectedChat.users[0].name:selectedChat?.users[0].name
    src = selectedChat?.users[0].name !== user.name? selectedChat?.users[0].pic:selectedChat?.users[0].pic
  }
  else {
    alt = selectedChat?.users[1].name !== user?.name?selectedChat.users[1].name:selectedChat?.users[0].name
    src = selectedChat?.users[1].name !== user.name? selectedChat?.users[1].pic:selectedChat?.users[0].pic
  }


  return (
    <>
    <header className="msger-header">
    <div className="msger-header-title">
      <i className="fas fa-comment-alt"></i> 
      <div style={styles.header_main_div}> 
      {selectedChat?.isGroupChat &&
         <AvatarGroup onClick={openMembersModal} sx={styles.header_avatar_group} spacing="small" total={selectedChat.users.length === 2? 1 : selectedChat.users.length }>
            <Avatar  alt={alt} src={src}/>
        </AvatarGroup>}
        {selectedChat.chatName === "sender"? <Box sx={styles.one_to_one_main_box}>
                                                    <IconButton  sx={styles.one_to_one_icon_button}>
                                                      <Avatar src={privateChatUser?.pic} />
                                                    </IconButton>
                                                    <p style={styles.one_to_one_p}>{privateChatUser?.name}</p>
                                                 
                                                </Box>
                                                :
                                                <p style={styles.group_chat_p}>{selectedChat.chatName}</p>}
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