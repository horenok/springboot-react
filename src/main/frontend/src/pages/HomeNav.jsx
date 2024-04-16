
import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import {connect, useDispatch, useSelector} from "react-redux";
import {logoutAction} from "../actions/loginAction";

function HomeNav() {

    const allState = useSelector(state => state);
    const dispatch = useDispatch();

    const Logout = (event) => {
        event.preventDefault();
        dispatch(logoutAction());
        window.location.reload();
    }

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">OK</Navbar.Brand>
                    <Nav className="me-auto">
                        <LinkContainer to="/backingList">
                            <Nav.Link>BackingList</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/myPage">
                            <Nav.Link>MyPage</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/bar3">
                            <Nav.Link>bar3</Nav.Link>
                        </LinkContainer>
                    </Nav>

                    {allState.loginSuccess?.data.code === '0000' && allState.isLoggedIn === true ? (
                        <>
                            <h5 style={{color: "#FFFFFF", padding: "7px", margin: "0px"}}>
                                {allState.loginSuccess.data.data.name}님 안녕하세요!
                            </h5>
                            <LinkContainer style={{ color: '#FFFFFF', padding: "7px"}} to="/login" onClick={Logout}>
                                <Nav.Link>Logout</Nav.Link>
                            </LinkContainer>
                        </>
                    ) : (
                        <LinkContainer style={{ color: '#FFFFFF' , padding: "7px"}} to="/login">
                            <Nav.Link style={{ color: '#FFFFFF' }}>Login</Nav.Link>
                        </LinkContainer>)}
                </Container>
            </Navbar>
        </>
    );
}
export default HomeNav;