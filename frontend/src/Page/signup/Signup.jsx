import React from "react";
import "./Signup.css";

const SignUp = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Sign Up</button>
        <p>Already have an account? Login</p>
      </div>
    </div>
  );
};

export default SignUp;
