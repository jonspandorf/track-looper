import { useEffect, useRef, useState } from "react"
import TrackItem from "./trackItem"
import calculateBPM from "../utils/bpm";
import { MenuItem, Select } from '@material-ui/core'


const getTracks = (rawTracks) => {

    const obj = {};

    rawTracks.forEach(track => {
        obj[track.Id] = {
            ...track, 
            player: useRef(new Audio(track.url)),
            readyToPlay: false,
            status: 'active',
        } 

    })
    return obj;
}

const TrackList = ({allTracks}) => {

    const [tracks, setTracks] = useState(getTracks(allTracks));
    const [playingAll, setPlayingAll] = useState(false);
    const [options, setOptions] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [added, setAdded] = useState(false)
    const [bpm, setBpm] = useState(0);





useEffect(() => {
    if (added) setAdded(false);
}, [added, options])


    const syncAll = (e) => {
        e.preventDefault();

        const longestTrackId = findLongestTrack();
        const bpm = calculateBPM(tracks[longestTrackId].player.current);
        setBpm(bpm)
        
        Object.values(tracks).sort((a, b) => {
            if (a.player.current.length > b.player.current.length) return 1
            else return -1; 
        })

        playAll();
    }


    const findLongestTrack = () => {
        let longest = 0;

        Object.values(tracks).forEach(track => {
            console.log(track.player.current.duration)

            if (track.player.current.duration > longest) {
                longest = track.Id;
            } 
        })
        
        return longest;
    }


    const addTrack = (value) => {
 
        console.log(value)

        Object.values(tracks).filter(track => {
            if (track.Id = value) {
                track.status = 'active';  
            }
        })

        setAdded(true)
        
    }

    const playAll = (e) => {
        e.preventDefault();
        Object.values(tracks).forEach(track => {
            track.player.current.currentTime = 0;
            track.readyToPlay = true;
            track.player.current.loop = true;
        })
        setPlayingAll(true);
    }   


    const stopAll = (e) => {
        e.preventDefault();
        Object.values(tracks).forEach(track => {
            track.player.current.currentTime = 0;
            track.readyToPlay = false;
            track.player.current.loop = false;
        })
        setPlayingAll(false);
    }


 
    const removeTrack = (id) => {
        // const updatedTrackList = Object.values(tracks).filter((track) => track.Id !== id);
        // setTracks([...updatedTrackList])
        tracks[id].status = 'deleted';

        const removed = {
            owner: tracks[id].owner,
            Id: tracks[id].Id,
        }

        console.log(removed)
        setOptions(prevState => [...prevState, removed])
        setDeleted(true);
    }

    const playTrack = (id) => {
        tracks[id].player.current.play()
    }

    const pauseTrack = (id) => {
        tracks[id].player.current.pause();
    }


    const changeVolume = (id, val) => {
        tracks[id].player.current.volume = val * 0.01
    }

    return(
        <>
        <ul className="list-group">
            <div className="d-flex align-items-center justify-content-between">
            <div className="mt-2 mb-2">
                {!playingAll 
                ?<button className="btn btn-outline-info rounded-pill me-2" onClick={playAll}><i className="fas fa-play me-2"></i>Play all</button>
                : <button className="btn btn-outline-danger rounded-pill me-2" onClick={stopAll}><i className="fas fa-stop me-2"></i>Stop all</button>
                }
                <button className="btn btn-outline-primary rounded-pill" onClick={syncAll}><i className="fas fa-sync me-2"></i>Sync</button>
            </div>
            <div>
               {options.length > 0 && 
               <div className="dropdown">
                   <Select onChange={e => addTrack(e.target.value)}>
                       <MenuItem selected>Select track</MenuItem>
                       {options.map(option => {
                           return(
                               <MenuItem value={option.Id}>{option.owner}</MenuItem>
                           )
                       })}
                   </Select>
                </div>}
            </div>
            </div>
            <div className="text-muted">
                    Select Track
            </div>
            {Object.values(tracks).map(track => {
                if (track.status === 'active') {

                    return (
                        <TrackItem 
                            key={track.Id} 
                            track={track} 
                            onRemoveTrack={removeTrack} 
                            onPlay={playTrack} 
                            onPause={pauseTrack} 
                            onVolChange={changeVolume}
                            caclBpm={bpm}
                            playingAll={playingAll}
                            currentProgress={track.player.current.currentTime}
                        />

                )
                }
            })}

        </ul>
        </>
    )
}

export default TrackList