import { Avatar, AvatarGroup, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chatState, setSelectedChat } from '../../../../slice/chat/chatSlice';
import {getAllMessages} from '../../../../slice/messages/messageSlice';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import { userState } from '../../../../slice/user/userSlice';
import { useEffect } from 'react';
import { notificationState, removeNotification } from '../../../../slice/notification/notificationSlice';
import { useState } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import styles from './style'


const ChatInfo = ({chat, setChatSearch}) => {
    // SELECT DATA FROM REDUX
    const { user } = useSelector(userState)
    const { notifications } = useSelector(notificationState)
    const { selectedChat} = useSelector(chatState)

    let alt;
    let src;

    if(chat && chat.users && !chat.users[1]){
        alt = chat?.users[0].name !== user?.name?chat.users[0].name:chat?.users[0].name
        src = chat?.users[0].name !== user.name? chat?.users[0].pic:chat?.users[0].pic 
    }
    else{
        alt = chat?.users[1].name !== user?.name?chat.users[1].name:chat?.users[0].name
        src = chat?.users[1].name !== user.name? chat?.users[1].pic:chat?.users[0].pic 
    }

    const chatName = chat?.chatName === 'sender'? chat?.users.filter(u => u.email !== user.email )[0].name : chat.chatName
    const dispatch = useDispatch()
    const [notifExist, setNotifExist] = useState(false)

    

    const getChatMessages = (chat) => {
        if(!chat._id) return
        dispatch(setSelectedChat({chat}))
        dispatch(getAllMessages(chat._id))
        dispatch(removeNotification(chat._id))
        setChatSearch("")
    }

    
    useEffect(() => {
        if(notifications[chat?._id]) setNotifExist(true)
        else setNotifExist(false)
    }, [notifications, chat])


    useEffect(() => {
        if(!selectedChat) return 
        getChatMessages(selectedChat)
        // eslint-disable-next-line 
    }, [selectedChat])

  return (
      <ListItemButton  sx={selectedChat?._id === chat?._id? styles.list_item_button : styles.list_item_button_white } onClick={() => getChatMessages(chat)}>
          <ListItemIcon >
                {chat?.isGroupChat?<GroupsIcon fontSize="small" /> :<PersonIcon fontSize="small" /> }
          </ListItemIcon>


          <ListItemText  primary={chatName}/>

          <AvatarGroup spacing="small" total={chat.users.length === 2? 1 : chat.users.length }>
                <Avatar  alt={alt} src={src}/>
          </AvatarGroup>

         {notifExist? <FiberManualRecordIcon sx={{marginBottom:3, color:"#20ab3e" }} fontSize="small" />: ""}
        </ListItemButton> 

  )
}

export default ChatInfo


