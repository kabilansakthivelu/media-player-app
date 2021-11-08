import React, {useState, useEffect, useContext} from 'react';
import Navbar from '../Navbar/Navbar';
import Player from '../Player/Player';
import {ValuesContext} from '../../App';
import {auth} from '../../firebase';
import SignIn from '../SignIn/SignIn';
import {useAuthState} from 'react-firebase-hooks/auth';
import {toast} from 'react-toastify';
import './Search.css';

toast.configure();

const Search = () => {

    const [user] = useAuthState(auth);

    const {songsList, showPlayer, setShowPlayer, nowPlayingSongId, setNowPlayingSongId, openPlayer} = useContext(ValuesContext);

    const [searchResult, setSearchResult] = useState([]);

    const [isSearchKeyEntered, setIsSearchKeyEntered] = useState(false);

    useEffect(()=>{
        setShowPlayer(false);
    },[])

    const searchInput = async(e) =>{
        setShowPlayer(false);
        let searchKey = e.target.value;
        if(searchKey === ""){
           setSearchResult([]);
           setIsSearchKeyEntered(false); 
        }else{
        setIsSearchKeyEntered(true);
        let searchResult1 = songsList.filter((song)=>{
            return song.title.toLowerCase().includes(searchKey.toLowerCase());
        })
        let num = 0;
        searchResult1 = searchResult1.map((song)=>{
            num++;
            song.id = num;
            return {...song};
        })
        setSearchResult(searchResult1)
        }
    }

    return (
        <div>
            {user ? (
            <div> 
            <Navbar/>
            <div className="favoritesSection" id="songsSection">
            <h1 className="sectionTitle">Search</h1>

            <div className="searchInputDiv">
                <input className="searchInput" id="searchInput" type="text" placeholder="Enter track name..." onChange={searchInput}/>
            </div>

            {searchResult.length !== 0 && <h1 className="resultHeading">Search result/s</h1>}
            
            {(searchResult &&
            (searchResult.length !== 0))
            ?
            (<div className="resultsDisplay" id="songDisplay">
                {searchResult.map((song)=>{
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
            </div>)
            :
            (isSearchKeyEntered)
            ?
            (<h1 className="searchPageDescription">No matching result/s</h1>)
            :
            (<h1 className="searchPageDescription">Enter the track name to find your desired song...</h1>)
            }

            </div>
            {showPlayer && <Player songsList={searchResult} nowPlayingSongId={nowPlayingSongId} setNowPlayingSongId={setNowPlayingSongId}/>}
            </div>
            )
            :
            <SignIn/>
            }
        </div>
    )
}

export default Search
