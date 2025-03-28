import React, { useEffect, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import "./Chat.css"

const Chat = () => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  const endRef = React.useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [text]);
  
  const handleEmoji = (e) => {
    console.log(e);
    setText((prev)=>prev+e.emoji);
    setShow(false);
  }

  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src='./avatar.png' alt="avatar" />
          <div className="name">
            <span>John doe</span>
            <p>Active now</p>
          </div>
        </div>
        <div className="icons">
          <img src='./video.png' alt="video" />
          <img src='./phone.png' alt="phone" />
          <img src='./info.png' alt="info" />
        </div>
      </div>

      <div className="center">
      <div className="message">
        <img src='./avatar.png' alt="avatar" />
        <div className="text">
          <p>Hey there! How can I help you today?</p>
          <span>10:00 AM</span>
        </div>
      </div>
      <div className="message own">
        <div className="text">
          <img src='https://tse4.mm.bing.net/th/id/OIP.HrFanMxw7NL_LvjgNLfmGAHaE8?rs=1&pid=ImgDetMain' alt="shared" />
          <p>Hey there! How can I help you today?</p>
          <span>10:00 AM</span>
        </div>
      </div>
      <div className="message">
        <img src='./avatar.png' alt="avatar" />
        <div className="text">
          <p>Hey there! How can I help you today?</p>
          <span>10:00 AM</span>
        </div>
      </div>
      <div className="message own">
        <div className="text">
          <p>Hey there! How can I help you today?</p>
          <span>10:00 AM</span>
        </div>
      </div>
      <div ref={endRef}></div>
      </div>

      <div className="bottom">
        <div className="icons">
          <img src='./img.png' alt="img" />
          <img src='./camera.png' alt="camera" />
          <img src='./mic.png' alt="mic" />
        </div>

          <input type="text" placeholder="Type a message" 
          value={text}
          onChange={(e)=>{setText(e.target.value)}}/>

          <div className="emoji">
            <img src='./emoji.png' alt="emoji" onClick={()=>setShow(prev=>!prev)}/>
            {/*EmojiPicker component expects a prop named open*/}
            <div className="picker">
            <EmojiPicker open={show} onEmojiClick={handleEmoji}/>
            </div>
          </div>

          <button className='sendButton'>Send</button>

          {/*1. EmojiPicker should open on clicking emoji icon
             2. On selecting an emoji, it should be added to the input field
           */ }

      </div>
    </div>
  )
}

export default Chat
