
import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from "./component/home";
import Login from "./component/login";
import SignUp from "./component/signup"
import BackingList from "./component/backingList";
import HomeNav from "./pages/HomeNav";
import {useSelector} from "react-redux";
import AddBacking from "./component/addBacking";
import UserBackingInfo from "./component/userBackingInfo";
import MyPage from "./component/MyPage";

function App() {
    const allState = useSelector(state => state);

    return (
        <BrowserRouter>
            <HomeNav/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/backingList" element={<BackingList/>}/>
                <Route path="/myPage" element={<MyPage/>}/>
                <Route path="/addBacking" element={<AddBacking/>}/>
                <Route path="/userBackingInfo" element={<UserBackingInfo/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;