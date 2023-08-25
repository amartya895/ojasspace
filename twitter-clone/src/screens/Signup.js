import React, { useState, useEffect } from "react";
import axios from "axios";
import "./signup.css";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import {BeatLoader} from 'react-spinners'

function Signup({ closeModalSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loader , setLoader] = useState(false);

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

    if (!name) {
      newErrors.name = "*Name is required";
    } else if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(name)) {
      newErrors.name = "*Invalid Name";
    }

    if (!email) {
      newErrors.email = "*Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "*Invalid email address";
    }

    if (!password) {
      newErrors.password = "*Password is required";
    } else if (password.length < 6) {
      newErrors.password = "*Password must be at least 6 characters";
    }

    if (password !== cpassword) {
      newErrors.cpassword = "*Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (validateForm()) {
      const userData = {
        name,
        email,
        password,
        
      };

      try {
        setLoader(true);
        await axios.post(
          "https://ojasspace-backend.onrender.com/api/users/signup",
          userData
        );
        const result = await axios.post(
          "https://ojasspace-backend.onrender.com/api/users/login",
          { email, password }
        );

        setLoader(false);

        localStorage.setItem("currentUser", JSON.stringify(result.data));
        window.location.href = "/";
        console.log(userData);
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    }
  };

  return (
    <>
      <div className="modal-wrapper" onClick={closeModalSignup}></div>
      <div className="container">
        <div className="signup-box">
          <h1>Sign up</h1>
          <form
            noValidate=""
            action=""
            className="text-left space-y-12 ng-untouched ng-pristine ng-valid"
          >
            {/* Name input */}
            <div className="form-group">
              <label htmlFor="fName">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="fname"
                id="fName"
                placeholder="leroy"
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>
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
                placeholder="*****"
              />
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}
            </div>
            {/* Confirm Password input */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Re-Enter Password</label>
              <input
                type="password"
                placeholder="Re-Enter Password"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
              />
              {errors.cpassword && (
                <p className="error-text">{errors.cpassword}</p>
              )}
            </div>
          </form>
          <button
            type="button"
            onClick={handleSignup}
            className="signup-button"
          >
           {loader ? <BeatLoader color="#dfe6e5"/> : 'Register'}
          </button>
          <div className="flex items-center pt-4 space-x-1 social-accounts">
            <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
            <p className="px-3 text-sm text-gray-500">
              Signup with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FcGoogle className="google" />

            <FaGithub className="github" />

            <FaLinkedin className="linkedIn" />
          </div>
          <p className="login-link">
            Do you have an account?
            <a rel="noopener noreferrer" href="/" className="hover:underline">
              LogIn
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
