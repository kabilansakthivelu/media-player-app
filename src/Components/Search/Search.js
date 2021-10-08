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

    const [searchList, setSearchList] = useState();

    const [searchResult, setSearchResult] = useState([]);
    
    const searchResultClicked = (id) =>{
        setShowPlayer(false);
        db.collection('songs').get().then((snapshot)=>{
        const arr = [];
        snapshot.forEach((doc)=>{
            arr.push(doc.data());
        })
        const arr1 = arr.filter((doc)=>{
            return doc.id === id;
        })
        arr1[0].id = 1;
        document.getElementById('searchInput').value = arr1[0].title;
        setSearchList(arr1);
        })     
        setSearchResult([]);  
    }

    useEffect(()=>{
        setShowPlayer(false);
    },[])

    const searchInput = async(e) =>{
        let searchKey = e.target.value;
        if(searchKey === ""){
           setSearchResult([]); 
        }else{
        setSearchResult(songsList.filter((song)=>{
            return song.title.toLowerCase().includes(searchKey.toLowerCase());
        }))
        }
    }

    const searchSubmit = (e) =>{
        e.preventDefault();
        let searchKey = document.getElementById('searchInput').value;
        const ans = songsList.find((song)=>{
            return song.title.toLowerCase() === searchKey.toLowerCase();
        })
        if(ans === undefined){
                setSearchResult([]);
                toast.warning("Enter a valid track name or choose from the suggestions", {position: toast.POSITION.TOP_CENTER})
            }
            else{
                let arr1 = [];
                arr1.push(ans);
                arr1[0].id = 1;
                document.getElementById('searchInput').value = arr1[0].title;
                setSearchList(arr1);
                setSearchResult([]);
                setShowPlayer(false); 
            }
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
            
            {(searchResult.length !== 0) &&
            <div className="searchResultsDiv">
            {searchResult && searchResult.map((song)=>{
                return (
                <div key={song.id}>
                <h1 className="trackName" onClick={()=>{searchResultClicked(song.id)}}>{song.title}</h1>
                </div>
                )
            })}
            </div>
            }

            <div className="resultsDisplay" id="songDisplay">
            
            {(searchList &&
            (searchList.length !== 0))
            ?
            (searchList.map((song)=>{
                return(
                    <div key={song.id} className="singleSong">
                    <h1 className="resultHeading">Search result</h1>
                    <img src={song.imageURL} alt="" className="songImage" onClick={()=>{openPlayer(song.id)}}/>
                    <div className="songInfo">
                    <h1 className="songTitle">{song.title}</h1>
                    <h1 className="songArtist">{song.artists}</h1>
                    </div>
                    </div>
                )
            }))
            :
            (<h1 className="searchPageDescription">Enter the track name to find your desired song...</h1>)
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
