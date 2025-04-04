import { create } from "zustand";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import useUserStore from "./userStore";

const useChatStore = create((set) => ({
  chatId: null,   
  user:null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  changeChat: async (chatId,user) => {
   const currentUser=useUserStore.getState().currentUser;

   /*check if currentuser is blocked */
   if(user.blocked.includes(currentUser.id))
   {
       return set({
        chatId,
        user:null,
        isCurrentUserBlocked:true,
        isReceiverBlocked:false});
   }
   /*check if user is blocked */
   else if(currentUser.blocked.includes(currentUser.id))
   {
       return set({
        chatId,
        user:user,
        isCurrentUserBlocked:false,
        isReceiverBlocked:true});
   }
   else{
   return set({
    chatId,
    user,
    isCurrentUserBlocked:false,
    isReceiverBlocked:false});
   }
  },
   changeBlock:()=>{
    set(state=>({...state,isReceiverBlocked:!state.isReceiverBlocked}));
   }

}));
export default useChatStore;