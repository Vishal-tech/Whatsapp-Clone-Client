import React, { useState, useRef } from "react";
import "./Login_Signin.css";
import WhatsApp from "../../images/WhatsApp.png";

import { Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const { currentUser, signin } = useAuth();

  const handleSignin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      await signin(email, password);
      setLoading(false);
      history.push("/");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {currentUser ? (
        <Redirect to="/" />
      ) : (
        <div className="loginCont">
          <div className="loginCont__inside">
            <img alt="logo" id="logo" src={WhatsApp} />
            <div className="loginCont__title">Login</div>
            {error && <p className="error_msg">{error}</p>}
            <form
              id="login_form"
              className="loginCont__form"
              onSubmit={(e) => handleSignin(e)}
            >
              <label>
                Email
                <br />
                <input
                  ref={emailRef}
                  id="email"
                  className="loginCont__loginInput"
                  type="email"
                />
              </label>

              <label>
                Password
                <br />
                <input
                  ref={passwordRef}
                  id="password"
                  className="loginCont__loginInput"
                  type="password"
                />
              </label>

              <button
                disabled={loading}
                className="loginCont__btn loginCont__btn--green"
                type="submit"
              >
                Log in
              </button>
            </form>

            <button
              className="loginCont__btn loginCont__btn--red"
              type="button"
              onClick={() => history.push("/Signup")}
            >
              <FontAwesomeIcon icon={faUserPlus} /> Sign up with email
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default Login;
