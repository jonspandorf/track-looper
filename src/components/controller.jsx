import { useState } from "react";

const Controller = () => {

    const [playingAll, setPlayingAll] = useState(false);

    
    const addTrack = (value) => {

        console.log(value)

        Object.values(tracks).filter(track => {
            if (track.Id = value) {
                track.status = 'active';
            }
        })


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

    return (
    <div className="d-flex align-items-center justify-content-between">
        <div className="mt-2 mb-2">
            {!playingAll
                ? <button className="btn btn-outline-info rounded-pill me-2" onClick={playAll}><i className="fas fa-play me-2"></i>Play all</button>
                : <button className="btn btn-outline-danger rounded-pill me-2" onClick={stopAll}><i className="fas fa-stop me-2"></i>Stop all</button>
            }
            <button disabled className="btn btn-outline-primary rounded-pill" onClick={syncAll}><i className="fas fa-sync me-2"></i>Sync</button>
        </div>
        <div>
            {options.length > 0 &&
                <div className="dropdown">
                    <Select onChange={e => addTrack(e.target.value)}>
                        <MenuItem selected>Select track</MenuItem>
                        {options.map(option => {
                            return (
                                <MenuItem value={option.Id}>{option.owner}</MenuItem>
                            )
                        })}
                    </Select>
                </div>}
        </div>
    </div>
    )
}

export default Controller