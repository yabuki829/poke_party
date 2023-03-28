import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import LeftParty from './components/Left/LeftParty';
import RigthParty from './components/Right/RigthParty';

function App() {
  return (
   <div className='bg-sky-600 h-screen'>
    <Header/>
    <div className='flex justify-between  '>
      <LeftParty/>
      <RigthParty/>
    </div>
    
   </div>
  );
}

export default App;
