import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { StoreContext } from '../StorContext/StoreContext';
const Login = () => {
const {  setShowLogin, token }=useContext(StoreContext);
    const [currState, setCurrState] = useState("Sign Up");
    const { setToken } = useContext(StoreContext);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

  const onLogin = async (e) => {
  e.preventDefault();

  let url = "http://localhost:5000";
  const endpoint = currState === "Login" ? "/api/users/login" : "/api/users/register";
  url += endpoint;

  // Conditionally send fields
  const payload =
    currState === "Login"
      ? {
          email: data.email,
          password: data.password
        }
      : {
          name: data.name,
          email: data.email,
          password: data.password
        };

  try {
    const response = await axios.post(url, payload);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      toast.error(response.data.message);
    }
  } catch (err) {
    console.error("API error:", err);
    toast.error(err.response?.data?.message || "Something went wrong!");
  }
};


    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} alt="close" />
                </div>

                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <input
                            name='name'
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            placeholder='Your name'
                            required
                        />
                    )}
                    <input
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder='Your email'
                        required
                    />
                    <input
                        name='password'
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder='Password'
                        required
                    />
                </div>

                <button type="submit">
                    {currState === "Login" ? "Login" : "Create account"}
                </button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                <p>
                    {currState === "Login" ? (
                        <>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></>
                    ) : (
                        <>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></>
                    )}
                </p>
            </form>
        </div>
    );
};

export default Login;
