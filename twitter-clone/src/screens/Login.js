import React, { useEffect, useState } from "react";
import axios from "axios";
import "./login.css";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import {BeatLoader} from 'react-spinners'


function Login({ closeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader , setLoader] = useState(false);
 
  const [errors, setErrors] = useState({});
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (user) {
      window.location.href = "/";
    }
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "*Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "*Invalid email address";
    }

    if (!password) {
      newErrors.password = "*Password is required";
    } else if (password.length < 4) {
      newErrors.password = "*Password is too small";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      
      const userData = {
        email,
        password,
      };

      try {
        setLoader(true);
        const result = await axios.post(
          "/api/users/login",
          userData
        );

        setLoader(false);

        localStorage.setItem("currentUser", JSON.stringify(result.data));
        window.location.href = "/";

       
      } catch (error) {
        console.log(error);
        setLoader(false)
      }
    }
  };

  return (
    <>
      <div className="modal-wrapper" onClick={closeModal}></div>
      <div>
        <div className="container">
          <div className="login-box">
            <h1>Login</h1>
            <form
              noValidate=""
              action=""
              className="space-y-6 ng-untouched ng-pristine ng-valid"
            >
              {/* Email input */}
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  placeholder="leroy@jenkins.com"
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>
              {/* Password input */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  placeholder="*****"
                />
                {errors.password && (
                  <p className="error-text">{errors.password}</p>
                )}
              </div>
            </form>
            <button className="login-button" onClick={handleLogin}>
              {loader ? <BeatLoader color="#dfe6e5"/> : 'Login'}
            </button>
            <div className="flex items-center pt-4 space-x-1 social-accounts">
              <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
              <p className="px-3 text-sm text-gray-500">
                Login with social accounts
              </p>
              <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <FcGoogle className="google" />
              <FaGithub className="github" />
              <FaLinkedin className="linkedIn" />
            </div>
            <p className="sign-up login-link">
              Don't have an account?
              <a rel="noopener noreferrer" href="/" className="hover:underline">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
