
import React, { useState, useEffect } from 'react';
import { Loader } from './Components/Baccarat/Loader';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Baccarat from "./Components/Baccarat";
import './App.css'

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulating an async operation
        setTimeout(() => {
          setIsLoading(false);
        }, 6000);
      }, []);

  return (


    <div className='app'>
      {/* <Router>
        <Routes>
          <Route path='/game' element={<Baccarat />} />
        </Routes>
      </Router> */}
       {isLoading ? <Loader /> : <Baccarat />}
      
    </div>
    
 
  );
};
export default App;
