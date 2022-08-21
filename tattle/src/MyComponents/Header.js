import React, {useState, useContext} from 'react'
import './Header.css'
import {GiHamburgerMenu} from "react-icons/gi"                      
import {Link} from 'react-router-dom';
import { UserContext } from '../App';

    const Header = () =>{
        const { state, dispatch } = useContext(UserContext);
        const [showMediaIcons, setshowMediaIcons] = useState(false);
        const RenderMenu = ()=>{
            if(state){
                return(<>
                    <li><Link to='/Account'>Posts</Link></li>
                    <li><Link to='/profile'>My Profile</Link></li>
                    <li><Link to='/Logout'>Logout</Link></li>

                </>
                );
            }else{
                return(<>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/SignIn'>Login</Link></li>
                    <li><Link to='/SignUp'>Register</Link></li>
                    <li><Link to='/About'>About Us</Link></li>

                </>);
                
            }
        }      
        return(
            <>
                 <nav className='mainNav'>
                     {/* logo part */}
                     <div className='logo'>
                         <img src='logo123-removebg-preview.png' alt='' />
                     </div>
            
                     {/* menu part */}
                     <div
                      className={showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"}>
                        <ul>
                        <RenderMenu/>
                        </ul>
                        
                    </div>
                    {/* hamburger */}
                    <div className='hamburger' onClick={() => setshowMediaIcons(!showMediaIcons)}>
                    {/* < onClick={() => setshowMediaIcons(!showMediaIcons)} /> */}
                          <GiHamburgerMenu className='hamb'/>
                        
                    </div>
                </nav>
                </>
        )
}

export default Header;