import React, {useEffect, useContext} from 'react';
import {BiArrowBack} from 'react-icons/bi';
import {FiPause, FiPlay} from 'react-icons/fi';
import {BsSkipBackward, BsSkipForward} from 'react-icons/bs';
import {ValuesContext} from '../../App';
import './Player.css';

const Player = (props) => {

    const {showPlayer, setShowPlayer} = useContext(ValuesContext);

    let {songsList, nowPlayingSongId, setNowPlayingSongId} = props;

    let nowPlaying = [];
     
    if(songsList !== undefined){
     nowPlaying = songsList.find((song)=>{
            return song.id === nowPlayingSongId;
    })
    }

    useEffect(()=>{
        if(showPlayer){
        document.getElementById('playButton').play();
        document.getElementById('pauseBtn').style.display = "block";
        document.getElementById('playBtn').style.display = "none";
        document.getElementById('playButton').addEventListener('ended', nextTrack);
        }
    },[nowPlaying])

    const pauseFn = () =>{
        document.getElementById('playButton').pause();
        document.getElementById('pauseBtn').style.display = "none";
        document.getElementById('playBtn').style.display = "block";
    }

    const playFn = () =>{
        document.getElementById('playButton').play();
        document.getElementById('pauseBtn').style.display = "block";
        document.getElementById('playBtn').style.display = "none";
    }

    const previousTrack = () =>{
        if(nowPlayingSongId === 1){
            setNowPlayingSongId(songsList.length)
        }else{
        setNowPlayingSongId(nowPlayingSongId - 1)
        }
    }

    const nextTrack = () =>{
        if(nowPlayingSongId === 12){
            setNowPlayingSongId(1)
        }else{
        setNowPlayingSongId(nowPlayingSongId + 1)
        }
    }

    return (
        <div>
        {nowPlaying ? (
        <div className="musicPlayer">
            <div className="playerHeader">
            <BiArrowBack className="backArrow" onClick={()=>{setShowPlayer(false)}}/>
            <h1 className="playerTitle">Now Playing</h1>
            </div>
            <img src={nowPlaying.imageURL} alt="" className="playerImage"/>
            <h1 className="playerSongTitle">{nowPlaying.title}</h1>
            <h1 className="playerSongArtist">{nowPlaying.artists}</h1>

            <audio src={nowPlaying.source} id="playButton" controls></audio>

            <div className="playerIcons">
            <BsSkipBackward className="playerIconsInd" onClick={previousTrack}/>
            <FiPause className="playerIconsInd" id="pauseBtn" onClick={pauseFn}/>
             <FiPlay className="playBtn" id="playBtn" onClick={playFn}/>
            <BsSkipForward className="playerIconsInd" onClick={nextTrack}/>
            </div>

        </div>)
        :
        ""
        }
    </div>)
}

export default Player
