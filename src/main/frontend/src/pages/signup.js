import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {onSignUp} from "../actions/onSignUp";

const x = () => {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onSignUpHandler = (event) => {
        //버튼만 누르면 리로드 되는것 막아줌
        event.preventDefault();

        console.log('Email', Email);
        console.log('Password', Password);

        let body = {
            email: Email,
            password: Password
        }

        dispatch(onSignUp(body)).then((res) => {
            if (res.payload.code == '0000') {
                alert("SignUpSuccess");
            } else {
                alert("SignUpFail");
            }
        });
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <form style={{
                display: 'flex', flexDirection: 'column'}}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}
                       style={{width: '300px', height: '30px', fontSize: '16px',}}
                />
                <label>Password</label>
                <input type='password' value={Password} onChange={onPasswordHandler}
                       style={{width: '300px', height: '30px', fontSize: '16px',}}
                />
                <div style={{ display: 'flex', justifyContent: 'center', margin: '10px'}}>
                    <Button variant="dark" style={{margin: '5px'}} onClick={onSignUpHandler}>Sign Up</Button>
                </div>
            </form>
        </div>
    )
}

export default x;