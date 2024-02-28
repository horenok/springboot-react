
import React, {useEffect, useState} from 'react';
import {Routes, Route, Link, BrowserRouter} from 'react-router-dom';
import axios from 'axios';
import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signup";

function App() {
  const [data, setHello] = useState('')

  /*useEffect(() => {
    axios.get('/api/data')
        .then(res => setHello(res.data))
        .catch(err => console.log(err))
  }, []);*/

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;