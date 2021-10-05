import React, {useEffect, useContext, useState} from 'react';
import {BiArrowBack} from 'react-icons/bi';
import {FaPlay, FaPause} from 'react-icons/fa';
import {AiFillStepBackward, AiFillStepForward} from 'react-icons/ai';
import {ValuesContext} from '../../App';
import './Player.css';

const Player = (props) => {

    const {showPlayer, setShowPlayer} = useContext(ValuesContext);

    let {songsList, nowPlayingSongId, setNowPlayingSongId} = props;

    let nowPlaying = [];

    let nextUpSong = [];

    let nextUpFinder;

    const [nextUpTitle, setNextUpTitle] = useState();
     
    if(songsList !== undefined){
     nowPlaying = songsList.find((song)=>{
            return song.id === nowPlayingSongId;
    })
    }

    useEffect(()=>{
        if(songsList){
        if(showPlayer){
        document.getElementById('playButton').play();
        document.getElementById('pauseBtn').style.display = "block";
        document.getElementById('playBtn').style.display = "none";
        document.getElementById('playButton').addEventListener('ended', nextTrack);
        if(nowPlayingSongId === songsList.length){
            nextUpFinder = 1;
            nextUpSong = songsList.find((song)=>{
            return song.id === nextUpFinder;
            })
            setNextUpTitle(nextUpSong.title);
        }
        else
        {
            nextUpFinder = nowPlayingSongId+1;
            nextUpSong = songsList.find((song)=>{
            return song.id === nextUpFinder;
            })
            setNextUpTitle(nextUpSong.title);
        }
        }
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
        if(nowPlayingSongId === songsList.length){
            setNowPlayingSongId(1)
        }else{
        setNowPlayingSongId(nowPlayingSongId + 1)
        }
    }

    return (
        <div>
        {nowPlaying ? (
        <div className="musicPlayerSection">
        <div className="musicPlayer">
            <div className="playerHeader">
            <BiArrowBack className="backArrow" onClick={()=>{setShowPlayer(false)}}/>
            <h1 className="playerTitle">Now Playing</h1>
            </div>
            <img src={nowPlaying.imageURL} alt="" className="playerImage"/>
            <h1 className="playerSongTitle">{nowPlaying.title}</h1>
            <h1 className="playerSongArtist">{nowPlaying.artists}</h1>

            <audio src={nowPlaying.source} id="playButton"></audio>

            <div className="playerIcons">
            <AiFillStepBackward className="playerIconsInd" onClick={previousTrack}/>
            <FaPause className="playerIconsInd" id="pauseBtn" onClick={pauseFn}/>
             <FaPlay className="playBtn" id="playBtn" onClick={playFn}/>
            <AiFillStepForward className="playerIconsInd" onClick={nextTrack}/>
            </div>

            <h1 className="nextUp">Next up: {nextUpTitle}</h1>
        </div>
        </div>)
        :
        ""
        }
    </div>)
}

export default Player
