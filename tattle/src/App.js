import React, { createContext, useReducer } from 'react'
import Header from './MyComponents/Header';
import {initialState, reducer} from "./reducer/UseReducer"
import {Routes, Route} from 'react-router-dom'
import SignUp from './MyComponents/SignUp';
import SignIn from './MyComponents/SignIn';
import Home from './MyComponents/Home';
import Profile from "./MyComponents/Profile";
import Account from "./MyComponents/account";
import Logout from './MyComponents/LogOut';
import PageNotFound from './MyComponents/NoPageFound'
import './App.css';

export const UserContext = createContext(); 
const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const Routing = ()=>{
    if(state){
      return(<>   
      <Routes>
      <Route path="/Account" element={<Account/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/Logout" element={<Logout/>} />
      <Route path='*' element={<PageNotFound/>} />

      </Routes>
      </>)
        
  }else{
    return(<>
    <Routes>
    <Route exact path="/" element={<Home/>} /> 
    <Route path="/SignIn" element={<SignIn/>} />
    <Route path="/SignUp" element={<SignUp/>} />
    <Route path='*' element={<PageNotFound/>} />
    </Routes>
    </>)
   
  }
  }
  return ( 
    <>    
    <UserContext.Provider value={{state,dispatch}}>
          <Header/>
          <Routing/>       
    </UserContext.Provider>     
    </>
  )
}

export default App;
