  
import { useEffect, useState } from "react"
import TrackItem from "./trackItem"
import TrackList from './trackList'
import calculateBPM from "../utils/bpm";
import {  MenuItem, Select } from '@material-ui/core'
import { getTracks } from "../utils/lib";



const Main = ({allTracks}) => {

    const [tracks] = useState(getTracks(allTracks));
    const [currentTracks, setCurrentTracks] = useState(tracks);
    const [playingAll, setPlayingAll] = useState(false);
    const [options, setOptions] = useState([]);
    const [added, setAdded] = useState(false)
    const [bpm, setBpm] = useState(0);



useEffect(() => {
    if (added) {
        setAdded(false);
    } 
}, [added, options])



    const syncAll = (e) => {

        // NON FUNCTIONAL
        e.preventDefault();

        const longestTrackId = findLongestTrack();
        const bpm = calculateBPM(tracks[longestTrackId].player.current);
        setBpm(bpm)
        
        Object.values(tracks).sort((a, b) => {
            if (a.player.duration > b.player.duration) return 1
            else return -1; 
        })

        playAll();
    }



    const findLongestTrack = () => {
        let longest = 0;

        Object.values(tracks).forEach(track => {
            console.log(track.player.duration)

            if (track.player.duration > longest) {
                longest = track.Id;
            } 
        })
        
        return longest;
    }


    const addTrack = (value) => {
        

        Object.values(tracks).forEach(track => {
            if (track.Id === value && track.status === 'deleted') {
                track.status = 'active'; 
                setCurrentTracks(prevState => [...prevState, track]);
                removeOption(track.Id)
            }
        })

        setAdded(true)
        
    }

    const removeOption = (id) => {
        setOptions(options.filter(item => item.Id !== id))
    }
    
    const playAll = (e) => {
        e.preventDefault();
        const tracksToPlay = Object.values(tracks)
        for (var i = 0; i < tracksToPlay.length; i++) {
            tracksToPlay[i].player.currentTime = 0;
            tracksToPlay[i].readyToPlay = true;
            tracksToPlay[i].player.loop = true;
        }
        setPlayingAll(true);
    }



    const stopAll = (e) => {
        e.preventDefault();
        const tracksToStop = Object.values(tracks)

        for (var i = 0; i < tracksToStop.length; i++) {
            tracksToStop[i].player.currentTime = 0;
            tracksToStop[i].readyToPlay = false;
            tracksToStop[i].player.loop = false;
        }

        setPlayingAll(false);
    }


 
    const removeTrack = (id) => {
        const updatedTrackList = Object.values(currentTracks).filter((track) => track.Id !== id);
        setCurrentTracks([...updatedTrackList])

        tracks[id].status = 'deleted';
        const removed = {
            owner: tracks[id].owner,
            Id: tracks[id].Id,
        }
        setOptions(prevState => [...prevState, removed])
    }



    return(

        // <div className="w-50">
        //     <div className="d-flex align-items-center justify-content-between">
        //         <div className="mt-2 mb-2">
        //             {!playingAll 
        //             ?<button className="btn btn-outline-info rounded-pill me-2" onClick={playAll}><i className="fas fa-play me-2"></i>Play all</button>
        //             : <button className="btn btn-outline-danger rounded-pill me-2" onClick={stopAll}><i className="fas fa-stop me-2"></i>Stop all</button>
        //             }
        //             <button disabled className="btn btn-outline-primary rounded-pill" onClick={syncAll}><i className="fas fa-sync me-2"></i>Sync</button>
        //         </div>
        //     <div className="text-muted">
        //             Select Track
        //     </div>
        // </div>
    )
}

export default Main

{/* <div>
               {options.length > 0 && 
               <div className="dropdown">
                 <Select onChange={e => addTrack(e.target.value)}>
                       <MenuItem selected>Select track</MenuItem>
                       {options.map(option => {
                           return(
                               <MenuItem key={option.Id} value={option.Id}>{option.owner}</MenuItem>
                           )
                       })}
                   </Select>
                </div>
                }
            </div> */}