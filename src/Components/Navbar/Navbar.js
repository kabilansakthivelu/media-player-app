import React, {useState, useEffect} from 'react';
import {AiFillHome, AiFillHeart, AiOutlineLogout} from 'react-icons/ai';
import {BiHeadphone} from 'react-icons/bi';
import './Navbar.css';

const Navbar = () => {

    const [screen, setScreen] = useState();

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

    return (
        <div className={screen}>
        <div className="icons">
            <AiFillHome/>
            <BiHeadphone/>
            <AiFillHeart/>
            <AiOutlineLogout/>
        </div>
        </div>
    )
}

export default Navbar
