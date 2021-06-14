import Main from './components/Main';

const mockTracks = [{
  "Id":1,
  "url":"https://academy.musico.io/audio/085e6a07-b700-3f12-809a-12e54d97f18e",
  "owner":"Ori Winokur",
  "bpm":120
  },{
  "Id":2,
  "url":"https://academy.musico.io/audio/57abe259-5869-65eb-ee68-a1970a7e1594",
  "owner":"Yonatan Pistiner",
  "bpm":100
  },{
  "Id":3,
  "url":"https://academy.musico.io/audio/1f2a9ae3-13f5-2a7a-b976-aa0af005dc89",
  "owner":"Barak Inbar",
  "bpm":123
  }, {
  "Id":4,
  "url":"https://academy.musico.io/audio/ca279e66-3e97-10ce-2ffe-feed34a7f6dc",
  "owner":"Ori Winokur",
  "bpm":80
  }]
  

  function App() {


    return (
      <div className="container">
        <Main allTracks={mockTracks} />
      </div>
    );
  }
  
export default App;