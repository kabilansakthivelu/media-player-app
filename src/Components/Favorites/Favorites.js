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

    const [favoritesList1, setFavoritesList1] = useState();

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
        db.collection('favorites').doc(auth.currentUser.uid).collection('songs').get().then((snapshot)=>{
            const arr = [];
            snapshot.forEach((doc)=>{
                arr.push(doc.data());
            })
            setFavoritesList1(arr);
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
            test()
        }}
    },[showPlayer])

    const test = () =>{
    if(showPlayer === false){
        db.collection('favorites').doc(auth.currentUser.uid).collection('songs').onSnapshot((snapshot)=>{
            const arr = [];
            snapshot.forEach((doc)=>{
                arr.push(doc.data());
            })
            const arr1 = arr.map((doc)=>{
                return doc.title;
            })
            const arr2 = favoritesList1.filter((song)=>{
                    return arr1.includes(song.title);
                })
            for(let i=0; i<arr2.length; i++){
                arr2[i].id = i+1;
            }
            setFavoritesList1(arr2);
        })
    }
    }

    return (
        <div>
            {user ? (
            <div> 
            <Navbar/>
            <div className="favoritesSection" id="songsSection">
            <h1 className="sectionTitle">Favorites</h1>
            <div className="favoritesDisplay" id="songDisplay">

            {favoritesList &&
            ((favoritesList.length !== 0)
            ?
            (favoritesList.map((song)=>{
                return(
                    <div key={song.id} className="singleSong">
                    <img src={song.imageURL} alt="" className="songImage" onClick={()=>{openPlayer(song.id)}}/>
                    <div className="songInfo">
                    <h1 className="songTitle">{song.title}</h1>
                    <h1 className="songArtist">{song.artists}</h1>
                    </div>
                    </div>
                )
            }))
            :
            (<h1 className="sectionDescription">You don't have any songs marked as favorites</h1>)
            )
            }

            </div>
            </div>
            {showPlayer && <Player songsList={favoritesList1} nowPlayingSongId={nowPlayingSongId} setNowPlayingSongId={setNowPlayingSongId}/>}
            </div>
            )
            :
            <SignIn/>
            }
        </div>
    )
}

export default Favorites
