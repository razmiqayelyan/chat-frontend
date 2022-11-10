import React, { useState } from 'react'
import { userState } from '../../slice/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from './Chat';
import Chats from './chats/Chats';
import { addMessage, finishTyping, messageState, offEmiting, startTyping } from '../../slice/messages/messageSlice';
import Navbar from './navbar/Navbar';
import AddChat from '../ChatPopup/AddChat';
import { chatState } from '../../slice/chat/chatSlice';
import { socketState, setSocket, activateSocket, deactivateSocket } from '../../slice/socketAPI/socketSlice';
import { Alert, Avatar, LinearProgress } from '@mui/material';
import { initiliazer } from './Initiliazer';
import { useLayoutEffect } from 'react';
import { notificationState, setNotifications } from '../../slice/notification/notificationSlice';
import GroupMembers from '../Members/GroupMembers';
import UserPopup from '../UserPopup/UserPopup';




const Main = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {token, user} = useSelector(userState)
  const { selectedChat } = useSelector(chatState)
  const { socket, socketActivated } = useSelector(socketState)
  const {messages, lastCreatedMessage, emitTime} = useSelector(messageState)
  const [alert, setAlert] = useState({
    opened:false,
    message:"",
    sender:"",
    pic:""
  })

  const [isTyping ,setIsTyping] = useState(false)

  useEffect(() => {
    if(!token) navigate("/login")
  }, [token])

  useLayoutEffect(() => {
    if(!user) return
    socket?.removeAllListeners()
    dispatch(setSocket())
  }, [user])


  useEffect(() => {
    if(!socket) return
    socket.removeAllListeners()
    socket.emit("setup", user);
    socket.on("connected", () => {dispatch(activateSocket())});
    socket.on("typing", () => dispatch(startTyping()));
    socket.on("stop typing", () => dispatch(finishTyping()));
  }, [socket]);


  useEffect(() => {
      if(!emitTime) return
      socket.emit("new message", lastCreatedMessage);
      dispatch(offEmiting())
  }, [emitTime])


  useEffect(() => {
    socket?.removeAllListeners("message recieved")
    socket?.on("message recieved", (newMessageRecieved) => {
      if (!selectedChat){
        setAlert({
          opened:true,
          message:newMessageRecieved.content.slice(0, 10) + "...",
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
          message:newMessageRecieved.content.slice(0, 10) + "...",
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
    <>
    <UserPopup/>
    <GroupMembers/>
    <AddChat />
    <Navbar/>
    {alert.opened && <Alert icon={<Avatar src={alert.pic}/>}  sx={{position:"absolute", zIndex:"5", right:0, bottom:0, alignItems:"center"}} security='success' >
         <p style={{fontSize:"12px", fontWeight:"bold", textTransform:"capitalize" }}>{alert.sender}</p> {alert.message}
      </Alert>}
    <div style={{display:"flex", alignItems:"center", justifyContetn:"center", flexDirection:"row"}}>
      <Chats  />
    <div style={{width:"70vw", height:"90vh", display:"flex", justifyContent:"flex-end", alignItems:"flex-end"}}>
      <Chat />
    </div>
    </div>
      {/* <Alert icon={<CheckIcon fontSize="inherit" />} severity="success"> */}
    </>
      )
}

export default Main