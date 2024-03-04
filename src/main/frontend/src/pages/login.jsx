import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { loginAction } from "../actions/loginAction";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {

  const dispatch = useDispatch();
  const movePage = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const allState = useSelector(state => state);

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }
  const onSignInHandler = (event) => {

    console.log('Email', Email);
    console.log('Password', Password);

    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginAction(body)).then((res) => {
      if (res.payload.data.code == '0000') {
        alert("LoginSuccess");
        movePage('/home');
      } else {
        alert("LoginFail");
      }
    });
  };

  const onSignUpHandler = (event) => {
    movePage('/signup');

    //버튼만 누르면 리로드 되는것 막아줌
    event.preventDefault();
  }

  const handleOnKeyPress = (event) => {
    if(event.key === 'Enter') {
      onSignInHandler();
    }
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
          <input type='password' value={Password} onChange={onPasswordHandler} onKeyPress={handleOnKeyPress}
                 style={{width: '300px', height: '30px', fontSize: '16px',}}
          />
          <div style={{ display: 'flex', justifyContent: 'center', margin: '10px'}}>
            <Button variant="dark" style={{margin: '5px'}} onClick={onSignInHandler}>Sign In</Button>
            <Button variant="dark" style={{margin: '5px'}} onClick={onSignUpHandler}>Sign Up</Button>
          </div>
        </form>
        {<pre>{JSON.stringify(allState, null, 2)}</pre>}
      </div>
)
}

export default Login;