import React, {useState, useEffect} from 'react'
import "./account.css"
// import {BsEmojiLaughing} from "react-icons/bs"
// import {BiSticker} from "react-icons/bi"
// import {MdOutlineGif} from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import {FcLike} from 'react-icons/fc'

export default function Account() {
  const navigate = useNavigate();  
  //get user
  const [user, setUser] = useState([]);

  const getUsers = async (e)=>{
    try {
      const response = await fetch('/chatting')
      setUser(await response.json());
      
    } catch (error) {
      navigate('/SignIn')
    }
     
  }
  
  useEffect(() =>{
      getUsers();
  }, []);

  //post data
  const [userpost, setUserpost] = useState({
    chatt:""
  });
  let name,value;

  function handleInputs(e) {
    name = e.target.name
    value = e.target.value
    setUserpost({...userpost,[name]:value})

  }

  const PostData = async (e) =>{
    e.preventDefault()
    
    const {chatt} = userpost;
    const res = await fetch('/chatlog',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chatt
      })
    });
    const data = await res.json();
    if(res.status === 400 ||  res.status === 404 || res.status === 422 ||  !data){
      window.alert("Write something");
    }
    else if(res.status === 200 ||  res.status === 202 || res.status === 204 || data)
      {window.alert('page reloading')
      window.location.reload()      
      }        
      
}

  //likes
  const [like, setlike] = useState(0)
  const [likeactive, setlikeactive] = useState(false)

  function likef(){
    if(likeactive){
      setlikeactive(false)
      setlike(like-1)
    }else{
      setlikeactive(true)
      setlike(like+1)
    }
  }

  return (
    <>
     <form method='POST'>
     <div className='chatting'>
        <textarea method="POST" className='boxx' placeholder='write here..' id="chatt" name="chatt" value={userpost.chatt} onChange={handleInputs}>
        </textarea>
    </div>

    <div className='extras'>
      <div className='details'>
      
{/*    
      <div><div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  role="button"
      tabIndex="-3" >
      <BsEmojiLaughing className='emoji'/>
      </div> 
      {isHovering && <h4>emoji</h4>}
      </div>
 
      <div><div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  role="button"
      tabIndex="-3"><BiSticker className='sticker'/>
      </div> 
      {isHovering && <h4>sticker</h4>}
      </div>
  
      <div><div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  role="button"
      tabIndex="-3"><MdOutlineGif className='gif'/>
      </div> 
      {isHovering && <h4>gif</h4>}
      </div>
       */}
    </div>
      <div className='bttn'>
      <button className='btn' type='submit' onClick={PostData} >Post</button>
      </div>
      </div>
      
      </form>
      <div className='mt-3'>
      {
      user.map((CurrE)=>{
        return(
          <div className='post'>
          <div className='boxing'>
            {CurrE.chatt}
          <FcLike className='likebtn' role='button' onClick={likef}>{like}</FcLike>
          </div>
          </div>
        )
      })
    }  
      </div>
    </> 
  )
}
