import React, {useState, useEffect, useContext} from 'react';
import Navbar from '../Navbar/Navbar';
import Player from '../Player/Player';
import {ValuesContext} from '../../App';
import {db, auth} from '../../firebase';
import SignIn from '../SignIn/SignIn';
import {useAuthState} from 'react-firebase-hooks/auth';
import './Favorites.css'

const Favorites = () => {

    const [user] = useAuthState(auth);

    const {showPlayer, setShowPlayer, nowPlayingSongId, setNowPlayingSongId, openPlayer} = useContext(ValuesContext);

    const [favoritesList, setFavoritesList] = useState();

     useEffect(()=>{
         if(user){
        setShowPlayer(false);
         db.collection('favorites').doc(auth.currentUser.uid).collection('songs').onSnapshot((snapshot)=>{
            const arr = [];
            snapshot.forEach((doc)=>{
                arr.push(doc.data());
            })
            setFavoritesList(arr);
        })  
         }
    },[user])

    useEffect(()=>{
        if(favoritesList){
        if(showPlayer){
            document.getElementById('songsSection').style.width = "73%";
        }
        else{
            document.getElementById('songsSection').style.width = "100%";
        }
        }
    },[showPlayer])

    return (
        <div>
            {user ? (
            <div> 
            <Navbar/>
            <div className="songsSection" id="songsSection">
            <h1 className="sectionTitle">Favorites</h1>
            <div className="favoritesDisplay" id="songDisplay">
            {favoritesList && favoritesList.map((song)=>{
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
            {showPlayer && <Player songsList={favoritesList} nowPlayingSongId={nowPlayingSongId} setNowPlayingSongId={setNowPlayingSongId}/>}
            </div>
            )
            :
            <SignIn/>
            }
        </div>
    )
}

export default Favorites
