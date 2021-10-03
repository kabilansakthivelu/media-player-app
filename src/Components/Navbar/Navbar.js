import React, {useState, useEffect} from 'react';
import {AiFillHome, AiFillHeart, AiOutlineLogout} from 'react-icons/ai';
import {BiHeadphone} from 'react-icons/bi';
import {Link, useHistory} from 'react-router-dom';
import {auth} from '../../firebase';
import './Navbar.css';

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
    }

    return (
        <div className={screen}>
        <h1 className="header">Music World</h1>
        <div className="icons">
            <Link to="/"><AiFillHome/></Link>
            <Link to="/playlists"><BiHeadphone/></Link>
            <Link to="/favorites"><AiFillHeart/></Link>
            <AiOutlineLogout onClick={logOut}/>
        </div>
        </div>
    )
}

export default Navbar
