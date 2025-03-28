import React from 'react'
import "./Details.css"
const Details = () => {
  return (
    <div className='detail'>
      <div className="user">
        <img src='./avatar.png' alt="avatar" />
        <div className="name">
          <span>John doe</span>
          <p>active now:</p>
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
        <button>Block</button>
        <button className='logout'>Logout</button>
      </div>
    </div>
  )
}

export default Details
