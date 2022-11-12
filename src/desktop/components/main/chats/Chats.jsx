import { useEffect , useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatState, getChatsByToken } from '../../../../slice/chat/chatSlice'
import { userState } from '../../../../slice/userSlice'
import ChatInfo from './ChatInfo'
import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { Tab, Tabs, TextField } from '@mui/material'
import { Box } from '@mui/system'
import styles from './style'

const Chats = () => {
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

      useEffect(() => {
          dispatch(getChatsByToken())
          // eslint-disable-next-line
      }, [token])
  
      
    return (
      <List
      sx={styles.main_list}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          My Chats
          <Box sx={styles.list_subheader_box}>
          <TextField value={chatSearch} onChange={(e) => setChatSearch(e.target.value)} sx={styles.list_subheader_input} fullWidth label="Find Chat" variant="standard"/>
          <Tabs onChange={tabFilter} value={tabValue}>
            <Tab value="all" label="All"/>
            <Tab  value="chat" label="Chats"/>
            <Tab  value="group" label="Groups"/>
          </Tabs>
          </Box>
        </ListSubheader>
      }
    >
     {chats?.filter(filterByType).filter(chatFilter).map((chat) => <ChatInfo chat={chat} key={chat._id} setChatSearch={setChatSearch} />)}
    </List>
  );
}


export default Chats