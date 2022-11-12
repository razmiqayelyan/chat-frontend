import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './MobileChat.css'
import { createNewMessage, messageState } from '../../../../slice/messages/messageSlice'
import { userState } from '../../../../slice/user/userSlice'
import { chatState } from '../../../../slice/chat/chatSlice'
import { socketState } from '../../../../slice/socketAPI/socketSlice'
import { useChatScroll } from '../../../../ScrollHook'
import MobileChatHeader from './sections/MobileChatHeader'
import MobileChatMessage from './sections/MobileChatMessage'
import MobileChatForm from './sections/MobileChatForm'



const ChatPage = () => {
   // SELECT DATA FROM REDUX
   const {messages} = useSelector(messageState)
   const {user} = useSelector(userState)
   const { selectedChat } = useSelector(chatState)
   const { socket } = useSelector(socketState)
   const ref = useChatScroll(messages)
   const dispatch = useDispatch()
   const [content, setContent] = useState("")
 
 // save input value for creating NEW MESSAGE
   const contentHandler = (e) => {
     setContent(e.target.value)
   }
 
   useEffect(() => {
     if(!content || !socket || !selectedChat) return
     else {
       socket.removeAllListeners("typing")
       socket.emit("typing", selectedChat._id);
       setTimeout(() => {
         socket.removeAllListeners("stop typing")
         socket.emit("stop typing", selectedChat._id)
       }, 3000)
     }
   }, [content, socket, selectedChat])
 
 // send message to backend
   const onSendMessage = async() => {
     if(content && content.trim() && selectedChat._id){
     dispatch(createNewMessage({content, chatId:selectedChat._id}))
     setContent("")
     } 
   }
 
 
   useEffect(() => {
     setContent("")
   }, [selectedChat])
 
 
   if(!selectedChat) return
 
   return (
     <>
    <section className="msger">
       
       <MobileChatHeader/>
 
   
       <main ref={ref} className="msger-chat">
         <>
             <MobileChatMessage messages={messages} user={user}/>
               
         </>
       </main>
 
       <MobileChatForm contentHandler={contentHandler} content={content} onSendMessage={onSendMessage} />
 
 </section>
   </>
     )
}

export default ChatPage