import React, { useState, useEffect } from "react";
import Axios from "axios";

// Mock functions for login, register, resetPassword (replace with actual functions)



const register = async (email, password) => {
  // Replace with actual registration logic (typically an API call)
  var data = {"email" : email, "password" : password, "name" : "sweta"}
  Axios.post("https://mern-fitnesstracker-project.onrender.com/fitRoute/create-user", data)
  .then((res) => {
    if (res.status === 200) {
      alert("User added successfully");
    } else {
      console.error("Unexpected response:", res);
      alert("Failed to add new user: Unexpected response");
    }
  })
  .catch((err) => {
    console.error("Error:", err);
    if (err.response) {
      console.error("Server responded with status:", err.response.status);
      alert("Failed to add new record: Server error");
    } else if (err.request) {
      console.error("No response received:", err.request);
      alert("Failed to add new record: No response received");
    } else {
      console.error("Error setting up request:", err.message);
      alert("Failed to add new record: Request setup error");
    }
  });
};

const resetPassword = async (email) => {
  // Replace with actual reset password logic (typically an API call)
  return { success: true, message: "Password reset instructions sent to your email." };
};


export default function UserForm(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [Name, setName] = useState("");
  const [Activity, setActivity] = useState("");
  const [Duration, setDuration] = useState("");
  const [Date, setDate] = useState("");
  const [User, setUser] = useState("");

  useEffect(() => {
    // Check login state from local storage
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn) {
      setIsLoggedIn(true);
    }
    setName(props.NameValue);
    setActivity(props.ActivityValue);
    setDuration(props.DurationValue);
    setDate(props.DateValue);
    setUser(sessionStorage.getItem("token"));
  }, [props.NameValue, props.ActivityValue, props.DurationValue, props.DateValue,props.User]);

  useEffect(() => {
    props.getState({ Name, Activity, Duration, Date, User });
  }, [Name, Activity, Duration, Date, User]);


  const login = async (email, password) => {
    // Replace with actual login logic (typically an API call)
    var data = {"email" : email, "password" : password}
    Axios.post("https://mern-fitnesstracker-project.onrender.com/fitRoute/login/" ,data)
        .then((res) => {
          if (res.status === 200) {
            if(res.data.message === "Incorrect password or email" || res.data.message === 'All fields are required')
            {
              setIsLoggedIn(false);
              alert("Invalid Email and Password");
            }
            else{
              console.log("Logged In")
              console.log(res);
              setIsLoggedIn(true);
              sessionStorage.setItem("token",res.data.token);
              sessionStorage.setItem("email",res.data.email);
              localStorage.setItem("isLoggedIn",true);
              alert("Login Successful");
            }
          } else {
            Promise.reject();
            console.log("login error")
          }
        })
        .catch((err) => {
          alert("Login Failed, Please enter correct user or password");
        });
  };

  const handleLogin = async (event) => {
    await login(email, password);
    localStorage.removeItem("isLoggedIn"); // Remove login state from local storage
  };

  const handleSignUp = async () => {
    await register(email, password);
    
  };

  const handleForgotPassword = async () => {
    const response = await resetPassword(email);
    alert(response.message);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("email")
    localStorage.removeItem("email"); // Remove email from local storage
    localStorage.removeItem("isLoggedIn");
  };

  const formContainerStyle = {
    width: "84.5vw",    // Full viewport width
    height: "100vh",   // Full viewport height
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: "40px",   // Increased padding for more space inside the box
    boxSizing: "border-box",
    backgroundImage: `url('https://wallpapercave.com/wp/wp2992792.jpg')`,
    backgroundSize: "cover",   // Cover the entire container
    backgroundPosition: "center center",   // Center the background image
    backgroundRepeat: "no-repeat"   // Prevent repeating background
  };

  const formTitleStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#ffffff",
    fontWeight: "bold"
  };

  const formControlStyle = {
    marginBottom: "15px",
    width: "300px",    // Fixed width for inputs
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ced4da",
    boxSizing: "border-box"
  };

  const buttonStyle = {
    width: "20%",      // Button stretches across the width
    fontSize: "1.1em",
    fontWeight: "bold",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    margin: "0 auto" // Center the button
  };

  const footerTextStyle = {
    textAlign: "center",
    marginTop: "20px",
    color: "white",
    fontWeight: "bold"
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#dc3545" // Red color for logout button
  };

  if (!isLoggedIn) {
    return (
      <div style={formContainerStyle}>
        <div style={{ maxWidth: "300px" }}>
          <h2 style={formTitleStyle}>Join us</h2>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="form-control"
            placeholder="Enter Email"
            style={formControlStyle}
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="form-control"
            placeholder="Enter Password"
            style={formControlStyle}
          />
          <div onClick={handleLogin} className="btn btn-primary" style={buttonStyle}>
            Login
          </div>
          <p style={footerTextStyle}>
            <span onClick={handleForgotPassword} style={{ cursor: "pointer" }}>Forgot Password?</span> |{" "}
            <span onClick={handleSignUp} style={{ cursor: "pointer" }}>Sign Up</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...formContainerStyle, justifyContent: "flex-start", padding: "20px" }}>
      <h2 style={formTitleStyle}>Fitness Record</h2>
      <input
        value={Name}
        onChange={(event) => setName(event.target.value)}
        className="form-control"
        placeholder="Enter Name"
        style={formControlStyle}
      />
      <input
        value={Activity}
        onChange={(event) => setActivity(event.target.value)}
        className="form-control"
        placeholder="Enter Activity"
        style={formControlStyle}
      />
      <input
        value={Duration}
        onChange={(event) => setDuration(event.target.value)}
        className="form-control"
        placeholder="Enter Duration"
        style={formControlStyle}
      />
      <input
        value={Date}
        onChange={(event) => setDate(event.target.value)}
        className="form-control"
        placeholder="Enter Date"
        style={formControlStyle}
      />
      <button type="submit" className="btn btn-warning my-3" style={buttonStyle}>
        ADD RECORD
      </button>
      <button onClick={handleLogout} className="btn btn-danger my-3" style={logoutButtonStyle}>
        LOGOUT
      </button>
    </div>
  );
}
