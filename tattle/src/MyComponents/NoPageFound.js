import React, {useEffect,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

export default function NoPageFound() {
  const navigate = useNavigate();
    const { state, dispatch } = useContext(UserContext);
   useEffect(() => {
      fetch('/logout', {
         method: 'GET',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
         },
         credentials: 'include'
      })
         .then((res) => {
            dispatch({ type: 'USER', payload: false });
            navigate('/SignIn', { replace: true });
            if (res.status !== 200) {
               const error = new Error(res.error);
               throw error;
            }
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

  return (
    <div><h1>404 NoPageFound</h1>
      {/* <button className='btn' type='submit' onClick={PageNavigate} >Navigate to home pg</button> */}
    
    </div>
    
  )
}
