
import { useState } from "react";
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { useEffect } from "react";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

  
const TrackItem = ({ track, onRemoveTrack, calcBpm, playingAll, cachedDurations, onAddToCached,  }) => {

    const { owner, bpm } = track

    const [value, setValue] = useState(30);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] =useState(0);
    const [color] = useState('')
    const quarter = 60 / bpm

    useEffect(() => {
        if (cachedDurations.length === 0) {
            track.player.onloadedmetadata = function () {
                setDuration(track.player.duration) 
            }
        } else {
            cachedDurations.forEach(item => {
                console.log(item)
                if (track.Id === item.id) {
                    setDuration(item.duration)
                }
            })
        }
        
    }, [track])



    const calculateBars = () => {
        return Math.floor(duration) * quarter;
    }


    useEffect(() => {
        if(track.readyToPlay && playingAll) {
            track.player.play();
        } else {
            track.player.pause();
        }
        
    }, [playingAll])

    const handleVolChange = (e, val) => {
        setValue(val);
        track.player.volume = val * 0.01;
    }

    const handleSinglePlay = (e) => {
        e.preventDefault();
        setIsPlaying(true)
        track.player.play();
        }
    

    const handlePause = (e) => {
        e.preventDefault();
        setIsPlaying(false)
        track.player.pause()

    }
    const handleRemove = (e) => {
        e.preventDefault();
        onAddToCached(track.Id, duration)
        onRemoveTrack(track.Id)
    }

    return(
        <>
        <li className="list-group-item">
            <div className="d-flex border-bottom border-dark justify-content-between">
            <div className="d-flex align-items-center">
                {!isPlaying ? 
                <button className="btn btn-outline-dark rounded-circle d-flex" onClick={handleSinglePlay}><PlayArrowIcon /></button>
                : <button className="btn btn-outline-warning rounded-circle" onClick={handlePause}><PauseIcon /></button>}
            </div>
            <div className="w-100 d-flex justify-content-center ms-4 me-4">
                <div className=" w-50 d-flex flex-column align-items-center">
                    <div>{owner}</div>
                    <div>Find Inst</div>
                    <small className="text-muted">BPM: {bpm}</small>
                    {calcBpm && <small className="text-muted">Cacl BPM: {calcBpm}</small>}
                </div>
            </div>
            <div className="w-25">
                <div className="d-flex justify-content-end align-items-center me-1">
                    <button className="btn" onClick={handleRemove}><i className="fas fa-trash me-1"></i></button>
                    <div className="d-flex">
                        Bars: {duration ? <div className="ms-1 text-muted">{Math.floor(calculateBars())}</div> : <div className="spinner-border spinner-border-sm text-primary" role="status"><span className="visually-hidden">Loading...</span></div>} 
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