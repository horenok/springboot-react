
import React, {useEffect, useState} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import axios from 'axios';
import Home from "./pages/home";
import Login from "./pages/login";

function App() {
  const [data, setHello] = useState('')

  useEffect(() => {
    axios.get('/api/data')
        .then(res => setHello(res.data))
        .catch(err => console.log(err))
  }, []);

  return (
      <div ClassName="App">
          {/*백엔드에서 가져온 데이터입니다 : {data}
          <Home />*/}
          <Login />
      </div>
  );
}

export default App;