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
        document.getElementById('progressedTime').innerHTML = "0.00";
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

    const progressedMusic = (event) =>{

        let duration1 = document.getElementById('trackDuration').innerHTML;
        let duration2 = duration1.split(":");
        let duration3 = parseInt(duration2[0]*60);
        let duration4 = parseInt(duration2[1]);
        let duration = duration3 + duration4;

        const audio = document.getElementById('playButton');
        let timePlayed1 = audio.currentTime;
        let timePlayed2 = timePlayed1.toString();
        let timePlayed3 = timePlayed2.split(".");
        let timePlayed = timePlayed3[0];
        if (timePlayed < 10){
        document.getElementById('progressedTime').innerHTML = `0:0${timePlayed}`;
        }
        else if((timePlayed >= 10) && (timePlayed <= 59))
        {
            document.getElementById('progressedTime').innerHTML = `0:${timePlayed}`;
        }
        else
        {
            let timePlayed4 = parseInt(timePlayed);
            let minutes1 = timePlayed4/60;
            let seconds = timePlayed4%60;
            let minutes2 = minutes1.toString();
            let minutes3 = minutes2.split(".");
            let minutes = minutes3[0];
            if (seconds < 10){
             document.getElementById('progressedTime').innerHTML = `${minutes}:0${seconds}`;
            }
            else if((seconds >= 10) && (seconds <= 59))
            {   
            document.getElementById('progressedTime').innerHTML = `${minutes}:${seconds}`;
            }
        }

        let timeProgressed = parseInt(timePlayed);
        let calc = (timeProgressed / duration)*100;
        document.getElementById('progressed').style.width = `${Math.round(calc)}%`;
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

            <audio src={nowPlaying.source} id="playButton" onTimeUpdate={progressedMusic}></audio>

            <div className="progressBarDiv">
            <h1 id="progressedTime"></h1>
            <div className="progressBar">
            <div className="progressed" id="progressed">
            </div>
            </div>
            <h1 id="trackDuration">{nowPlaying.duration}</h1>
            </div>

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
