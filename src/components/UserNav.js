import React,{useEffect,useState} from 'react';
import Cookies from 'js-cookie';
import { Link,NavLink,useNavigate } from 'react-router-dom';
import {FaHome, FaChartLine, FaWallet, FaRegMoneyBillAlt , FaUser , FaSignOutAlt , FaHeart } from 'react-icons/fa'
import { logo } from '../assets/assets';
import axios from 'axios';
import '../stylesheets/user/Navbar.css'
const UserNav = () => {

  const [userEmail,setUserEmail] = useState("");
  const userId = Cookies.get('userId');

  const url = process.env.REACT_APP_URL;

  const getUserInfo = async() => {
      try {
        const token  = Cookies.get('token');
        const response = await axios.get(`${url}/users/${userId}/`,{
            headers: {
              Authorization: `${token}`
            
            }
        })
        setUserEmail(response.data.email);
        Cookies.set("userEmail", response.data.email);
      } catch (error) {
        console.log(error);
      }
  }
    const handleLogOut = () => {
      Cookies.remove('token');
    }


    useEffect(() => {
      getUserInfo();
    },[])

    
  return (
    <>
     <nav className='user-nav'>
            <div className='user-navbar'>
            <div className='user-navbar-top'>
                    <img src={logo} className='logo_img' />
                    <span className='logo_txt'>Aparivest</span>
                </div>

                <ul className='user-navbar-menu-links'>
                    <li>
                      <NavLink to={"/overview"}>
                      <i className='umml-icon'>
                        <FaHome/>
                      </i>
                      <span>
                        Overview
                      </span>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to={"/payment"}>
                      <i className='umml-icon'>
                        <FaWallet/>
                      </i>
                      <span>
                        Payment
                      </span>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to={"/packages"}>
                      <i className='umml-icon'>
                        <FaRegMoneyBillAlt/>
                      </i>
                      <span>
                        Packages
                      </span>
                      </NavLink>
                    </li>

                    
                    
                    <li>
                        <NavLink to={"/wealth-overview"} activeClassName="active-link">
                        <i className='umml-icon'>
                          <FaChartLine /> 
                        </i>
                        <span>Wealth Overview</span>
                      </NavLink>
                    </li>


                    <li>
                      <NavLink to={"/profile"}>
                      <i className='umml-icon'>
                      <FaUser/>
                      </i>
                      <span>
                        Profile
                      </span>
                      </NavLink>
                    </li>

                    <li>
                      <Link to={'/'} onClick={handleLogOut}>
                      <i className='umml-icon'>
                        <FaSignOutAlt/>
                      </i>
                      <span>
                        Logout
                      </span>
                      </Link>
                    </li>
                </ul>
              </div>
          </nav>
          {/* Mobile nav */}
          
                <div className="mobile-user-nav">
                <div className='user-navbar-top'>
                    <img src={logo} className='logo_img' />
                    <span className='logo_txt'>Aparivest</span>
                </div>
                <ul className='user-navbar-menu-links-mobile'>
                    <li>
                      <NavLink to={"/overview"}>
                      <i className='umml-icon'>
                        <FaHome/>
                      </i>
                      <span>
                        Overview
                      </span>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to={"/payment"}>
                      <i className='umml-icon'>
                        <FaWallet/>
                      </i>
                      <span>
                        Payment
                      </span>
                      </NavLink>
                    </li>

                    
                    <li>
                      <NavLink to={"/packages"}>
                      <i className='umml-icon'>
                        <FaRegMoneyBillAlt/>
                      </i>
                      <span>
                        Packages
                      </span>
                      </NavLink>
                    </li>

                    <li>
                        <NavLink to={"/wealth-overview"} activeClassName="active-link">
                        <i className='umml-icon'>
                          <FaChartLine /> 
                        </i>
                        <span>Wealth Overview</span>
                      </NavLink>
                    </li>


                    <li>
                      <NavLink to={"/profile"}>
                      <i className='umml-icon'>
                      <FaUser/>
                      </i>
                      <span>
                        Profile
                      </span>
                      </NavLink>
                    </li>
                  
                    <li className='u-logout'>
                      <Link to={'/'} onClick={handleLogOut}>
                      <i className='umml-icon'>
                        <FaSignOutAlt/>
                      </i>
                      <span>
                        Logout
                      </span>
                      </Link>
                    </li>
                </ul>
                </div>

        </>  
          
  )
  }


export default UserNav