import logo from './logo.svg';
import './css/App.css';

import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';


import useLocalStorage from './hooks/useLocalStorage';
import ApplicationRoutes from './ApplicationRoutes';

function App() {

  const [localStoreToken, localRemoveToken, localRetrieveToken, localDecodeToken] = useLocalStorage()
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localRetrieveToken()
    setToken(token)
  }, [])

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);


  return (
    <>
      <BrowserRouter>
        <ApplicationRoutes
          token={token}
          setToken={setToken}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
