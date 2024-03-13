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
                        <Nav.Link href="/home">BackingList</Nav.Link>
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

import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import {connect, useDispatch, useSelector} from "react-redux";
import {logoutAction} from "../actions/loginAction";
import localStorage from 'redux-persist/lib/storage';

class HomeNav extends Component {

    Logout = (event) => {
        event.preventDefault();
        localStorage.removeItem('loginSuccess');
        this.props.dispatch(logoutAction());
    }
    loginSuccess;
    isLoggedIn;

    render() {

        return (
            <>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand href="/">OK</Navbar.Brand>
                        <Nav className="me-auto">
                            <LinkContainer to="/backingList">
                                <Nav.Link>BackingList</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/bar2">
                                <Nav.Link>bar2</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/bar3">
                                <Nav.Link>bar3</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        {/*{this.props.loginSuccess.data.code === '0000' && this.props.isLoggedIn === true ? (
                            <>
                                <h5 style={{color: "#FFFFFF", padding: "7px", margin: "0px"}}>
                                    {this.props.loginSuccess.data.data.name}님 안녕하세요!
                                </h5>
                                <LinkContainer style={{ color: '#FFFFFF', padding: "7px"}} to="/login" onClick={this.Logout}>
                                    <Nav.Link>Logout</Nav.Link>
                                </LinkContainer>
                            </>
                        ) : (
                            <LinkContainer style={{ color: '#FFFFFF' , padding: "7px"}} to="/login">
                                <Nav.Link style={{ color: '#FFFFFF' }}>Login</Nav.Link>
                            </LinkContainer>)}*/}
                    </Container>
                </Navbar>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        loginSuccess: state.loginSuccess, // 로그인 상태를 가져옵니다.
        isLoggedIn: state.isLoggedIn,
    };
}

export default connect(mapStateToProps)(HomeNav);