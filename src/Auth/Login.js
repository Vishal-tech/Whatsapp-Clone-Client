import React,{useState, useRef} from 'react';
import "./Login_Signin.css"
import WhatsApp from "../images/WhatsApp.png"

import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import {faUserPlus} from '@fortawesome/free-solid-svg-icons'

function Login(){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();
    const { signin } = useAuth();

    const handleSignin = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signin(email, password)
          .then((ref) => {
            setLoading(false);
            history.push('/');
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
          });
      };

    return(
    <div className="loginCont">
        <div className="loginCont_inside">
            <img alt="logo" id="logo" src={WhatsApp} />
            <h2>Log in</h2>
            {error && <p className="error_msg">{error}</p>}
            <form id="login_form" onSubmit={(e) => handleSignin(e)}>
                <label>
                Email
                <br />
                <input ref={emailRef} id="email" className="login_input" type="email" />
                </label>
                <br />

                <label>
                Password
                <br />
                <input ref={passwordRef} id="password" className="login_input" type="password" />
                </label>
                <br />
                <button disabled={loading} id="log_btn" className="login_input" type="submit" >Log in</button>
            </form>

            {/*Social login button*/}
            <div>
                <button className="sign_in_btn" type="button"><FontAwesomeIcon icon={faGoogle} /> Sign in with Google</button>
                <button className="sign_in_btn" type="button" onClick={()=>history.push('/Signup')}><FontAwesomeIcon icon={faUserPlus}/> Sign up with email</button>
            </div>
        </div>
    </div>
    )
}
export default Login;
