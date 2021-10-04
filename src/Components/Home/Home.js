import React, {useState, useEffect} from 'react';
import Navbar from '../Navbar/Navbar';
import {db, auth} from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import SignIn from '../SignIn/SignIn';
import './Home.css';

const Home = () => {

    const [user] = useAuthState(auth);

    const [songsList, setSongsList] = useState();

    useEffect(()=>{
        db.collection('songs').onSnapshot((snapshot)=>{
        const arr = [];
        snapshot.forEach((doc)=>{
            arr.push(doc.data());
        })
        setSongsList(arr);
        })      
    },[])

    return (
        <div>
            {user ? (
            <div> 
            <Navbar/>
            <div className="songsSection">
            <h1 className="sectionTitle">Discover your day</h1>
            <div className="songsDisplay">
            {songsList.map((song)=>{
                return(
                    <div key={song.id} className="singleSong">
                    <img src={song.imageURL} alt="" className="songImage"/>
                    <div className="songInfo">
                    <h1 className="songTitle">{song.title}</h1>
                    <h1 className="songArtist">{song.artists}</h1>
                    </div>
                    </div>
                )
            })}
            </div>
            </div>
            </div>
            )
            :
            <SignIn/>
            }
        </div>
    )
}

export default Home
