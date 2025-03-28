import React, { useState } from 'react'
import './Login.css'
import { toast } from 'react-toastify';
const Login = () => {
    const [avatar,setAvatar]=useState({
        file:null,
        url:''
    });

    const handleAvatar=(e)=>{
        if(e.target.files[0]){
        setAvatar({  
            file:e.target.files[0],
            url:URL.createObjectURL(e.target.files[0])
        });
    }
    }

    const handleLogin=(e)=>{
        e.preventDefault();
        toast.success('Logged in successfully');
    }
    const handleRegister=(e)=>{
        e.preventDefault();
        const formData=new FormData(e.target);
        const {username,email,password}=Object.fromEntries(formData);
        console.log(username,email,password);
        
        toast.success('Logged in successfully');
    }
  return (
    <div className='login'>
      <div className="item">
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Sign In</button>
            <span>Forgot Password?</span>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
            <label htmlFor='file'>
                <img src={avatar.url || './avatar.png'} alt="avatar" />
                Upload an image</label>

            <input type="file" id='file' style={{display:"none"}}
            onChange={handleAvatar}/>
            <input type="text" placeholder="Username" name='username' />
            <input type="email" placeholder="Email" name='email'/>
            <input type="password" placeholder="Password" name='password' />
            <button>Sign Up</button>
            <span>Forgot Password?</span>
        </form>
      </div>
    </div>
  )
}

export default Login
