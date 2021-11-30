import React, {useEffect, useContext, useState} from 'react';
import Navbar from '../Navbar/Navbar';
import {auth} from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import SignIn from '../SignIn/SignIn';
import Player from '../Player/Player';
import {ValuesContext} from '../../App';
import './Home.css';

const Home = () => {

    const [user] = useAuthState(auth);

    const [playerOpen, setPlayerOpen] = useState(false);

    const {songsList, showPlayer, setShowPlayer, nowPlayingSongId, setNowPlayingSongId, openPlayer} = useContext(ValuesContext);

    useEffect(()=>{
        if(user){
        if(showPlayer && playerOpen){
            document.getElementById('songsSection').style.width = "73%";
            document.getElementById('songDisplay').style.justifyContent = "space-around"
        }
        else{
            document.getElementById('songsSection').style.width = "100%";
            document.getElementById('songDisplay').style.justifyContent = "space-around"
        }
        }
    },[playerOpen])

    const openPlayerCheck = (id) =>{
        openPlayer(id);
        setPlayerOpen(true);
    }

    return (
        <div>
            {user ? (
            <div> 
            <Navbar/>
            <div className="songsSection" id="songsSection">
            <h1 className="sectionTitle">Discover your day</h1>
            <div className="songsDisplay" id="songDisplay">
            {songsList && songsList.map((song)=>{
                return(
                    <div key={song.id} className="singleSong">
                    <img src={song.imageURL} alt="" className="songImage" onClick={()=>{openPlayerCheck(song.id)}}/>
                    <div className="songInfo">
                    <h1 className="songTitle">{song.title}</h1>
                    <h1 className="songArtist">{song.artists}</h1>
                    </div>
                    </div>
                )
            })}
            </div>
            </div>
            {((showPlayer === true)&&(playerOpen === true)) ? <Player songsList={songsList} nowPlayingSongId={nowPlayingSongId} setNowPlayingSongId={setNowPlayingSongId}/> : ""}
            </div>
            )
            :
            <SignIn/>
            }
        </div>
    )
}

export default Home
