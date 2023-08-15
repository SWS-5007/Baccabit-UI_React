import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { NewBaccarat, SignUp } from "./Pages";

import { Loader } from "./Components/Baccarat/Loader";
import Baccarat from "./Components/Baccarat";
import { SignIn } from "./Components/SignIn";

import "./App.css";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an async operation
    setTimeout(() => {
      setIsLoading(false);
    }, 6000);
  }, []);

  return (
    <div className="app">
      <Routes>
        {/* <Route exact path="/" element={<SignIn />} /> */}
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/baccarat" element={<Baccarat />} />
        <Route path="/" element={<NewBaccarat />} />
      </Routes>
      {/* {isLoading ? <Loader /> : <Baccarat />} */}
    </div>
  );
};
export default App;
