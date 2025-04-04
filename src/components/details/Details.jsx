import React from 'react'
import "./Details.css"
import useChatStore from '../../lib/chatStore'
import useUserStore from '../../lib/userStore';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
const Details = () => {
const {chatId,user,isCurrentUserBlocked,
isReceiverBlocked,changeBlock}=useChatStore();

const {currentUser}=useUserStore();

const handleBlock =async () => {
  if(!user)
  return;
  const userDocRef = doc(db, "users", currentUser.id);
  try{
    await updateDoc(
      userDocRef,
      {
        blocked: isReceiverBlocked
        ? arrayRemove(user.id)
        : arrayUnion(user.id)
      }
    );
    changeBlock();  
  }
  catch(err){
    console.log(err);
  }
}

  return (
    <div className='detail'>
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="avatar" />
        <div className="name">
          <span>{user?.username}</span>
          <p></p>
        </div>
      </div>

      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src='./arrowUp.png' alt="arrowUp" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src='./arrowUp.png' alt="arrowUp" />
          </div>
        </div>
        
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src='./arrowDown.png' alt="arrowDown" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
              <img src='https://tse4.mm.bing.net/th/id/OIP.HrFanMxw7NL_LvjgNLfmGAHaE8?rs=1&pid=ImgDetMain' alt="shared" />
                <span>photo_2025.png</span>
              </div>
                <img src='./download.png' className='icon' alt="download" />
            </div>
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
              <img src='https://tse4.mm.bing.net/th/id/OIP.HrFanMxw7NL_LvjgNLfmGAHaE8?rs=1&pid=ImgDetMain' alt="shared" />
                <span>photo_2025.png</span>
              </div>
                <img src='./download.png' className='icon' alt="download" />
            </div>
          </div>
        </div>
        
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src='./arrowUp.png' alt="arrowUp" />
          </div>
        </div>
        <button className='block' onClick={handleBlock}>
        {isCurrentUserBlocked ?
        "You are blocked!"
        :isReceiverBlocked?
        "User blocked"
        :
        "Block User"}</button>
        <button className='logout' >Logout</button>
      </div>
    </div>
  )
}

export default Details
