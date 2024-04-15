import React, {useState, useEffect} from "react";
import {Button, Col, Row} from "react-bootstrap";

import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";

function BackingList() {
    const allState = useSelector(state => state);
    const [backingInfo, setBackingInfo] = useState([]);
    const movePage = useNavigate();

    const moveBacking = () => {
        movePage('/backingList');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 서버로부터 데이터를 가져옵니다.
                const response = await axios.get('/api/users/userbackinginfo', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    params: {
                        id: allState.loginSuccess.data.data.id,
                    }
                });
                // 상태를 업데이트합니다.
                setBackingInfo(response.data.data);
            } catch (error) {
                console.error('유저 후원정보를 가져오는데 실패했습니다.', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div style={{
            display: 'flex', width: '20%', height: '30vh', position: 'absolute', right: '0px', margin: '30px', borderStyle: "solid"
        }}>

            {allState.loginSuccess?.data.code === '0000' && allState.isLoggedIn === true ? (
                <>
                    <div style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        <label>{allState.loginSuccess.data.data.name} 님</label>
                        <label>현재까지 후원해주신 금액</label>
                        <br/>
                        <h3>{backingInfo} 원</h3>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px'}}>
                            <Button variant="dark" style={{margin: '5px', marginLeft: 'auto'}} onClick={moveBacking}>후원하러가기</Button>
                        </div>
                    </div>
                </>
            ) : (
                <div style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <label>로그인을 해주세요</label>
                </div>
                )}
        </div>
    );
}

export default BackingList;