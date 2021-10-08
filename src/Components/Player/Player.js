import React, {useEffect, useContext, useState} from 'react';
import {BiArrowBack} from 'react-icons/bi';
import {FaPlay, FaPause} from 'react-icons/fa';
import {AiFillStepBackward, AiFillStepForward, AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import {GiSpeaker, GiSpeakerOff} from 'react-icons/gi';
import {ValuesContext} from '../../App';
import {toast} from 'react-toastify';
import {db, auth} from '../../firebase';
import './Player.css';

toast.configure();

const Player = (props) => {

    const {showPlayer, setShowPlayer} = useContext(ValuesContext);

    let {songsList, nowPlayingSongId, setNowPlayingSongId} = props;

    let nowPlaying = [];

    let nextUpSong = [];

    let nextUpFinder;

    const [nextUpTitle, setNextUpTitle] = useState();

    const [showSpeaker, setShowSpeaker] = useState(false);
     
    if(songsList !== undefined){
     nowPlaying = songsList.find((song)=>{
            return song.id === nowPlayingSongId;
    })
    }

    const audio = document.getElementById('playButton');

    useEffect(()=>{
        if(songsList){
        if(showPlayer && (nowPlaying !== undefined)){
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

        db.collection('favorites').doc(auth.currentUser.uid).collection('songs').get
        ().then((snapshot)=>{
            const arr = [];
            snapshot.forEach((doc)=>{
                arr.push(doc.data());
            })
            const alreadyFavorite = arr.find((song)=>{
                return song.title === nowPlaying.title;
            })
            if(alreadyFavorite === undefined){
                document.getElementById('outlineHeart').style.display = "block";
                document.getElementById('filledHeart').style.display = "none";
            }else
            {
                document.getElementById('outlineHeart').style.display = "none";
                document.getElementById('filledHeart').style.display = "block";
            }
        })  

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

    const trackDurationAdjust = (e) =>{
        let progressBar = document.getElementById('progressBar');
        audio.currentTime = ((e.nativeEvent.offsetX/progressBar.offsetWidth)*audio.duration);
    }

    const speakerOff = () =>{
        setShowSpeaker(true);
        audio.muted = true;
    }

    const speakerOn = () =>{
        setShowSpeaker(false);
        audio.muted = false;
    }

    const setFavorite = async(id, title, artists, imageURL, source, duration) =>{
        document.getElementById('outlineHeart').style.display = "none";
        document.getElementById('filledHeart').style.display = "block";
        toast.success("Song added to favorites list", {position: toast.POSITION.TOP_CENTER});

        await db.collection('favorites').doc(auth.currentUser.uid).collection('songs').get().then((snapshot)=>{
            const arr = [];
            snapshot.forEach((doc)=>{
                arr.push(doc.data());
            })
        
        db.collection('favorites').doc(auth.currentUser.uid).collection('songs').doc(title).set({
            id: arr.length+1,
            title,
            artists,
            imageURL,
            source,
            duration,
        })
        })
    }

    const clearFavorite = async(title) =>{
        document.getElementById('outlineHeart').style.display = "block";
        document.getElementById('filledHeart').style.display = "none";
        toast.success("Song removed from favorites list", {position: toast.POSITION.TOP_CENTER});
        await db.collection('favorites').doc(auth.currentUser.uid).collection('songs').doc(title).delete();

        await db.collection('favorites').doc(auth.currentUser.uid).collection('songs').onSnapshot((snapshot)=>{
            const arr = [];
            snapshot.forEach((doc)=>{
                arr.push(doc.data());
            })
        
        if(arr !== []){
        let idNumber = 1;
        arr.map((song)=>{
        db.collection('favorites').doc(auth.currentUser.uid).collection('songs').doc(song.title).set({
            id: idNumber,
            title: song.title,
            artists: song.artists,
            imageURL: song.imageURL,
            source: song.source,
            duration: song.duration,
        })
        idNumber += 1;
        })
        }
        })
        await setShowPlayer(false);
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
            <div className="progressBar" onClick={trackDurationAdjust} id="progressBar">
            <div className="progressed" id="progressed">
            </div>
            </div>
            <h1 id="trackDuration">{nowPlaying.duration}</h1>
            </div>

            <div className="playerIcons">

            {showSpeaker 
            ? 
            (<GiSpeaker className="speakerOff" onClick={speakerOn}/>)
            :
            (<GiSpeakerOff className="speakerOn" onClick={speakerOff}/>)
            }

            <AiFillStepBackward className="playerIconsInd" onClick={previousTrack}/>
            <FaPause className="playerIconsInd" id="pauseBtn" onClick={pauseFn}/>
             <FaPlay className="playBtn" id="playBtn" onClick={playFn}/>
            <AiFillStepForward className="playerIconsInd" onClick={nextTrack}/>

            <AiFillHeart className="favorite" onClick={()=>{clearFavorite(nowPlaying.title)}} id="filledHeart"/>
            <AiOutlineHeart className="notFavorite" id="outlineHeart" onClick={()=>{setFavorite(nowPlaying.id, nowPlaying.title, nowPlaying.artists, nowPlaying.imageURL, nowPlaying.source, nowPlaying.duration)}}/>

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
