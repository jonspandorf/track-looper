
const Controller = ({isPlayingAll, onPlayAll, onStopAll, onSyncAll}) => {

    const handlePlayAll = (e) => {
        e.preventDefault();
        onPlayAll(e)
    }

    const handleStopAll = (e) => {
        e.preventDefault();
        onStopAll(e);
    }

    const handleSyncAll = (e) => {
        e.preventDefault();
        onSyncAll(e)
    }

    return (
        <div className="mt-2 mb-2">
        {!isPlayingAll 
        ?<button className="btn btn-outline-info rounded-pill me-2" onClick={handlePlayAll}><i className="fas fa-play me-2"></i>Play all</button>
        : <button className="btn btn-outline-danger rounded-pill me-2" onClick={handleStopAll}><i className="fas fa-stop me-2"></i>Stop all</button>
        }
        <button disabled className="btn btn-outline-primary rounded-pill" onClick={handleSyncAll}><i className="fas fa-sync me-2"></i>Sync</button>
    </div>
    )
}

export default Controller