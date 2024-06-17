
import React, {Component, useEffect, useRef, useState} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import {connect, useDispatch, useSelector} from "react-redux";
import {logoutAction} from "../actions/loginAction";
import axios from "axios";

function HomeNav() {
    const allState = useSelector((state) => state);

    const [ttl, setTTL] = useState(null);
    const intervalIdRef = useRef(null);

    const dispatch = useDispatch();
    const Logout = async (event) => {
        event.preventDefault();
        clearInterval(intervalIdRef.current);
        await dispatch(logoutAction()).then((res) => {
            if (res.payload.data.code == '0000') {
                alert("LogoutSuccess");
            } else {
                alert("LogoutFail");
            }
        });
        window.location.reload();
    }

    useEffect(() => {
        intervalIdRef.current = setInterval(() => {
            axios.get('/api/users/getTTL')
                .then(response => {
                    setTTL(response.data.data);
                })
                .catch(error => {
                    console.error('Error fetching session TTL:', error);
                });
        }, 1000); // 매 초마다 TTL을 업데이트

        // 컴포넌트가 언마운트될 때 인터벌을 정리합니다.
        return () => clearInterval(intervalIdRef.current);
    }, []); // 빈 의존성 배열을 전달하여 이 훅이 마운트될 때 한 번만 실행되게 합니다.

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

                    {allState.loginSuccess?.data?.code === '0000' && allState.isLoggedIn === true ? (
                        <>
                            <h6 style={{color: "#FFFFFF", padding: "7px", margin: "0px"}}>
                                {parseInt(ttl/60)}:{ttl%60 == 0 ? "00" : ttl%60}
                            </h6>
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