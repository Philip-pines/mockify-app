import React, { useState, useEffect } from 'react';
import Player from './components/Player';
import Sidebar from './components/Sidebar';
import Display from './components/Display';
import Tracks from './components/Tracks';
import Login from './Login'
import './App.css';

function App() {

  const [token, setToken] = useState('');

  useEffect(() => {

    async function getToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();

  }, []);

  return (
    <>
    <div className="h-screen bg-black">
      <div className='h-[90%] flex'>
        <Sidebar />
        <Display />
        <Tracks token={token} />
      </div>
      { (token === '') ? <Login/> : <Player token={token} /> }
    </div>
    </>
  );
}


export default App;
