import React, {useState, useEffect} from 'react';
import {AiFillHome, AiFillHeart, AiOutlineLogout} from 'react-icons/ai';
import {BiHeadphone} from 'react-icons/bi';
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

    const navbarIconSelected = (id) =>{
        for(let i=1;i<=3;i++){
            document.getElementById(i).style.color = "white";
        }
        if((document.getElementById(id).style.color === "white") || (document.getElementById(id).style.color === "")){
        document.getElementById(id).style.color = "red";
        }
    }

    return (
        <div className={screen}>
        <h1 className="header">Music World</h1>
        <div className="navbar-icons">
            <Link id="1" to="/"><AiFillHome onClick={()=>{navbarIconSelected(document.getElementById(1).id)}}/></Link>
            <Link id="2" to="/playlists"><BiHeadphone onClick={()=>{navbarIconSelected(document.getElementById(2).id)}}/></Link>
            <Link id="3" to="/favorites"><AiFillHeart onClick={()=>{navbarIconSelected(document.getElementById(3).id)}}/></Link>
            <AiOutlineLogout onClick={logOut}/>
        </div>
        </div>
    )
}

export default Navbar
