import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "./Profile.css"
import {RiDeleteBin6Fill} from 'react-icons/ri'

export default function Profile() {
  //const [delP, setDelP] = useState({});
  
  const navigate = new useNavigate();
  const [userData, setUserData] = useState({name:"", email:""});
  
  const callSecret = async (e) => {
        try {
            const res = await fetch("/myprofile", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                }, credentials: 'include'
            });

            const data = await res.json();
            setUserData(data);


            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
                
            }
            
        } catch (error) {
             navigate('/SignIn')
        }
    };

    useEffect(() => { 
        callSecret();
    }, []);

  
  const [user, setUser] = useState([]);

  const getPost = async (e)=>{
    try {
      const response = await fetch('/get_posts')
      const data = await response.json();
      setUser(data)
      
    } catch (error) {
      navigate('/SignIn')
    }
     
  }
  
  useEffect(() =>{
      getPost();
  }, []);

  return (
    <>
      <div className='box'>
        <div className='info'>
          <h3>Info</h3>
          <h4><b>Name:</b> {userData.name}</h4>
          <h4><b>Email:</b> {userData.email}</h4>
          <h4><b>College Name:</b> {userData.collegename}</h4>
          </div>
      </div>
      
      <div className='box'>
      <h3>My Posts</h3>
      <div className='my_posts'>
     
      {
        user.map((CE)=>{
          var chatid = CE._id
          var chats = CE.chatt
          const delpost123 = async()=>{
            fetch('/delete_post',{
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                 chatid
                })
              }
        )
        window.location.reload();
      }

          return(
          <>
          <div className='post_box'>
          <label ><h4>{CE.chatt}</h4></label>
         <form className='form_chat' method='POST'>
         <RiDeleteBin6Fill className='del_icon' id={CE._id} role='button' onClick={delpost123} size={20}></RiDeleteBin6Fill>
         </form>
          </div>
          </>
        )  
        })
      } 
      </div>
      </div>
    </>
  )
}
