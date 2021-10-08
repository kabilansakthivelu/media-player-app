import React, {useState, useEffect} from 'react';
import {AiFillHome, AiFillHeart, AiOutlineLogout, AiOutlineSearch} from 'react-icons/ai';
import {Link, useHistory} from 'react-router-dom';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import './Navbar.css';

toast.configure();

const Navbar = () => {

    const [screen, setScreen] = useState();

    const history  = useHistory();

    const screenSize = () =>{
        if(window.innerWidth < 768){
            setScreen("smallScreen");
        }
        else{
            setScreen("largeScreen");
        }
    }

    useEffect(()=>{
        screenSize();
        window.addEventListener('resize', screenSize);
        return(()=>{
            window.removeEventListener('resize', screenSize);
        })
    },[])

    const logOut = () => {
        auth.signOut();
        history.push("/signin");
        toast.success("Logged out successfully", {position: toast.POSITION.TOP_CENTER})
    }

    return (
        <div className={screen}>
        <h1 className="header" onClick={()=>history.push("/")}>Music World</h1>
        <div className="navbar-icons">
            <Link id="1" to="/"><AiFillHome/></Link>
            <Link id="2" to="/search"><AiOutlineSearch/></Link>
            <Link id="3" to="/favorites"><AiFillHeart/></Link>
            <AiOutlineLogout onClick={logOut}/>
        </div>
        </div>
    )
}

export default Navbar
