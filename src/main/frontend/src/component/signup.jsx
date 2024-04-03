import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";

import { onSignUp, emailDuplicateCheck } from "../actions/onSignUp";
import {useNavigate} from "react-router-dom";

const Signup = () => {

    const dispatch = useDispatch();
    const movePage = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState('');
    const [name, setName] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const [nameError, setNameError] = useState('');

    const [isEmailCheck, setIsEmailCheck] = useState(false); //중복 검사를 했는지 안했는지
    const [isEmailAvailable, setIsEmailAvailable] = useState(false); //아이디 사용 가능한지 아닌지
    const [isNameCheck, setIsNameCheck] = useState(false); //이름 확인

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
        emailCheckHandler(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        const { id, value } = event.target;
        if (id === 'password') {
            setPassword(value);
            passwordCheckHandler(value, confirm);
        } else {
            setConfirm(value);
            passwordCheckHandler(password, value);
        }
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
        nameCheckHandler(event.currentTarget.value);
    }

    const emailCheckHandler = async (email) => {
        if (email === '') {
            setEmailError('이메일을 입력해주세요.');
            setIsEmailAvailable(false);
            return false;
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            setEmailError('이메일 형식이 아닙니다.');
            setIsEmailAvailable(false);
            return false;
        }
        const responseData = await emailDuplicateCheck(email);
        if (!responseData.payload) {
            setEmailError('사용 가능한 이메일입니다.');
            setIsEmailCheck(true);
            setIsEmailAvailable(true);
            return true;
        } else {
            setEmailError('이미 사용중인 이메일입니다.');
            setIsEmailAvailable(false);
            return false;
        }
    }

    const passwordCheckHandler = (password, confirm) => {
        if (password === '') {
            setPasswordError('비밀번호를 입력해주세요.');
            return false;
        } else if (confirm !== password) {
            setPasswordError('');
            setConfirmError('비밀번호가 일치하지 않습니다.');
            return false;
        } else {
            setPasswordError('');
            setConfirmError('');
            return true;
        }
    }

    const nameCheckHandler = (name) => {
        if(name === '') {
            setNameError('이름을 입력해주세요');
            setIsNameCheck(false);
            return false;
        }else {
            setNameError('');
            setIsNameCheck(true);
            return true;
        }
    }

    const onSignUpHandler = (event) => {
        //버튼만 누르면 리로드 되는것 막아줌
        event.preventDefault();

        let body = {
            email: email,
            password: password,
            name: name,
        }

        const emailCheckResult = emailCheckHandler(email);
        if(emailCheckResult) {
            setEmailError('');
        } else {
            return;
        }
        if(!isEmailCheck || !isEmailAvailable) {
            alert('아이디 중복 검사를 해주세요.');
            return;
        }

        if(!isNameCheck) {
            alert('이름 입력을 확인해주세요.')
            return;
        }

        const passwordCheckResult = passwordCheckHandler(password, confirm);
        if(passwordCheckResult) {
            setPasswordError('');
            setConfirmError('');
        } else {
            return;
        }

        // dispatch(onSignUp(body));

        dispatch(onSignUp(body)).then((res) => {
            if (res.payload.data.code == '0000') {
                alert("SignUp Success");
                movePage('/login');
            } else {
                alert("SignUp Fail");
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
                <input type="email" value={email} onChange={onEmailHandler}
                       style={{width: '300px', height: '30px', fontSize: '16px',}}/>
                {emailError && <small className={isEmailAvailable ? 'idAvailable' : ''}>{emailError}</small>}
                <label>Password</label>
                <input type='password' id="password" value={password} onChange={onPasswordHandler}
                       style={{width: '300px', height: '30px', fontSize: '16px',}}/>
                {passwordError && <small>{passwordError}</small>}
                <label>Confirm</label>
                <input type='password' id="confirm" value={confirm} onChange={onPasswordHandler}
                       style={{width: '300px', height: '30px', fontSize: '16px',}}/>
                {confirmError && <small>{confirmError}</small>}
                <label>Name</label>
                <input type='text' value={name} onChange={onNameHandler}
                       style={{width: '300px', height: '30px', fontSize: '16px',}}/>
                {nameError && <small>{nameError}</small>}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '10px'}}>
                    <Button variant="dark" style={{margin: '5px'}} onClick={onSignUpHandler}>Sign Up</Button>
                </div>
            </form>
        </div>
    )
}

export default Signup;