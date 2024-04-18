import React, {useState, useEffect} from "react";
import {Button, Col, FormText, Modal, Row} from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

import "../css/myPage.css"
import axios, {all} from "axios";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Container from "react-bootstrap/Container";

function MyPage() {
    const movePage = useNavigate();
    const allState = useSelector(state => state);

    const [backingList, setBackingList] = useState([]);
    const [backingAmount, setBackingAmount] = useState("");
    const [show, setShow] = useState({tf: false, name: "", backingListId: 0});
    const handleClose = () => setShow({tf: false});
    const handleShow = (index) => setShow({tf: true,
                                                        backingName: backingList[index].backingList.backingName,
                                                        backingExplanation: backingList[index].backingList.backingExplanation,
                                                        amount: backingList[index].amount});
    const onAmountHandler = (event) => {
        setBackingAmount(event.currentTarget.value);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 서버로부터 데이터를 가져옵니다.
                const response = await axios.get('/api/backing/mybacking', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    params: {
                        id: allState.loginSuccess.data.data.id,
                    }
                });
                // 상태를 업데이트합니다.
                setBackingList(response.data.data);
            } catch (error) {
                console.error('데이터를 가져오는데 실패했습니다.', error);
            }
        };
        if(allState.loginSuccess?.data.code === '0000' && allState.isLoggedIn === true) {
            fetchData();
        }
    }, []);

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
                    <h2>내 후원 내용</h2>
                </div>
                <ListGroup key="sm" horizontal="sm" className="my-2">
                    <ListGroup.Item style={{width: "20%", marginTop: "30px"}}>후원명</ListGroup.Item>
                    <ListGroup.Item style={{width: "50%", marginTop: "30px"}}>후원설명</ListGroup.Item>
                    <ListGroup.Item style={{width: "15%", marginTop: "30px"}}>후원금액</ListGroup.Item>
                </ListGroup>
                <div>
                    {backingList.map((backing, index) => (
                        <ListGroup key="sm" horizontal="sm" className="my-2">
                            <ListGroup.Item style={{width: "20%", marginTop: "30px"}}>{backing.backingList.backingName}</ListGroup.Item>
                            <ListGroup.Item style={{width: "50%", marginTop: "30px"}}>{backing.backingList.backingExplanation}</ListGroup.Item>
                            <ListGroup.Item style={{width: "15%", marginTop: "30px"}}>{backing.amount}</ListGroup.Item>
                            <Button onClick={() => handleShow(index)} style={{marginLeft: '30px', marginTop: "30px"}}> 상세 보기 </Button>
                        </ListGroup>))}
                </div>
                {/*<h2>{backingList[0].backingList.backingExplanation.toString()}</h2>*/}
            </div>

            <Modal /*{...props}*/ show={show.tf} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        상세 후원 내용
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="grid-example">
                    <Container>
                        <Row>
                            <Col md={3}>
                                후원명 :
                            </Col>
                            <Col md={9}>
                                {show.backingName}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                후원 설명 :
                            </Col>
                            <Col md={9}>
                                {show.backingExplanation}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                후원 금액 :
                            </Col>
                            <Col md={9}>
                                {show.amount}
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>

           {/* <Modal show={show.tf} onHide={handleClose}
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
            </Modal>*/}
        </>
    );
}

export default MyPage;