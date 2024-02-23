import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {onSignUp} from "../actions/onSignUp";

const Signup = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');

    const [isEmailCheck, setIsEmailCheck] = useState(false); //중복 검사를 했는지 안했는지
    const [isEmailAvailable, setIsEmailAvailable] = useState(false); //아이디 사용 가능한지 아닌지

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
        emailCheckHandler(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        const { type, value } = event.target;
        if (type === 'password') {
            setPassword(value);
            passwordCheckHandler(value, confirm);
        } else {
            setConfirm(value);
            passwordCheckHandler(password, value);
        }
    }

    const emailCheckHandler = async (id) => {
        const idRegex = /^[a-z\d]{5,10}$/;
        if (id === '') {
            setEmailError('이메일을 입력해주세요.');
            setIsEmailAvailable(false);
            return false;
        }
        const responseData = await idDuplicateCheck(id);
        if (responseData) {
            setEmailError('사용 가능한 아이디입니다.');
            setIsEmailCheck(true);
            setIsEmailAvailable(true);
            return true;
        } else {
            setEmailError('이미 사용중인 아이디입니다.');
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
    const onSignUpHandler = (event) => {
        //버튼만 누르면 리로드 되는것 막아줌
        event.preventDefault();

        let body = {
            email: email,
            password: password
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

        const passwordCheckResult = passwordCheckHandler(password, confirm);
        if(passwordCheckResult) {
            setPasswordError('');
            setConfirmError('');
        } else {
            return;
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
                <input type="email" value={email} onChange={onEmailHandler}
                       style={{width: '300px', height: '30px', fontSize: '16px',}}/>
                {emailError && <small className={isEmailAvailable ? 'idAvailable' : ''}>{emailError}</small>}
                <label>Password</label>
                <input type='password' value={password} onChange={onPasswordHandler}
                       style={{width: '300px', height: '30px', fontSize: '16px',}}/>
                {passwordError && <small>{passwordError}</small>}
                <label>Confirm</label>
                <input type='confirm' value={confirm} onChange={onPasswordHandler}
                       style={{width: '300px', height: '30px', fontSize: '16px',}}/>
                {confirmError && <small>{confirmError}</small>}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '10px'}}>
                    <Button variant="dark" style={{margin: '5px'}} onClick={onSignUpHandler}>Sign Up</Button>
                </div>
            </form>
        </div>
    )
}

export default Signup;