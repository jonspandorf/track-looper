
export function getTracks (rawTracks)  {

    const obj = {};

    rawTracks.forEach(track => {
        obj[track.Id] = {
            ...track, 
            player: loadTrack(track.url),
            readyToPlay: false,
            status: 'active',
        } 

    })
    return obj;
}

const loadTrack = (url) => {
    const track = new Audio();
    track.preload = 'metadata';
    track.src = url;
    return track;
}