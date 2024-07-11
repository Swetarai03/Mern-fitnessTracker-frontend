import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // For simplicity, assume "user" as username and "password" as password
    if (username === 'user' && password === 'password') {
      onLogin();
    } else {
      alert('Invalid username or password');
    }
  };

  const formContainerStyle = {
    maxWidth: "40%",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center"
  };

  const formTitleStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#495057",
    fontWeight: "bold"
  };

  const formControlStyle = {
    marginBottom: "15px"
  };

  const buttonStyle = {
    width: "100%",
    fontSize: "1.1em",
    fontWeight: "bold"
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={formTitleStyle}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="form-control"
          placeholder="Username"
          style={formControlStyle}
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="form-control"
          placeholder="Password"
          style={formControlStyle}
        />
        <button type="submit" className="btn btn-warning d-block mx-auto my-3" style={buttonStyle}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
