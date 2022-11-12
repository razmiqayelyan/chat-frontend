import { Autocomplete, Avatar, List, ListSubheader, Tab, Tabs, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatState, getChatsByToken, OneToOneChat } from '../../../../slice/chat/chatSlice'
import { setWithUser, userState } from '../../../../slice/user/userSlice'
import SingleChatList from './SingleChatList'
import styles from './style'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { getAllMessages } from '../../../../slice/messages/messageSlice'
import { removeNotification } from '../../../../slice/notification/notificationSlice'


const MobileChatListDrawer = () => {
    // SELECT DATA FROM REDUX
    const {chats, selectedChat} = useSelector(chatState)
    const [chatSearch, setChatSearch] = useState("")
    const [tabValue, setTabValue] = useState("all")
    const [searchUser, setSearchUser] = useState(null) 
    const {  allUsers, withUser, token } = useSelector(userState)

    const dispatch = useDispatch()
    const chatFilter = (chat) => {
        if(chat.isGroupChat) {
        return chat.chatName.includes(chatSearch)
        }
        else {
        return chat.users.filter(u => u.name.includes(chatSearch))[0]
        }
    }
    
    const tabFilter = (e, value) => {
        setTabValue(value)  
    }

    const filterByType = (chat) => {
        if(tabValue === 'group') return chat.isGroupChat
        else if(tabValue === 'chat') return !chat.isGroupChat
        else return chat
    }
    

    useEffect(() => {
        dispatch(getChatsByToken())
        // eslint-disable-next-line 
    }, [token])
    
    useEffect(() => {
      if(!searchUser) return
      else {
        dispatch(setWithUser(searchUser))
        setSearchUser(null)
      }
      // eslint-disable-next-line 
    }, [searchUser])
  
    useEffect(() => {
      if(withUser) {
        dispatch(OneToOneChat(withUser))
      }
      // eslint-disable-next-line 
    }, [withUser])
  
      // const getChatMessages = (chat) => {
      //     if(!chat._id) return
      //     dispatch(setSelectedChat({chat}))
      //     dispatch(getAllMessages(chat._id))
      //     dispatch(removeNotification(chat._id))
      //     setChatSearch("")
      // }
  
    useEffect(() => {
      if(!selectedChat) return 
      dispatch(getAllMessages(selectedChat._id))
      dispatch(removeNotification(selectedChat._id))
      setChatSearch("")
      // eslint-disable-next-line 
  }, [selectedChat])

    return (
    <List
    data_name="chats_list"
    sx={styles.chats_list}
    component="nav"
    aria-labelledby="nested-list-subheader"
    subheader={
        
        <ListSubheader component="div" id="nested-list-subheader">
            <Autocomplete
                          value={searchUser}
                          data_name="auto_complate"
                          sx={styles.auto_complate}
                          id="checkboxes-tags-demo"
                          options={allUsers ? allUsers : []}
                          getOptionLabel={(user) => user.email}
                          onChange={(_, newValue) => {
                            setSearchUser(newValue)
                          }}
                          renderOption={(props, user, { selected }) =>   (
                              <li {...props}>
                                <Box data_name="li_main_box" sx={styles.li_main_box}>
                                    <Box data_name="li_second_box" sx={styles.li_second_box}>
                                        <Avatar data_name="li_avatar" sx={styles.li_avatar} src={user?.pic}/> <span>{user?.email}</span>
                                    </Box>
                                    <ChatBubbleOutlineOutlinedIcon color='primary'  />
                                </Box>
                              </li>
                          )}
                          style={{ width: "100%" }}
                          renderInput={(params) => (
                            <TextField fullWidth variant="standard" label="Search User..."  {...params} />
                          )}
                        />
        <Box data_name="tabs_box" sx={styles.tabs_box}>
        <Tabs onChange={tabFilter} value={tabValue}>
            <Tab value="all" label="All"/>
            <Tab  value="chat" label="Chats"/>
            <Tab  value="group" label="Groups"/>
        </Tabs>
        </Box>
        </ListSubheader>
    }
    >
    {chats?.filter(filterByType).filter(chatFilter).map((chat) => <SingleChatList chat={chat} key={chat._id} setChatSearch={setChatSearch} />)}
    </List>
);
}

export default MobileChatListDrawer