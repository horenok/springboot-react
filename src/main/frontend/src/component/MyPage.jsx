import React, {useState, useEffect} from "react";
import {Button, Col, FormText, Modal, Row} from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

import "../css/myPage.css"
import axios, {all} from "axios";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function MyPage() {
    const movePage = useNavigate();
    const allState = useSelector(state => state);

    const [posts, setPosts] = useState([]);
    const [backingAmount, setBackingAmount] = useState("");
    const [show, setShow] = useState({tf: false, name: "", backingListId: 0});
    const handleClose = () => setShow({tf: false, name: "", backingListId: 0});
    const handleShow = (index) => setShow({tf: true, name: posts[index].backingName, backingListId: posts[index].id});
    const onAmountHandler = (event) => {
        setBackingAmount(event.currentTarget.value);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 서버로부터 데이터를 가져옵니다.
                const response = await axios.get('/api/backing/getlist');
                // 상태를 업데이트합니다.
                setPosts(response.data.data);
            } catch (error) {
                console.error('데이터를 가져오는데 실패했습니다.', error);
            }
        };
        fetchData();
    }, []);

    const addNewPost = () => {
        movePage('/addBacking');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let body = {
            userId: allState.loginSuccess.data.data.id,
            backingAmount: backingAmount,
            backingListId: show.backingListId,
        }
        axios.post('/api/backing/backing', body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).
        then((res) =>{
            if(res.data.code === '0000') {
                alert("backingSuccess");
                handleClose();
            }
        })
    };

    return (
        <>
            <div className= "container">
                <div className= "title">
                    <h2>내 후원내용</h2>
                </div>
                {/*<ListGroup key="sm" horizontal="sm" className="my-2">
                    <ListGroup.Item style={{width: "auto"}}>후원명</ListGroup.Item>
                    <ListGroup.Item style={{width: "30%"}}>후원설명</ListGroup.Item>
                    <ListGroup.Item style={{width: "auto"}}>후원금액</ListGroup.Item>
                </ListGroup>*/}
                <div>
                    {['1', '2', '3'].map((number) => (
                        <ListGroup key="sm" horizontal="sm" className="my-2">
                            <ListGroup.Item style={{width: "20%"}}>후원명{number}</ListGroup.Item>
                            <ListGroup.Item style={{width: "50%"}}>후원설명{number}</ListGroup.Item>
                            <ListGroup.Item style={{width: "15%"}}>후원금액{number}</ListGroup.Item>
                            <Button style={{marginLeft: '30px'}}> 상세 보기 </Button>
                        </ListGroup>))}
                </div>
            </div>

            <Modal show={show.tf} onHide={handleClose}
                   size="xlg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Form onSubmit={handleSubmit} >
                    <Modal.Header closeButton>
                        <Modal.Title>후원하기</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        <h2 style={{marginBottom: "30px"}}>{show.name}</h2>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                            style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}
                        >
                            <Form.Label>후원할 금액</Form.Label>
                            <div style={{display: "flex"}}>
                                <Form.Control onChange={onAmountHandler} type="text" rows={3} style={{ width: "80%"}}/>
                                <h5 style={{marginLeft: "auto"}}>원</h5>
                            </div>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type='submit'>
                            후원하기
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default MyPage;