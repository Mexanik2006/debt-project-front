import React, { useState } from 'react';
import axios from '../api/api';
import Cookies from 'js-cookie';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signup', { userName, email, password });
      console.log('Foydalanuvchi muvaffaqiyatli yaratildi:', response.data);
      // Save the token to a cookie
      Cookies.set('token', response.data.token, { expires: 7 }); // Expires in 7 days
      // Boshqa muvaffaqiyatli foydalanuvchi yaratish qo'shing
    } catch (error) {
      console.error('Foydalanuvchi yaratishda xatolik:', error);
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
      />
      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button type="submit">Sign up</button>
    </form>
  );
};

export default Signup;