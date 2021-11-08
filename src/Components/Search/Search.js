import React, {useState, useEffect, useContext} from 'react';
import Navbar from '../Navbar/Navbar';
import Player from '../Player/Player';
import {ValuesContext} from '../../App';
import {db, auth} from '../../firebase';
import SignIn from '../SignIn/SignIn';
import {useAuthState} from 'react-firebase-hooks/auth';
import {toast} from 'react-toastify';
import './Search.css';

toast.configure();

const Search = () => {

    const [user] = useAuthState(auth);

    const {songsList, showPlayer, setShowPlayer, nowPlayingSongId, setNowPlayingSongId, openPlayer} = useContext(ValuesContext);

    const [searchResult, setSearchResult] = useState([]);

    useEffect(()=>{
        setShowPlayer(false);
    },[])

    const searchInput = async(e) =>{
        setShowPlayer(false);
        let searchKey = e.target.value;
        if(searchKey === ""){
           setSearchResult([]); 
        }else{
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

    const searchSubmit = (e) =>{
        e.preventDefault();
        let searchKey = document.getElementById('searchInput').value;
        const ans = songsList.filter((song)=>{
            return song.title.toLowerCase().includes(searchKey.toLowerCase());
        })
                setSearchResult(ans);
                setShowPlayer(false); 
    }

    return (
        <div>
            {user ? (
            <div> 
            <Navbar/>
            <div className="favoritesSection" id="songsSection">
            <h1 className="sectionTitle">Search</h1>

            <form onSubmit={searchSubmit} className="searchInputDiv">
                <input className="searchInput" id="searchInput" type="text" placeholder="Enter track name..." onChange={searchInput}/>
            </form>

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
                    {console.log(searchResult)}
                    </div>
                    </div>
                )
            })}
            </div>)
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
