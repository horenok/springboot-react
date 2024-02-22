import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction } from "../actions/loginAction";

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {

  const dispatch = useDispatch();
  const movePage = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }
  const onSignInHandler = (event) => {
    //버튼만 누르면 리로드 되는것 막아줌
    event.preventDefault();

    console.log('Email', Email);
    console.log('Password', Password);

    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginAction(body)).then((res) => {
      if (res.payload.code == '0000') {
        alert("LoginSuccess");
      } else {
        alert("LoginFail");
      }
    });
  };

  const onSignUpHandler = (event) => {
    movePage('/SignUp');

    //버튼만 누르면 리로드 되는것 막아줌
    event.preventDefault();
  }

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
            <Button variant="dark" style={{margin: '5px'}} onClick={onSignInHandler}>Sign In</Button>
            <Button variant="dark" style={{margin: '5px'}} onClick={onSignUpHandler}>Sign Up</Button>
          </div>
        </form>
      </div>
  )
}

export default Login;