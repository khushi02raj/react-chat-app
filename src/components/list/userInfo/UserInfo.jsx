import React from 'react'
import "./UserInfo.css"
import  useUserStore from '../../../lib/userStore'

const UserInfo = () => {
  const {currentUser}=useUserStore();
  console.log(currentUser);

  return (
    <div className='userInfo'>

      <div className="user">
      <img src= {currentUser.avatar ||  './avatar.png'} alt="user" />
      <h2>{currentUser?.username}</h2>
        </div>

        <div className="icons">
            <img src='./more.png' alt="more" />
            <img src='./video.png' alt="more" />
            <img src='./edit.png' alt="more" />
        </div>
    
    </div>
  )
}

export default UserInfo
