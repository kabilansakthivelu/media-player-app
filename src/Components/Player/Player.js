import React from 'react';
import './Player.css';

const Player = (props) => {

    const {songsList, nowPlayingSongId} = props;

    const nowPlaying = songsList.find((song)=>{
            return song.id === nowPlayingSongId;
    })

    return (
        <div className="musicPlayer">
            <h1 className="playerTitle">Now Playing</h1>
            <img src={nowPlaying.imageURL} alt="" className="playerImage"/>
            <h1 className="playerSongTitle">{nowPlaying.title}</h1>
            <h1 className="playerSongArtist">{nowPlaying.artists}</h1>
            <audio autoplay controls>
                <source src={nowPlaying.source}/>
            </audio>
        </div>
    )
}

export default Player
