import React, { useEffect, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import "./Chat.css"
import { db } from '../../firebase'
import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import useChatStore from '../../lib/chatStore'
import useUserStore from '../../lib/userStore'
import { getDoc } from 'firebase/firestore'
import upload from '../../lib/upload'

const Chat = () => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [chat,setChat]=useState([]);
  const [img, setImg] = useState({
    file: null,
    url: "",
  });
  
  const endRef = React.useRef(null);
  const {chatId,user,isCurrentUserBlocked,
    isReceiverBlocked} = useChatStore();

  const {currentUser} = useUserStore();
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [text]);
  
  useEffect(() => {
    /* onSnapshot for Real-Time Updates: The onSnapshot function is a Firestore 
      method that sets up a listener for changes to a document or collection. */
     const unSub=onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    }
    );
    return unSub; 
  }
  , [chatId]);
    console.log(chat);
    

  const handleEmoji = (e) => {
    console.log(e);
    setText((prev)=>prev+e.emoji);
    setShow(false);
  }

  const handleImg=(e)=>{
    if(e.target.files[0]){
    setImg({  
        file:e.target.files[0],
        url:URL.createObjectURL(e.target.files[0])
    });
}
}

  const handleSend =async () => {
    if(text==="") return;

    let imgUrl=null;
    try{
      if(img.file){
        imgUrl=await upload(img.file);
      }

      /*  appends a new message to the messages array of the 
      chat document identified by chatId */
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && {img: imgUrl}),
        }),
      });

      const userIDs=[currentUser.id, user.id];
      userIDs.forEach(async (id) => {
      const userChatsRef=doc(db, "userchats", id);
      const userChatsSnapshot=await getDoc(userChatsRef);

      if(userChatsSnapshot.exists()){
        const userChatsData=userChatsSnapshot.data();
        const chatIndex=userChatsData.chats.findIndex(
          (c)=>c.chatId===chatId);
          
          userChatsData.chats[chatIndex].lastMessage=text;
          userChatsData.chats[chatIndex].isSeen=
          id===currentUser.id?true:false;
          userChatsData.chats[chatIndex].updatedAt=Date.now();
          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
      }
    }
    );}
    catch(err){
      console.log(err);
    }
    setImg({
      file: null,
      url: "",
    });
    setText("");
  }
  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "./avatar.png"} alt="avatar" />
          <div className="name">
            <span>{user?.username}</span>
            <p>Active now</p>
          </div>
        </div>
        <div className="icons">
          <img src='./video.png' alt="video" />
          <img src='./phone.png' alt="phone" />
          <img src='./info.png' alt="info" />
        </div>
      </div>

      {/* <div className="message">
        <img src='./avatar.png' alt="avatar" />
        <div className="text">
        <p>Hey there! How can I help you today?</p>
        <span>10:00 AM</span>
        </div>
        </div> */}
        <div className="center">
      {chat?.messages?.map((message)=>(

      <div className={message.senderId===currentUser?.id?
        "message own":"message"} 
       key={message?.createdAt}>
        <div className="text">
          {/* <img src='https://tse4.mm.bing.net/th/id/OIP.HrFanMxw7NL_LvjgNLfmGAHaE8?rs=1&pid=ImgDetMain' alt="shared" /> */}
          {message.img && <img src={message.img} alt="shared" />}
          <p>{message.text}</p>
          {/* <span>10:00 AM</span> */}
        </div>
      </div>
      ))}
      {
        img.url && (
        <div className="message own">
          <div className="texts">
            <img src={img.url} alt="shared" />
          </div>
        </div>
      )}
      <div ref={endRef}></div>
      </div>

      <div className="bottom">
        <div className="icons">
          <label htmlFor='file'>
          <img src='./img.png' alt="img" />
          </label>
          <input type="file" id='file' 
          style={{display:"none"}}
          onChange={handleImg}/>
          <img src='./camera.png' alt="camera" />
          <img src='./mic.png' alt="mic" />
        </div>

          <input type="text" placeholder={(isCurrentUserBlocked || isReceiverBlocked)
          ? "You cannot send a message!" : "Type a message" 
          }
          value={text}
          onChange={(e)=>{setText(e.target.value)}}
          disabled={isCurrentUserBlocked || isReceiverBlocked}/>

          <div className="emoji">
            <img src='./emoji.png' alt="emoji" onClick={()=>setShow(prev=>!prev)}/>
            {/*EmojiPicker component expects a prop named open*/}
            <div className="picker">
            <EmojiPicker open={show} onEmojiClick={handleEmoji}/>
            </div>
          </div>

          <button className='sendButton' 
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}>
          Send</button>

          {/*1. EmojiPicker should open on clicking emoji icon
             2. On selecting an emoji, it should be added to the input field
           */ }

      </div>
    </div>
  )
}

export default Chat
