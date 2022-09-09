import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, Avatar } from "../Assets";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [showNavBarBg, setShowNavBarBg] = useState(false);

  const gotoProfile = () => {
    navigate("/profile");
  };

  const gotoHome = () => {
    navigate("/");
  };

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShowNavBarBg(true);
    } else {
      setShowNavBarBg(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);
  return (
    <div
      className={`navbar__container ${
        showNavBarBg ? "nav__bg" : "nav__bg__transperent"
      } `}
    >
      <div className="navbar__contents">
        <img
          onClick={() => gotoHome()}
          className="nav_logo"
          src={Logo}
          alt="netflix_logo"
        />

        <img
          onClick={() => gotoProfile()}
          className="nav_avatar"
          src={Avatar}
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default NavBar;
