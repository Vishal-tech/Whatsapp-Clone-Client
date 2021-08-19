import React from 'react';
import "./Login_Signin.css"
import WhatsApp from "../images/WhatsApp.png"

import {useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import {faUserPlus} from '@fortawesome/free-solid-svg-icons'

import axios from '../axios';

function Signup(){

const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const emailRef = useRef();
const fullNameRef = useRef();
const passwordRef = useRef();
const { signup } = useAuth();
const history = useHistory();

const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const fullName = fullNameRef.current.value;
    signup(email, password, fullName)
      .then((ref) => {
        setLoading(false);
        axios.post('/addUser',{
          full_name:fullName,
          email:ref.user.email,
          secret_code:ref.user.uid
        })
        history.push('/');
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };
    return(
    <div className="SignupCont">
        <div className="SignupCont_inside">
            <img alt="logo" id="logo" src={WhatsApp} />
            <h2>Sign up</h2>
            {error && <p className="error_msg">{error}</p>}
            <form id="Signup_form" onSubmit={(e) => handleSignup(e)}>
                <label>
                Full Name
                <br />
                <input ref={fullNameRef} id="fullname" className="Signup_input" type="text" />
                </label>
                <br />

                <label>
                Email
                <br />
                <input ref={emailRef} id="email" className="Signup_input" type="email" />
                </label>
                <br />

                <label>
                Password
                <br />
                <input ref={passwordRef} id="password" className="Signup_input" type="password" />
                </label>
                <br />

                <label>
                Confirm Password
                <br />
                <input id="password_c" className="Signup_input" type="password" />
                </label>

                <button disabled={loading} id="Signin_btn" className="Signup_input" type="submit" >Sign up</button>
            </form>

            {/*Social login button*/}
            <div>
                <button className="log_in_btn" type="button"><FontAwesomeIcon icon={faGoogle} /> Log in with Google</button>
                <button className="log_in_btn" type="button" onClick={()=>history.push('/Login')}><FontAwesomeIcon icon={faUserPlus}/> Log in with email</button>
            </div>
        </div>
    </div>
    )

}

export default Signup;

