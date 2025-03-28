import React from 'react'
import "./AddUser.css"
const AddUser = () => {
  return (
    <div className='addUser'>
      <form>
        <input type="text" placeholder="Username" name='username' />
      </form>
      <div className="user">
        <div className="detail">
            <img src='./avatar.png' alt="avatar" />
            <span>John doe</span>
        </div>
        <button>Add</button>
      </div>
    </div>
  )
}

export default AddUser
