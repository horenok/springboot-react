import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from "axios";
import {useState} from "react";
import {useSelector} from "react-redux";
import {LOGIN} from "../actions/types";

function ColorSchemesExample() {

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
            <pre>{JSON.stringify(allState, null, 2)}</pre>
        </>
    );
}

export default ColorSchemesExample;