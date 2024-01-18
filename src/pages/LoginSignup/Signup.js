import React from 'react';
import "./Login_Signin.css"
import WhatsApp from "../../images/WhatsApp.png"

import { useRef, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

import axios from '../../services/axios';

function Signup() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const emailRef = useRef();
  const fullNameRef = useRef();
  const passwordRef = useRef();
  const { currentUser, signup } = useAuth();
  const history = useHistory();

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const fullName = fullNameRef.current.value;
    return signup(email, password, fullName)
      .then((ref) => {
        setLoading(false);
        // axios.post('/addUser', {
        //   full_name: fullName,
        //   email: ref.user.email,
        //   secret_code: ref.user.uid
        // })
        history.push('/');
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };
  return (
    <>
      {currentUser ? (
        <Redirect to="/" />
      ) : (
        <div className="signupCont">
          <div className="signupCont__inside">
            <img alt="logo" id="logo" src={WhatsApp} />

            <div className="signupCont__title">Sign up</div>
            {error && <p className="error_msg">{error}</p>}
            <form id="Signup_form" className='signupCont__form' onSubmit={(e) => handleSignup(e)}>
              <label>
                Full Name
                <br />
                <input ref={fullNameRef} id="fullname" className="signupCont__signupInput" type="text" />
              </label>

              <label>
                Email
                <br />
                <input ref={emailRef} id="email" className="signupCont__signupInput" type="email" />
              </label>

              <label>
                Password
                <br />
                <input ref={passwordRef} id="password" className="signupCont__signupInput" type="password" />
              </label>

              <label>
                Confirm Password
                <br />
                <input id="password_c" className="signupCont__signupInput" type="password" />
              </label>

              <button disabled={loading} id="signin_btn" className="signupCont__btn signupCont__btn--green" type="submit" >Sign up</button>
            </form>

            <button className="signupCont__btn signupCont__btn--red" type="button" onClick={() => history.push('/Login')}><FontAwesomeIcon icon={faUserPlus} /> Log in with email</button>
          </div>
        </div>
      )
      }
    </>
  )
}

export default Signup;

