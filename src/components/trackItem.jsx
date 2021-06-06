import { useState } from "react";
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { useEffect } from "react";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

  
const TrackItem = ({ track, onRemoveTrack, onPlay, onPause, onVolChange, calcBpm, playingAll }) => {



    const { owner, bpm } = track

    const [value, setValue] = useState(30);
    const [isPlaying, setIsPlaying] = useState(false);
    const quarter = 60 / bpm
    const barsCalculation = Math.floor(Math.floor(track.player.current.duration) * (quarter));

    useEffect(() => {
        if(track.readyToPlay && playingAll) {
            onPlay(track.Id);
        } else {
            onPause(track.Id)
        }
        
    }, [playingAll])

    const handleVolChange = (e, val) => {
        setValue(val);
        onVolChange(track.Id, val)
    }

    const handleSinglePlay = (e) => {
        e.preventDefault();
        setIsPlaying(true)
        onPlay(track.Id)
        }
    

    const handlePause = (e) => {
        e.preventDefault();
        setIsPlaying(false)
        onPause(track.Id)

    }
    const handleRemove = (e) => {
        e.preventDefault();
        onRemoveTrack(track.Id)
    }

    return(
        <>
        <li className="list-group-item">
            <div className="d-flex border-bottom border-dark justify-content-between">
            <div>
                {!isPlaying ? 
                <button className="btn btn-outline-dark rounded-circle d-flex" onClick={handleSinglePlay}><PlayArrowIcon /></button>
                : <button className="btn btn-outline-warning rounded-circle" onClick={handlePause}><PauseIcon /></button>}
            </div>
            <div>
                <div>{owner}</div>
                <div>Find Inst</div>
                <small className="text-muted">BPM: {bpm}</small>
                {calcBpm && <small className="text-muted">Cacl BPM: {calcBpm}</small>}
            </div>
            <div className="w-25">
                <div className="d-flex justify-content-end me-2" style={{cursor: 'pointer'}} onClick={handleRemove}>
                    <i className="fas fa-trash me-2"></i>
                    <div>
                        Bars: {barsCalculation}
                    </div>
                </div>

                <div className="d-flex">
                    <Grid item>
                        <VolumeDown />
                    </Grid>
                    <Grid item xs>
                        <Slider value={value} onChange={handleVolChange} aria-labelledby="continuous-slider" />
                    </Grid>
                    <Grid item>
                        <VolumeUp />
                    </Grid>
                </div>
            </div>
            </div>
        </li>
        </>
    )
}

export default TrackItem