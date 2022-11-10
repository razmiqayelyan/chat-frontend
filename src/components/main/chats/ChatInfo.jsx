import { Avatar, AvatarGroup, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatState, removeSearchedChat, setSelectedChat } from '../../../slice/chat/chatSlice'
import {getAllMessages} from '../../../slice/messages/messageSlice'
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import { userState } from '../../../slice/userSlice'
import { useEffect } from 'react'
import { socketState } from '../../../slice/socketAPI/socketSlice'
import { notificationState, removeNotification } from '../../../slice/notification/notificationSlice'
import { useState } from 'react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const ChatInfo = ({chat, setChatSearch}) => {
    // SELECT DATA FROM REDUX
    const { user } = useSelector(userState)
    const { notifications } = useSelector(notificationState)
    const { searchedChat , selectedChat} = useSelector(chatState)

    const chatName = chat?.chatName === 'sender'? chat?.users.filter(u => u.email !== user.email )[0].name : chat.chatName
    const dispatch = useDispatch()
    const [notifExist, setNotifExist] = useState(false)

    useEffect(() => {
        if(notifications[chat?._id]) setNotifExist(true)
        else setNotifExist(false)
    }, [notifications])


    const getChatMessages = (chat) => {
        if(!chat._id) return
        dispatch(setSelectedChat({chat}))
        dispatch(getAllMessages(chat._id))
        dispatch(removeNotification(chat._id))
        setChatSearch("")
    }

    useEffect(() => {
        if(!searchedChat) return 
        getChatMessages(searchedChat)
        dispatch(removeSearchedChat())
    }, [searchedChat])

  return (
      <ListItemButton  sx={{backgroundColor:selectedChat?._id === chat?._id?"rgba(211,211,211, 0.3)":"white"}} onClick={() => getChatMessages(chat)}>
          <ListItemIcon >
                {chat?.isGroupChat?<GroupsIcon fontSize="small" /> :<PersonIcon fontSize="small" /> }
          </ListItemIcon>


          <ListItemText  primary={chatName}/>

          <AvatarGroup spacing="small" total={chat.users.length === 2? 1 : chat.users.length }>
                <Avatar  alt={chat?.users[1].name !== user?.name?chat.users[1].name:chat?.users[0].name} src={chat?.users[1].name !== user.name? chat?.users[1].pic:chat?.users[0].pic }/>
          </AvatarGroup>

         {notifExist? <FiberManualRecordIcon sx={{marginBottom:3, color:"#20ab3e" }} fontSize="small" />: ""}
        </ListItemButton> 

  )
}

export default ChatInfo


