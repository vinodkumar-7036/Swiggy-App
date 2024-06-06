import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { popupContext } from '../App';
import { BiSolidUser } from "react-icons/bi";
import "../StyleComponents/navBar.css";

const NavBar = () => {
  const { isPopUpOpen, setIsPopUpOpen, currentUser, setCurrentUser } = useContext(popupContext);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handlePopUp = () => {
    setIsPopUpOpen(!isPopUpOpen);
  }

  const handleUserIconClick = () => {
    setIsUserPopupOpen(!isUserPopupOpen);
  }

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsUserPopupOpen(false);
    };
    const cartItems=()=>{
      navigate('/cart')
      setIsUserPopupOpen(false);
    }

  return (
    <div className='nav-bar-container'>
      <div className="organization">
        <h1 onClick={() => navigate("/")}>Swiggy</h1>
      </div>
      <div className="search-bar">
        <input type='text' placeholder='Enter...' />
      </div>
      <div className="auth">
        {currentUser ? (
          <div className="user-info">
            <div>{currentUser.username}</div>
            <BiSolidUser className='user-icon' onClick={handleUserIconClick} />
            {isUserPopupOpen && (
              <div className="user-popup">
                <div onClick={cartItems}>Cart</div>
                <div onClick={logout}>Logout</div>
              </div>
            )}
          </div>
        ) : (
          <button onClick={handlePopUp}>Login/Signup</button>
        )}
      </div>
    </div>
  );
}

export default NavBar;
