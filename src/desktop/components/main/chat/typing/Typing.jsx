import { Skeleton } from '@mui/material'
import React from 'react'

const Typing = () => {
  return (
    <>
    
    <div className="msg left-msg">
        <div
        className="msg-img"></div>
        <div className="msg-bubble">
            <div className="msg-info">
            <div className="msg-info-name"></div>
            <div className="msg-info-time"></div>
            </div>

            <div className="msg-text">
            <Skeleton
                animation="wave"
                height={10}
                width="5vw"
                style={{ marginBottom: 6 }}
            />
            </div>
        </div>
    </div>

    </>
  )
}

export default Typing