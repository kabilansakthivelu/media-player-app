import React from 'react';
import {AiOutlineMail, AiOutlineLock} from 'react-icons/ai';
import {FaUser} from 'react-icons/fa';
import '../SignIn/SignIn.css';

const SignUp = () => {
    return (
        <div className="signInDiv">
            <div className="signInContent">
                <h1 className="title">Music World</h1>
                <h1 className="subTitle">Explore the world of music</h1>
                <p className="description">Create a new Account</p>

            <form className="loginForm">

            <div className="inputFieldDiv">
            <FaUser className="inputFieldIcon"/>
            <input className="inputField" required type="text" name="username" id="username" placeholder="Username"/>
            </div>

            <div className="inputFieldDiv">
            <AiOutlineMail className="inputFieldIcon"/>
            <input className="inputField" required type="email" name="email" id="email" placeholder="Email" />
            </div>

            <div className="inputFieldDiv">
            <AiOutlineLock className="inputFieldIcon"/>
            <input className="inputField" required type="password" name="password" id="password" placeholder="Password"/>
            </div>

            <div className="btnSection">
            <button className="signInBtn">Sign Up</button>
            <button className="registerBtn">Sign In</button>
            </div>

            </form>

            </div>
            <div className="signInImage"> 
            </div>
        </div>
    )
}

export default SignUp
