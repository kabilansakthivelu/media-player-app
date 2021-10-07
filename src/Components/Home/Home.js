import React, {useState, useEffect, useContext} from 'react';
import Navbar from '../Navbar/Navbar';
import {db, auth} from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import SignIn from '../SignIn/SignIn';
import Player from '../Player/Player';
import {ValuesContext} from '../../App';
import './Home.css';

const Home = () => {

    const [user] = useAuthState(auth);

    const {showPlayer, setShowPlayer, nowPlayingSongId, setNowPlayingSongId, openPlayer} = useContext(ValuesContext);

    const [songsList, setSongsList] = useState();

    useEffect(()=>{
        setShowPlayer(false);
        db.collection('songs').onSnapshot((snapshot)=>{
        const arr = [];
        snapshot.forEach((doc)=>{
            arr.push(doc.data());
        })
        setSongsList(arr);
        })      
    },[])

    useEffect(()=>{
        if(user){
        if(showPlayer){
            document.getElementById('songsSection').style.width = "73%";
            document.getElementById('songDisplay').style.justifyContent = "space-around"
        }
        else{
            document.getElementById('songsSection').style.width = "100%";
            document.getElementById('songDisplay').style.justifyContent = "space-around"
        }
        }
    },[showPlayer])

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
                    <img src={song.imageURL} alt="" className="songImage" onClick={()=>{openPlayer(song.id)}}/>
                    <div className="songInfo">
                    <h1 className="songTitle">{song.title}</h1>
                    <h1 className="songArtist">{song.artists}</h1>
                    </div>
                    </div>
                )
            })}
            </div>
            </div>
            {showPlayer && <Player songsList={songsList} nowPlayingSongId={nowPlayingSongId} setNowPlayingSongId={setNowPlayingSongId}/>}
            </div>
            )
            :
            <SignIn/>
            }
        </div>
    )
}

export default Home
