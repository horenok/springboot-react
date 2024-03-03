/*import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap'
import {useSelector} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./login";
import SignUp from "./signup";
import React from "react";

function Home() {

    const loginSuccess = useSelector(state => state.loginSuccess);
    const allState = useSelector(state => state);

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/home">OK</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/home">bar1</Nav.Link>
                        <Nav.Link href="/home">bar2</Nav.Link>
                        <Nav.Link href="/home">bar3</Nav.Link>
                    </Nav>
                    <h5 style={{ color: '#FFFFFF' }}>
                        { loginSuccess.data.data.name }님 안녕하세요!
                    </h5>
                </Container>
            </Navbar>
            {/!*<pre>{JSON.stringify(allState, null, 2)}</pre>*!/}
            //여기에 내가 원하는 컴포넌트를 넣고싶어
        </>
    );
}

export default Home;*/

import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {LOGOUT} from "../actions/types";

function HomeNav() {
    const loginSuccess = useSelector((state) => state.loginSuccess);
    const dispatch = useDispatch();

    const Logout = (event) => {
        localStorage.removeItem('LoginSuccess');
        dispatch({ type: LOGOUT , payload: true});
        // history.push("/login");
        if(logout.payload === true) {
            alert("hey");
        }
    }

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">OK</Navbar.Brand>
                    <Nav className="me-auto">
                        <LinkContainer to="/bar1">
                            <Nav.Link>bar1</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/bar2">
                            <Nav.Link>bar2</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/bar3">
                            <Nav.Link>bar3</Nav.Link>
                        </LinkContainer>
                    </Nav>
                        {loginSuccess.data.code === '0000' ? (
                            /*<>
                                <LinkContainer onClick={Logout}>
                                    <Nav.Link>Logout</Nav.Link>
                                </LinkContainer>
                                <h5 style={{color: "#FFFFFF"}}>
                                    {loginSuccess.data.data.name}님 안녕하세요!
                                </h5>
                            </>*/
                            <LinkContainer to="/" onClick={Logout}>
                                <Nav.Link>Logout</Nav.Link>
                            </LinkContainer>
                            ) : (
                        <LinkContainer to="/login">
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>)}
                </Container>
            </Navbar>
        </>
    );
}

export default HomeNav;