import axios from "axios"


const DOMAIN = 'https://ragram.herokuapp.com/'

const createMessage = async(content, chatId, token) => {
    return await axios.post(DOMAIN + 'api/message', {
        content,
        chatId
    },
    {
        headers: {
            "Content-Type":"application/json",
            'x-csrf-token': `${token}` 
          }
    }
    )
}

const getMessages = async(chatId, token) => {
    return await axios.get(DOMAIN + `api/message/${chatId}`, {
        headers: {
            "Content-Type":"application/json",
            'x-csrf-token': `${token}` 
          }
    })
}

export default {
    getMessages,
    createMessage
}