import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userState } from '../../slice/userSlice'
import { chatState } from '../../slice/chat/chatSlice'
import { activateSocket, setSocket, socketState } from '../../slice/socketAPI/socketSlice'
import { addMessage, finishTyping, messageState, offEmiting, startTyping } from '../../slice/messages/messageSlice'
import { setNotifications } from '../../slice/notification/notificationSlice'
import MobileNavbar from './components/Navbar/MobileNavbar'
import { Box } from '@mui/material'
import styles from './style'
import UserPopup from '../../desktop/components/UserPopup/UserPopup'
import Sidebar from './components/Sidebar/Sidebar'
import MobileChatList from '../main/components/Chats/MobileChatsList'
import MobileChat from './components/Chat/MobileChat'
import GroupMembers from '../../desktop/components/Members/GroupMembers'
import AddChat from '../../desktop/components/ChatPopup/AddChat'
import NotifAlert from './components/Popups/NotifAlert' 


const MobileMain = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {token, user} = useSelector(userState)
  const { selectedChat } = useSelector(chatState)
  const { socket } = useSelector(socketState)
  const { lastCreatedMessage, emitTime} = useSelector(messageState)
  const [alert, setAlert] = useState({
    opened:false,
    message:"",
    sender:"",
    pic:""
  })


  useEffect(() => {
    if(!token) navigate("/login")
  }, [token, navigate])

  useLayoutEffect(() => {
    if(!user) return
    socket?.removeAllListeners()
    dispatch(setSocket())
    // eslint-disable-next-line 
  }, [user])


  useEffect(() => {
    if(!socket) return
    socket.removeAllListeners()
    socket.emit("setup", user);
    socket.on("connected", () => {dispatch(activateSocket())});
    socket.on("typing", () => dispatch(startTyping()));
    socket.on("stop typing", () => dispatch(finishTyping()));
    // eslint-disable-next-line 
  }, [socket]);


  useEffect(() => {
      if(!emitTime) return
      socket.emit("new message", lastCreatedMessage);
      dispatch(offEmiting())
      // eslint-disable-next-line 
  }, [emitTime])


  useEffect(() => {
    socket?.removeAllListeners("message recieved")
    socket?.on("message recieved", (newMessageRecieved) => {
      if (!selectedChat){
        setAlert({
          opened:true,
          message:newMessageRecieved.content.slice(0, 22) + "...",
          sender:newMessageRecieved.chat.isGroupChat? newMessageRecieved.chat.chatName :newMessageRecieved.sender.name,
          pic:newMessageRecieved.sender.pic
        })
        dispatch(setNotifications(newMessageRecieved))
        setTimeout(() => {
          setAlert({
            opened:false,
            message:"",
            sender:"",
            pic:""
          })
        }, 3000)
      }
      else if(newMessageRecieved.chat._id !== selectedChat._id) {
        setAlert({
          opened:true,
          message:newMessageRecieved.content.slice(0, 22) + "...",
          sender:newMessageRecieved.chat.isGroupChat? newMessageRecieved.chat.chatName :newMessageRecieved.sender.name,
          pic:newMessageRecieved.sender.pic
        })
        dispatch(setNotifications(newMessageRecieved))
        setTimeout(() => {
          setAlert({
            opened:false,
            message:"",
            sender:"",
            pic:""
          })
        }, 3000)
      }
      else dispatch(addMessage(newMessageRecieved))
    }) 
  })

  
  return (
    <Box data_name="main_box" sx={styles.main_box}>
      {alert.opened && <NotifAlert alert={alert} />}
      <Sidebar/>
      <UserPopup />
      <AddChat />
      <GroupMembers/>
      {selectedChat? <MobileChat /> :<> <MobileNavbar /><MobileChatList/> </> }
      

    </Box>
  )
}

export default MobileMain