  
import { useEffect, useState } from "react"
import TrackList from './trackList'
import calculateBPM from "../utils/bpm";
import { getTracks } from "../utils/lib";
import SelectMenu from "./SelectMenu";
import Controller from "./controller";



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
        const bpm = calculateBPM(tracks[longestTrackId].player);
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

        <div className="col-lg-6 col-md-12">
            <div className="d-flex align-items-center justify-content-between">
                <Controller options={options} isPlayingAll={playingAll} onPlayAll={playAll} onStopAll={stopAll} onSyncAll={syncAll} />
                {options.length > 0 && <SelectMenu options={options} addTrack={addTrack} isPlayingAll={playingAll}/>}
            </div>
            <TrackList currentTracks={currentTracks} onRemoveTrack={removeTrack} bpm={bpm} isPlayingAll={playingAll} />
        </div>
    )
}

export default Main

