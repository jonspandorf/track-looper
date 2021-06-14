import { useState } from "react";

const TrackList = ({currentTracks}) => {

    const [cachedDurations, setCachedDurations] = useState([]);



    const removeTrack = (id) => {
        const updatedTrackList = Object.values(currentTracks).filter((track) => track.Id !== id);
        // OnUpdatedTrackList
        setCurrentTracks([...updatedTrackList])

        tracks[id].status = 'deleted';
        const removed = {
            owner: tracks[id].owner,
            Id: tracks[id].Id,
        }
        setOptions(prevState => [...prevState, removed])
    }

    
    const addDurationToCached = (id, duration) => {

        const cached = { duration, id };

        setCachedDurations(prevState => [...prevState, cached])

    }



    return(
        <>
        {currentTracks && Object.values(currentTracks).map(track => {
            if (track.status === 'active') {
                return (
                    <TrackItem 
                        key={track.Id} 
                        track={track} 
                        onRemoveTrack={removeTrack} 
                        caclBpm={bpm}
                        playingAll={playingAll}
                        cachedDurations={cachedDurations}
                        onAddToCached={addDurationToCached}
                    />

            )
            }
        })}
        </>
    )
}

export default TrackList