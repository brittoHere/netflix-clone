import React, { useState } from "react";
import { Logo } from "../Assets";
import { SignInFormScreen } from "../Screens";
import "./Login.css";

const Login = () => {
  const [signIn, setSignIn] = useState(false);
  return (
    <div className="login__container">
      <div className="login__bg">
        <img src={Logo} className="netflix__logo" alt="logo" />
        <button onClick={() => setSignIn(true)} className="login__signin-btn">
          Sign In
        </button>
        <div className="login__gradient" />
      </div>
      <div className="login__body">
        {signIn ? (
          <SignInFormScreen />
        ) : (
          <>
            <h1>
              All your btech courses are here.Subscribe and enjoy the unlimited
              contents.
            </h1>
            <h2>Watch and learn anywhere, Cancel anytime</h2>
            <h3>
              Ready to watch ? Enter your email to create or restart your
              membership.
            </h3>
            <div className="login__input">
              <form>
                <input type="email" placeholder="Email Address" />
                <button
                  onClick={() => setSignIn(true)}
                  className="get__started-btn"
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
