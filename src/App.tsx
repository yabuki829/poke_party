import React from 'react';
import Header from './components/Header';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom"
import Calc from './pages/Calc';

function App() {
  return (
    <Router>
      <div className='bg-sky-600 h-screen'>
        <Header/>
        <Routes>
          <Route path='/' element={<Calc/>}></Route>
        </Routes>
      </div>
    </Router>
   
  );
}

export default App;
