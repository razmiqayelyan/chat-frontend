import {  Box, SwipeableDrawer } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  {  toggleLeftDrawer, userState } from '../../../../slice/user/userSlice'
import styles from './style'
import MobileChatListDrawer from '../Chats/MobileChatsListDrawer'



const Sidebar = () => {
  const dispatch = useDispatch()

  const { leftDrawer } = useSelector(userState)
  const toggleDrawer = (anchor, open) => (event) => {
    // if (
    //   event &&
    //   event.type === 'keydown' &&
    //   (event.key === 'Tab' || event.key === 'Shift')
    // ) {
    //   return;
    // }
    dispatch(toggleLeftDrawer())
  };




  const list = (anchor) => (
    <Box
      data_name="main_drawer"
      sx={styles.main_drawer}
      role="presentation">    
        <Box data_name="drawer_main_box" sx={styles.drawer_main_box}>
          <Box data_name="close_icon_box" sx={styles.lose_icon_box}>          
            {
            /* <Button fullWidth variant="contained" startIcon={<ArrowBack/>}>
                Home
            </Button> */
            }
          </Box>
                        <MobileChatListDrawer/>
        </Box>
    </Box>
  );

  return (
    <div>      
        <React.Fragment key={'left'}>
          <SwipeableDrawer
            anchor={'left'}
            open={leftDrawer}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list({left:"left"})}
          </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}

export default Sidebar