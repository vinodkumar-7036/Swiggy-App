import React, { useState, useContext } from 'react';
import { popupContext } from '../../App';
import './Signup.css';

const LoginPage = () => {
  const { setIsPopUpOpen, setPopupType,setCurrentUser } = useContext(popupContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

   
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(
      user => user.email === formData.email && user.password === formData.password
    );

    if (user) {
    
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);    
      setIsPopUpOpen(false);
    } else {
  
      setError('Invalid email or password');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className='toggle-btn'>
          <h1 onClick={() => setIsPopUpOpen(false)}>X</h1>
        </div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Login</button>
          <p onClick={() => setPopupType("signup")} className='auth-tab'>Don't have an account? Sign up</p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
