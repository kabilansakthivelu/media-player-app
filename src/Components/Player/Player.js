import React, {useEffect, useContext} from 'react';
import {BiArrowBack} from 'react-icons/bi';
import {useHistory} from 'react-router-dom';
import {ValuesContext} from '../../App';
import './Player.css';

const Player = (props) => {

    const {setShowPlayer} = useContext(ValuesContext);

    const {songsList, nowPlayingSongId} = props;

    const nowPlaying = songsList.find((song)=>{
            return song.id === nowPlayingSongId;
    })

    useEffect(()=>{
        document.getElementById('playButton').play();
    },[nowPlaying])

    const history = useHistory();

    return (
        <div className="musicPlayer">
            <div className="playerHeader">
            <BiArrowBack className="backArrow" onClick={()=>{setShowPlayer(false)}}/>
            <h1 className="playerTitle">Now Playing</h1>
            </div>
            <img src={nowPlaying.imageURL} alt="" className="playerImage"/>
            <h1 className="playerSongTitle">{nowPlaying.title}</h1>
            <h1 className="playerSongArtist">{nowPlaying.artists}</h1>
            <audio id="playButton" controls>
                <source src={nowPlaying.source}/>
            </audio>
        </div>
    )
}

export default Player
