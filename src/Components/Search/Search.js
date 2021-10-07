import React, {useState, useEffect, useContext} from 'react';
import Navbar from '../Navbar/Navbar';
import Player from '../Player/Player';
import {ValuesContext} from '../../App';
import {db, auth} from '../../firebase';
import SignIn from '../SignIn/SignIn';
import {useAuthState} from 'react-firebase-hooks/auth';
import './Search.css'

const Search = () => {

    const [user] = useAuthState(auth);

    const {songsList, showPlayer, setShowPlayer, nowPlayingSongId, setNowPlayingSongId, openPlayer} = useContext(ValuesContext);

    const [searchList, setSearchList] = useState();
    
    const searchResultClicked = (id) =>{
        db.collection('songs').get().then((snapshot)=>{
        const arr = [];
        snapshot.forEach((doc)=>{
            arr.push(doc.data());
        })
        const arr1 = arr.filter((doc)=>{
            return doc.id === id;
        })
        arr1[0].id = 1;
        setSearchList(arr1);
        })       
    }

    useEffect(()=>{
        setShowPlayer(false);
    },[])

    return (
        <div>
            {user ? (
            <div> 
            <Navbar/>
            <div className="favoritesSection" id="songsSection">
            <h1 className="sectionTitle">Search</h1>

            <div className="searchInputDiv">
                <input className="searchInput" type="text" placeholder="Enter track name..." />
            </div>

            <div className="searchResultsDiv">
            {songsList && songsList.map((song)=>{
                return (
                <div key={song.id}>
                <h1 className="trackName" onClick={()=>{searchResultClicked(song.id)}}>{song.title}</h1>
                </div>
                )
            })}
            </div>


            <div className="songsDisplay" id="songDisplay">
            
            {searchList &&
            ((searchList.length !== 0)
            ?
            (searchList.map((song)=>{
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
            {showPlayer && <Player songsList={searchList} nowPlayingSongId={nowPlayingSongId} setNowPlayingSongId={setNowPlayingSongId}/>}
            </div>
            )
            :
            <SignIn/>
            }
        </div>
    )
}

export default Search
