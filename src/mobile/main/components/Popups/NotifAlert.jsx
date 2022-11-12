import { Alert, Avatar } from '@mui/material'
import React from 'react'

const NotifAlert = ({alert}) => {
  return (
    <>
        <Alert icon={<Avatar src={alert.pic}/>}  security='success' >
         <p style={{fontSize:"12px", fontWeight:"bold", textTransform:"capitalize" }}>{alert.sender}</p> {alert.message}
     </Alert>
    </>
  )
}

export default NotifAlert