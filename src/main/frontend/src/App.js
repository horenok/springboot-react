
import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from "./pages/login";
import SignUp from "./pages/signup"
import Bar1 from "./component/Bar1";
import HomeNav from "./pages/HomeNav";
import {useSelector} from "react-redux";

function App() {
    const allState = useSelector(state => state);

  return (
      <BrowserRouter>
          <HomeNav />
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/bar1" element={<Bar1 />} />
          </Routes>
          {<pre>{JSON.stringify(allState, null, 2)}</pre>};
      </BrowserRouter>
  );
}

export default App;