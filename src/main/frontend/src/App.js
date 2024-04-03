
import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from "./component/login";
import SignUp from "./component/signup"
import BackingList from "./component/BackingList";
import HomeNav from "./pages/HomeNav";
import {useSelector} from "react-redux";
import AddBacking from "./component/AddBacking";

function App() {
    const allState = useSelector(state => state);

    return (
        <BrowserRouter>
            <HomeNav/>
            <Routes>
                <Route path="/"/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/backingList" element={<BackingList/>}/>
                <Route path="/addBacking" element={<AddBacking/>}/>
            </Routes>
            {<pre>{JSON.stringify(allState, null, 2)}</pre>};
        </BrowserRouter>
    );
}

export default App;