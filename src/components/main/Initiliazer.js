import { chatInitial } from "../../slice/chat/chatSlice"
import { messageInitial } from "../../slice/messages/messageSlice"
import { socketInitial } from "../../slice/socketAPI/socketSlice"
import { userInitial } from "../../slice/userSlice"

export const initiliazer = (dispatch)  => {
    dispatch(socketInitial())
    dispatch(chatInitial())
    dispatch(messageInitial())
    dispatch(userInitial())
}