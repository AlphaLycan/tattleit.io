import React, {useState, useContext} from 'react'
import './SignIn.css'
import {AiTwotoneMail} from 'react-icons/ai';
import {RiLockPasswordFill} from 'react-icons/ri';
import { Link, useNavigate} from 'react-router-dom';
import { UserContext } from '../App';

export default function SignIn() {

const {state,dispatch} = useContext(UserContext)

  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handleInput = async (e) =>{
    e.preventDefault();

    const res = await fetch('/login',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,password
      })
    });

    const data = await res.json();

    if(res.status === 400 ||  res.status === 404 || res.status === 422 ||  !data){
      navigate("/")
    }
    else{
     dispatch({type:"USER", payload: true})
      navigate('/profile');

    }
     
}

  return (
    <>
    <div className='login-pg'>
       
      <div className='login-content'>
      <div className='box'>
      <h1>Login</h1>
      <form method="POST">
      <AiTwotoneMail/><label for="email">Email id</label>
      <input type="email" id="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Your Email id' /><br></br>

      <RiLockPasswordFill/><label for="password">Password</label>
      <input type="password" id="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)}  placeholder='Your Password'/><br></br>

      <label></label>
      <div className='align-items-center'>
        <button className='btn btn-primary' type='submit' onClick={handleInput}>Login</button>
        </div>
      
      <h5>Don't have account? <Link to='/SignUp'>Register</Link></h5>
      </form>
      </div>
      </div>
    </div>
    </>
  )
}
