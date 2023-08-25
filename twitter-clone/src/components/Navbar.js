import React, { useState } from "react";
import "./navbar.css";
import logo from "../images/twitter-logo.png";
import apps from "../images/launch-app.png";
import userPic from "../images/user.png";
import arrow from "../images/arrow.png";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  };
  const [showModal, setShowModal] = useState(false);
  const [showModalSignup, setShowModalSignup] = useState(false);

  const closeModal = () => setShowModal(false);
  const closeModalSignup = () => setShowModalSignup(false);

  const dropdownfun = () => {
    document.getElementById("myDropdown").classList.toggle("show");
  };
  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };
  return (
    <nav>
      {showModal && <Login closeModal={closeModal} />}
      {showModalSignup && <Signup closeModalSignup={closeModalSignup} />}

      <div className="nav-left">
        <img src={logo} alt="" />
        <div className="input-search">
          <label htmlFor="">#</label>
          <input type="text" name="" id="" placeholder="Explore" />
        </div>
      </div>
      {user ? (
        <div className="nav-right">
          <div onClick={dropdownfun} className="user-dropdown">
            <img src={userPic} alt="" />
            <div class="dropdown">
              <button class="dropbtn">{user.name}</button>
              <div id="myDropdown" class="dropdown-content">
                <a href="#home">Profile</a>
                <a href="#about">Setting</a>
                <a>Logout</a>
              </div>
            </div>
            <img src={arrow} alt="" />
          </div>
          <button className="btn" onClick={handleLogout}>Logout</button>
          <img src={apps} alt="" />
        </div>
      ) : (
        <div className="nav-right">
          <button className="btn" onClick={() => setShowModal(true)}>
            Login
          </button>
          <button className="btn" onClick={() => setShowModalSignup(true)}>
            Signup
          </button>
          <img src={apps} alt="" />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
