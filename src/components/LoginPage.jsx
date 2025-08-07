import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-icon">🤖</div>
        <h2>Please enter email to login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;