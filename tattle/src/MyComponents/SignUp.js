import React , {useState, useEffect} from 'react'
import './SignUp.css'
import {BsFillPersonFill} from 'react-icons/bs';
import {AiTwotoneMail} from 'react-icons/ai';
import {IoIosSchool} from 'react-icons/io';
import {Link, useNavigate} from 'react-router-dom';
import {RiLockPasswordFill} from 'react-icons/ri';

export default function SignUp() {
  const [userData, setUserData] = useState([]);
  
  const callSecret = async (e) => {
        try {
            const res = await fetch("/findingClg", {
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
             console.log('User not logged in..!');
        }
    };

    useEffect(() => { 
        callSecret();
    }, []);

  const history = useNavigate();
  const [user, setUser] = useState({
    name:"",email:"",collegename:"",password:"",cpassword:""
  });

  let name,value;

  function handleInputs(e) {
    name = e.target.name
    value = e.target.value
    setUser({...user,[name]:value})

  }

  const PostData = async (e) =>{
      e.preventDefault();

      const {name,email,collegename,password,cpassword} = user;

      const res = await fetch('/Register',{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,email,collegename,password,cpassword
        })
      });

      const data = await res.json();

      if(res.status === 422 || !data){
        window.alert("Invalid registration");
      }
      else{
        window.alert("successful registration");
        history('/SignIn');
      }
  }

  return (
    <>
    <div className='register-pg'>
       
       <div className='register-content'>
       <div className='box'>
       <h1>Register</h1>
       <form method="POST">
       <BsFillPersonFill/><label htmlFor="name">Name</label>
       <input type="text" id="name" name="name" placeholder='Your Name' value={user.name} onChange = {handleInputs} /><br></br>

       <AiTwotoneMail/><label htmlFor="email">Email id</label>
       <input type="email" id="email" name="email" placeholder='Your Email id' value={user.email}  onChange = {handleInputs} /><br></br>

       <IoIosSchool/><label htmlFor="email">College Name</label>
       <input type="text" list='browsers' id="collegename" name="collegename" placeholder='Your college Name' value={user.collegename}  onChange = {handleInputs} /><br></br>
       <datalist id="browsers">
         {
          userData.map((CE)=>{
            return(
              <option>{CE.collegeName}</option>
            )
          })
        } 
        </datalist>
        
       <RiLockPasswordFill/><label htmlFor="password">Password</label>
       <input type="password" id="password" name="password" placeholder='Your Password' value={user.password} onChange = {handleInputs} /><br></br>

       <RiLockPasswordFill/><label htmlFor="cpassword">Confirm Password</label>
       <input type="password" id="cpassword" name="cpassword" placeholder='Confirm Your Password' value={user.cpassword} onChange = {handleInputs} /><br></br>

       <label className='check'><input type='checkbox' />By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</label>

     
       <button className='btn btn-primary' type='submit' onClick={PostData}>Submit</button>
       <h5>Already registered?<Link to='/SignIn'>SignIn</Link></h5>
       <h5>Not able to find your college? <Link to='/'>Let us know.</Link></h5>
       </form>
       </div>
       </div>
     </div>
    </>
  )
}
