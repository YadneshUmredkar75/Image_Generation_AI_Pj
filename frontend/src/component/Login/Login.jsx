import React, { useState, useContext } from "react";
import "./Login.css";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../StorContext/StoreContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setShowLogin, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async () => {
    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    const endpoint =
      currState === "Login" ? "/api/users/login" : "/api/users/register";
    const url = `http://localhost:5000${endpoint}`;

    const payload =
      currState === "Login"
        ? { email: data.email, password: data.password }
        : { name: data.name, email: data.email, password: data.password };

    try {
      const response = await axios.post(url, payload);
      if (
        response.data.message?.trim().toLowerCase() === "login successful" ||
        response.data.success
      ) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message || "Action successful");

        if (currState === "Login") {
          navigate("/genimage", { replace: true });
          setShowLogin(false);
        } else {
          setShowLogin(false);
        }
      } else {
        toast.error(response.data.message || "Action failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="login-popup fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="login-popup-container bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="login-popup-title flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{currState}</h2>
          <img
            src="/close-icon.svg"
            alt="close"
            onClick={() => setShowLogin(false)}
            className="w-6 h-6 cursor-pointer"
          />
        </div>

        <div className="login-popup-inputs space-y-4">
          {currState === "Sign Up" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
              className="w-full p-2 border rounded"
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          onClick={onLogin}
          className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        >
          {currState === "Login" ? "Login" : "Create account"}
        </button>

        <div className="login-popup-condition flex items-center mt-4">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mr-2"
          />
          <p className="text-sm">
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>

        <p className="mt-4 text-sm text-center">
          {currState === "Login" ? (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setCurrState("Sign Up")}
                className="text-blue-500 cursor-pointer"
              >
                Create one here
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setCurrState("Login")}
                className="text-blue-500 cursor-pointer"
              >
                Login here
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
