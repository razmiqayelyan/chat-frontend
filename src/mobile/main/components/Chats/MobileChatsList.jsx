import { Button, List, ListItemText, ListSubheader, Tab, Tabs, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatState, getChatsByToken, toggleAddGroupModel } from '../../../../slice/chat/chatSlice'
import { userState } from '../../../../slice/userSlice'
import SingleChatList from './SingleChatList'
import styles from './style'
import GroupAddIcon from '@mui/icons-material/GroupAdd';



const MobileChatList = () => {

    // SELECT DATA FROM REDUX
    const {chats} = useSelector(chatState)
    const {token} = useSelector(userState)
    const [chatSearch, setChatSearch] = useState("")
    const [tabValue, setTabValue] = useState("all")

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

    const openGroupPopup = () => {
        dispatch(toggleAddGroupModel())
    }

    useEffect(() => {
        dispatch(getChatsByToken())
    }, [token])
    
    return (
    <List
    data_name="chats_list"
    sx={styles.chats_list}
    component="nav"
    aria-labelledby="nested-list-subheader"
    subheader={
        
        <ListSubheader component="div" id="nested-list-subheader">
             <Button onClick={openGroupPopup} color="primary" fullWidth startIcon={<GroupAddIcon/>} variant="text">CREATE GROUP</Button>
                <TextField data_name="chats_search" value={chatSearch} onChange={(e) => setChatSearch(e.target.value)} sx={styles.chats_search} fullWidth variant="standard"/>  
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

export default MobileChatList