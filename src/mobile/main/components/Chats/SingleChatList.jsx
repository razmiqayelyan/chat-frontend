import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { chatState, setSelectedChat } from '../../../../slice/chat/chatSlice';
import {  toggleLeftDrawer, userState } from '../../../../slice/user/userSlice';
import { notificationState, removeNotification } from '../../../../slice/notification/notificationSlice';
import { getAllMessages } from '../../../../slice/messages/messageSlice';
import { Avatar, AvatarGroup, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import styles from './style';

const SingleChatList = ({chat, setChatSearch}) => {
    const { user} = useSelector(userState)
    const { notifications } = useSelector(notificationState)
    const {  selectedChat} = useSelector(chatState)

    const chatName = chat?.chatName === 'sender'? chat?.users.filter(u => u.email !== user.email )[0].name : chat.chatName
    const dispatch = useDispatch()
    const [notifExist, setNotifExist] = useState(false)


    // varibles

    let alt;
    let src;
    if(chat && chat.users && !chat.users[1]){
    alt = chat?.users[0].name !== user?.name?chat.users[0].name:chat?.users[0].name
    src = chat?.users[0].name !== user.name? chat?.users[0].pic:chat?.users[0].pic
}else{
   alt = chat?.users[1].name !== user?.name?chat.users[1].name:chat?.users[0].name
   src = chat?.users[1].name !== user.name? chat?.users[1].pic:chat?.users[0].pic
}
    useEffect(() => {
        if(notifications[chat?._id]) setNotifExist(true)
        else setNotifExist(false)
        // eslint-disable-next-line 
    }, [notifications])


    const getChatMessages = (chat) => {
        if(!chat._id) return
        dispatch(setSelectedChat({chat}))
        dispatch(getAllMessages(chat._id))
        dispatch(removeNotification(chat._id))
        dispatch(toggleLeftDrawer("close"))
        setChatSearch("")
    }

    // const getChatMessagesforDrawer = (chat) => {
    //     if(!chat._id) return
    //     dispatch(setSelectedChat({chat}))
    //     dispatch(getAllMessages(chat._id))
    //     dispatch(removeNotification(chat._id))
    //     setChatSearch("")
    // }

    useEffect(() => {
        if(!selectedChat) return 
        dispatch(getAllMessages(selectedChat._id))
        dispatch(removeNotification(selectedChat._id))
        // eslint-disable-next-line 
    }, [selectedChat])
    

  return (
      <ListItemButton data_name="list_item_button"  sx={ selectedChat?._id === chat?._id? styles.list_item_button : styles.list_item_button_white } onClick={() => getChatMessages(chat)}>
          <ListItemIcon >
                {chat?.isGroupChat?<GroupsIcon fontSize="small" /> :<PersonIcon fontSize="small" /> }
          </ListItemIcon>


          <ListItemText  primary={chatName}/>

          <AvatarGroup spacing="small" total={chat.users.length === 2? 1 : chat.users.length }>
                <Avatar alt={alt} src={src}/>
          </AvatarGroup>

         {notifExist? <FiberManualRecordIcon data_name="chat_notif" sx={styles.chat_notif} fontSize="small" />: ""}
        </ListItemButton> 

  )
}

export default SingleChatList