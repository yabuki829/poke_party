import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import LeftParty from './components/Left/LeftParty';
import RigthParty from './components/Right/RigthParty';

function App() {
  return (
   <div className='bg-sky-600'>
    <Header/>
    <div className='flex justify-between  h-full w-full'>
      <div className='  w-1/2 '>
        <LeftParty/>
      </div>
      <div className='w-1/2'>
        <RigthParty/>
      </div>
    </div>
    <div className='h-96 border-2 border-black m-10  '> 
      <h1 className='text-center text-center '>計算結果を表示する</h1>
    </div>
   </div>
  );
}

export default App;
