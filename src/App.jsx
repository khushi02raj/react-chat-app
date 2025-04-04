import { useEffect } from "react"
import Chat from "./components/chat/Chat"
import Details from "./components/details/Details"
import List from "./components/list/List"
import Login from "./components/login/Login"
import Notification from "./components/notification/Notification"
import { auth } from "./firebase"
import  useUserStore  from "./lib/userStore"
import useChatStore from "./lib/chatStore"

const App = () => {
  const {chatId} = useChatStore();
  const {currentUser,fetchUserInfo}=useUserStore();
  useEffect(()=>{ 
    const unSub=auth.onAuthStateChanged((user)=>{
        fetchUserInfo(user?.uid);
    })
    return ()=>{
        unSub();
    }
  },[fetchUserInfo])

  return (
    <div className='container'>
      {
        currentUser?(
        <>
        <List/>
        {chatId && <Chat/>}
        {chatId && <Details/>}
        </>):
      (<Login/>)
        }
        <Notification/>
    </div>
  )
}

export default App