import React, { useState } from 'react'
import './Login.css'
import { toast } from 'react-toastify';
import {createUserWithEmailAndPassword , signInWithEmailAndPassword} from 'firebase/auth';
import {auth,db} from '../../firebase.js';
import { doc, setDoc } from "firebase/firestore"; 
import upload from '../../lib/upload.js';

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

    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            const formData=new FormData(e.target);
            const {email,password}=Object.fromEntries(formData);
            await signInWithEmailAndPassword(auth,email,password);
            toast.success('Logged in successfully'); 
        }
        catch(err){
            console.log(err);
            toast.error('Failed to login');
        }
        
    }
    const handleRegister=async(e)=>{
        e.preventDefault();
        const formData=new FormData(e.target);
        const {username,email,password}=Object.fromEntries(formData);
        console.log(username,email,password);
        try{
          const res=await createUserWithEmailAndPassword(auth,email,password);
          
          const imgUrl = await upload(avatar.file);

          await setDoc(doc(db, "users", res.user.uid), {
            username,
            email,
            avatar:imgUrl,
            id:res.user.uid,
            blocked:[]
          });
          await setDoc(doc(db, "userchats", res.user.uid), {
            chats:[]
          });
          toast.success('Registered successfully, please login');
        }
        catch(err){
            console.log(err);
            toast.error('Failed to register');
        }
        
    }
  return (
    <div className='login'>
      <div className="item">
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
            <input type="text" placeholder="Email" name='email'/>
            <input type="password" placeholder="Password" name='password' />
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
