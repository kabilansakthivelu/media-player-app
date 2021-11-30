 import React, {useContext} from 'react';
import {ValuesContext} from '../../App';
import {FcGoogle} from 'react-icons/fc';
import {AiOutlineMail, AiOutlineLock} from 'react-icons/ai';
import {useHistory} from 'react-router-dom';
import firebase from 'firebase/compat/app';
import {auth, db} from '../../firebase';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignIn.css';

toast.configure();

const SignIn = () => {

    const {refEmail, refPassword} = useContext(ValuesContext);

    const history = useHistory();

    let userFirstName = "";

    const googleSignIn = async() =>{
        let provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
        history.push("/");
        const name = auth.currentUser.displayName.split(" ");
        const firstName = name[0];
        toast.success(`Hi ${firstName}, Welcome to the World of Music!!`, {position: toast.POSITION.TOP_CENTER})
    }

    const signIn = async(e) =>{
        e.preventDefault();
        const email = refEmail.current.value;
        const password = refPassword.current.value;
        try{
            await firebase.auth().signInWithEmailAndPassword(email, password);
            await db.collection('users').doc(auth.currentUser.uid).get().then((snapshot)=>{
                const userDetails = snapshot.data();
                const userName = userDetails.name;;
                const userName1 = userName.split(" ");
                userFirstName = userName1[0];
            })
            history.push("/");
            toast.success(`Welcome back ${userFirstName} to the World of Music!!`, {position: toast.POSITION.TOP_CENTER})
        }
        catch(error){
            let error1 = error.message.split(":");
            let error2 = error1[1].split("(");
            toast.error(error2[0], {position: toast.POSITION.TOP_CENTER});
        }
    }

    const guestLogin = () =>{
        const email = process.env.REACT_APP_Guest_Email;
        const password = process.env.REACT_APP_Guest_Password;
        firebase.auth().signInWithEmailAndPassword(email, password);
        history.push("/");
        toast.success(`Welcome back Guest, to the World of Music!!`, {position: toast.POSITION.TOP_CENTER});
    }

    return (
        <div className="signInDiv">
            <div className="signInContent">
                <h1 className="title">Music World</h1>
                <h1 className="subTitle">Explore the world of music</h1>
                <div className="googleSignInDiv" onClick={guestLogin}>
                <h1 className="signInPageText">Guest Login</h1>
                </div>
                <div className="googleSignInDiv" onClick={googleSignIn}>
                <FcGoogle className="googleIcon"/>
                <h1 className="signInPageText">Continue with Google</h1>
                </div>
                <p className="description">or</p>

            <form className="loginForm" onSubmit={signIn}>

            <div className="inputFieldDiv">
            <AiOutlineMail className="inputFieldIcon"/>
            <input className="inputField" required ref={refEmail} type="email" name="email" id="email" placeholder="Email" />
            </div>

            <div className="inputFieldDiv">
            <AiOutlineLock className="inputFieldIcon"/>
            <input className="inputField" required ref={refPassword} type="password" name="password" id="password" placeholder="Password"/>
            </div>

            <div className="btnSection">
            <button className="signInBtn">Sign In</button>
            <button className="registerBtn" onClick={()=>{history.push("/signup")}}>Register</button>
            </div>

            </form>

            </div>
            <div className="signInImage">
                
            </div>
        </div>
    )
}

export default SignIn
