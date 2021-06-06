import RealTimeBPMAnalyzer from 'realtime-bpm-analyzer';

    export default function calculateBPM (track) {
        const audioContext = new AudioContext();
        const source = audioContext.createMediaElementSource(track);
        const scriptProcessorNode = audioContext.createScriptProcessor(4096, 1, 1);

        scriptProcessorNode.connect(audioContext.destination);
        source.connect(scriptProcessorNode);
        source.connect(audioContext.destination);


        const onAudioProcess = new RealTimeBPMAnalyzer({
            scriptNode: {
                bufferSize: 4096,
                numberOfInputChannels: 1,
                numberOfOutputChannels: 1
            },
            pushTime: 2000,
            pushCallback: (err, bpm) => {
                if (err) console.error(err)
                else return bpm;
            }
        });

        scriptProcessorNode = (e) => {
            onAudioProcess.analyze(e);
        };

}