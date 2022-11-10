import React from 'react'

const ChatForm = ({contentHandler, content, onSendMessage}) => {
  return (
    <>
         <form onSubmit={(e) => e.preventDefault()} className="msger-inputarea">
            <input value={content} onChange={contentHandler} type="text" className="msger-input" placeholder="Enter your message..."/>
            <button onClick={onSendMessage} type='submit' className="msger-send-btn">Send</button>
        </form>
    </>
  )
}

export default ChatForm