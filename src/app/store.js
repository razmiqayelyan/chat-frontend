import { configureStore } from '@reduxjs/toolkit';
import chatSlice from '../slice/chat/chatSlice';
import messageSlice from '../slice/messages/messageSlice';
import notificationSlice from '../slice/notification/notificationSlice';
import socketSlice from '../slice/socketAPI/socketSlice';
import userSlice from '../slice/userSlice';



export const store = configureStore({
  reducer: {
    user: userSlice,
    chat:chatSlice,
    message: messageSlice,
    socket:socketSlice,
    notification:notificationSlice
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});
