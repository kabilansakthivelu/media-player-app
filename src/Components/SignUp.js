import React,{useContext, useRef} from 'react';
import {AiOutlineMail, AiOutlineLock} from 'react-icons/ai';
import {FaUser} from 'react-icons/fa';
import firebase from 'firebase/compat/app';
import {db, auth} from '../firebase';
import {useHistory} from 'react-router-dom';
import {ValuesContext} from '../App';
import {toast} from 'react-toastify';
import './SignIn/SignIn.css';

toast.configure();

const SignUp = () => {

    const {refEmail, refPassword} = useContext(ValuesContext);

    const refUsername = useRef();

    const history = useHistory();

    let userFirstName = "";

    const signup = async(e) =>{
        e.preventDefault();
        const username = refUsername.current.value;
        const email = refEmail.current.value;
        const password = refPassword.current.value;
        if(username[0]=== " "){
            toast.error("Please don't start with 'SPACE'. Enter a valid username.", {position: toast.POSITION.TOP_CENTER});
        }
        else
        {
        try{
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            await db.collection('users').doc(auth.currentUser.uid).set({name:username});
            await db.collection('users').doc(auth.currentUser.uid).get().then((snapshot)=>{
                const userDetails = snapshot.data();
                const userName = userDetails.name;;
                const userName1 = userName.split(" ");
                userFirstName = userName1[0];
            });
            history.push("/");
            toast.success(`Hi ${userFirstName}, Welcome to the World of Music !!`, {position: toast.POSITION.TOP_CENTER});
        }
        catch(error){
            let error1 = error.message.split(":");
            let error2 = error1[1].split("(");
            toast.error(error2[0], {position: toast.POSITION.TOP_CENTER});
        }
        }
    }

    return (
        <div className="signInDiv">
            <div className="signInContent">
                <h1 className="title">Music World</h1>
                <h1 className="subTitle">Explore the world of music</h1>
                <p className="description">Create a new Account</p>

            <form className="loginForm" onSubmit={signup}>

            <div className="inputFieldDiv">
            <FaUser className="inputFieldIcon"/>
            <input className="inputField" required ref={refUsername} type="text" name="username" id="username" placeholder="Username"/>
            </div>

            <div className="inputFieldDiv">
            <AiOutlineMail className="inputFieldIcon"/>
            <input className="inputField" required ref={refEmail} type="email" name="email" id="email" placeholder="Email" />
            </div>

            <div className="inputFieldDiv">
            <AiOutlineLock className="inputFieldIcon"/>
            <input className="inputField" required ref={refPassword} type="password" name="password" id="password" placeholder="Password"/>
            </div>

            <div className="btnSection">
            <button className="signInBtn">Sign Up</button>
            <button className="registerBtn" onClick={()=>{history.push("/signin")}}>Sign In</button>
            </div>

            </form>

            </div>
            <div className="signInImage"> 
            </div>
        </div>
    )
}

export default SignUp
