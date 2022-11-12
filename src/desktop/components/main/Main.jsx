import React, { useState } from 'react'
import { userState } from '../../../slice/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from './chat/Chat';
import Chats from './chats/Chats';
import { addMessage, finishTyping, messageState, offEmiting, startTyping } from '../../../slice/messages/messageSlice';
import Navbar from './navbar/Navbar';
import AddChat from '../ChatPopup/AddChat';
import { chatState, unshiftChats } from '../../../slice/chat/chatSlice';
import { socketState, setSocket, activateSocket } from '../../../slice/socketAPI/socketSlice';
import { useLayoutEffect } from 'react';
import {  setNotifications } from '../../../slice/notification/notificationSlice';
import GroupMembers from '../Members/GroupMembers';
import UserPopup from '../UserPopup/UserPopup';
import styles from './style'
import NotifAlert from './chat/alert/NotifAlert';



const Main = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {token, user} = useSelector(userState)
  const { selectedChat, chats } = useSelector(chatState)
  const { socket } = useSelector(socketState)
  const {lastCreatedMessage, emitTime} = useSelector(messageState)
  const [alert, setAlert] = useState({
    opened:false,
    message:"",
    sender:"",
    pic:""
  })

  useEffect(() => {
    if(!token) navigate("/login")
    // eslint-disable-next-line 
  }, [token])

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
        if(chats?.map(chat => chat._id === newMessageRecieved?.chat._id).length < 1){
            dispatch(unshiftChats(newMessageRecieved.chat))
        }
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
    {alert.opened && <NotifAlert alert={alert} />}
    <div style={styles.chats_div}>
      <Chats  />
    <div style={styles.chat_div}>
      <Chat />
    </div>
    </div>
    </>
      )
}

export default Main