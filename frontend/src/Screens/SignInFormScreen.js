import React, { useRef, useState } from "react";
import { Loader } from "../Components";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../firebase";
import "./SignInFormScreen.css";

const SignInFormScreen = () => {
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loaderRegister, setLoaderRegister] = useState(false);

  const signIn = (e) => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
    setLoader(true);
    e.preventDefault();

    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);

        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };
  const register = (e) => {
    setTimeout(() => {
      setLoaderRegister(false);
    }, 1000);
    setLoaderRegister(true);
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };
  return (
    <div className="sign__in__form-container">
      <form>
        <h1>Sign In</h1>
        {error ? (
          <p className="error__txt">Please enter a valid email or password</p>
        ) : null}
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passRef} placeholder="Password" type="password" />
        <button onClick={signIn} type="submit">
          {loader ? <Loader /> : "Sign In"}
        </button>

        <h4>
          <span className="add__gray">New to Netflix?</span>{" "}
          <span onClick={register} className="sign__up-link">
            {loaderRegister ? <Loader /> : "Sign Up Now"}
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignInFormScreen;
