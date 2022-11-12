import React from 'react'


const Message = ({messages, user}) => {

  return (
    <>
     
         {messages?.map((message) => {
          // eslint-disable-next-line 
      if(!message) return
      return (
        <div key={message._id} className={user._id === message.sender._id?"msg right-msg":"msg left-msg"}>
        <div
         className="msg-img"
         style={{"backgroundImage": `url(${message.sender.pic})`}}></div>
  
        <div className="msg-bubble">
          <div className="msg-info">
            <div className="msg-info-name">{message.sender.name}</div>
            <div className="msg-info-time">{message.sender.createdAt}</div>
          </div>
  
          <div className="msg-text">
            {message.content}
          </div>
        </div>
      </div>
      )
    })}
    
    </>
  )
}

export default Message