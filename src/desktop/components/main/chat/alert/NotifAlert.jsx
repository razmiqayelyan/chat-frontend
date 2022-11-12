import { Alert, Avatar } from '@mui/material';
import React from 'react';
import styles from './style';


const NotifAlert = ({alert}) => {
  return (
    <>
        <Alert icon={<Avatar src={alert.pic}/>}  sx={styles.alert} security='success' >
         <p style={styles.alert_p}>{alert.sender}</p> {alert.message}
      </Alert>
    </>
  )
}

export default NotifAlert