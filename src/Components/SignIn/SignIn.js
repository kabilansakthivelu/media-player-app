import React from 'react';
import {FcGoogle} from 'react-icons/fc';
import {AiOutlineMail, AiOutlineLock} from 'react-icons/ai';
import './SignIn.css';

const SignIn = () => {
    return (
        <div className="signInDiv">
            <div className="signInContent">
                <h1 className="title">Music World</h1>
                <h1 className="subTitle">Explore the world of music</h1>
                <div className="googleSignInDiv">
                <FcGoogle className="googleIcon"/>
                <h1>Continue with Google</h1>
                </div>
                <p className="description">or</p>

                <form className="loginForm">

            <div className="inputFieldDiv">
            <AiOutlineMail className="inputFieldIcon"/>
            <input className="inputField" required type="email" name="email" id="email" placeholder="Email" />
            </div>

            <div className="inputFieldDiv">
            <AiOutlineLock className="inputFieldIcon"/>
            <input className="inputField" required type="password" name="password" id="password" placeholder="Password"/>
            </div>

            <div className="btnSection">
            <button className="signInBtn">Sign In</button>
            <button className="registerBtn">Register</button>
            </div>

            </form>

            </div>
            <div className="signInImage">
                
            </div>
        </div>
    )
}

export default SignIn
