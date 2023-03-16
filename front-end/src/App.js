import logo from './logo.svg';
import './css/App.css';

import Map from './components/Map';
import { useEffect, useState } from 'react';

function App() {

  const [zoom, setZoom] = useState(2)

  useEffect(() => {
    changeZoom(2)
  }, [])



  const changeZoom = (num) => {
    setZoom(num)
  }

  const increaseZoom = () => {
    setZoom(zoom + 1)
    console.log(zoom)
  }

  return (
    <div className="App">
      <Map zoom={zoom}/>
      {/* <div className='testing-buttons'>
        <button onClick={increaseZoom}>IN</button>
      </div> */}
    </div>
  );
}

export default App;
