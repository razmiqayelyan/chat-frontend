import axios from "axios"
import { DOMAIN } from "../userAPI"


const getChats = async(token) => {
    return await axios.get(DOMAIN + 'api/chat', {
        headers: {
            'Authorization': `Bearer ${token}` 
          }
    })
}

const newGroupChat = async(data, token) => {
    const {users, name} = data
    return await axios.post(DOMAIN + "api/chat/group", {
        users: JSON.stringify(users),
        name
    },
    {
    headers: {
        'Authorization': `Bearer ${token}` 
    }
    })
}

const groupMemberRemove = async(data, token) => {
    const {userId, chatId} = data
    return await axios.put(DOMAIN + "api/chat/groupremove", {
        chatId,
        userId
    },
    {
    headers: {
        'Authorization': `Bearer ${token}` 
    }
    })
}

const groupMemberAdd = async(data, token) => {
    const {userId, chatId} = data
    return await axios.put(DOMAIN + "api/chat/groupadd", {
        chatId,
        userId
    },
    {
    headers: {
        'Authorization': `Bearer ${token}` 
    }
    })
}

const groupNameEdit = async(data, token) => {
    const {chatId , chatName} = data
    return await axios.put(DOMAIN + "api/chat/rename", {
        chatId,
        chatName
    },
    {
    headers: {
        'Authorization': `Bearer ${token}` 
    }
    })
}


const accessChat = async(user, token) => {
    return await axios.post(DOMAIN + "api/chat", {
        userId: user._id
    },
    {
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    }
    )
}

const functions = {
    getChats,
    newGroupChat,
    accessChat,
    groupMemberRemove,
    groupMemberAdd,
    groupNameEdit
}
export default functions