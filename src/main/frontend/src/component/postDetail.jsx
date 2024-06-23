import React, {useState, useEffect} from "react";
import {Button, Col, FormText, Modal, Row} from "react-bootstrap";
import Form from 'react-bootstrap/Form';


import '../css/postDetail.css';
import axios, {all} from "axios";
import {Link, useLocation, useNavigate, useParams, usepost} from "react-router-dom";
import {useSelector} from "react-redux";

function PostDetail() {
    const movePage = useNavigate();
    const location = useLocation();

    const allState = useSelector(state => state);
    const [backingAmount, setBackingAmount] = useState("");
    const [show, setShow] = useState({tf: false, name: "", backingListId: 0});
    const param = useParams();
    const post = allState.post.data.data[param.id-1];

    const handleClose = () => setShow({tf: false, name: "", backingListId: 0});
    const handleShow = () => setShow({tf: true, name: post.backingName, backingListId: post.id});
    const onAmountHandler = (event) => {
        setBackingAmount(event.currentTarget.value);
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
            <div>
                <div className="postdetail-container">
                    <div>
                        <label>{post.backingName}</label>
                        <img src={"/api/backing/image?imagePath=" + post.imagePath} alt={post.imageName}/>
                        <p>{post.backingExplanation}</p>
                        <p>지금까지 총 후원금액 : {post.allAmount}</p>
                        <Button variant="dark" onClick={() => handleShow()}> 후원하기 </Button>
                    </div>
                </div>
            </div>

            <Modal show={show.tf} onHide={handleClose}
                   size="xlg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>후원하기</Modal.Title>
                    </Modal.Header>
                    {allState.loginSuccess?.data?.code === '0000' && allState.isLoggedIn === true ? (
                        <Modal.Body style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                            <h2 style={{marginBottom: "30px"}}>{show.name}</h2>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                                style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                                <Form.Label>후원할 금액</Form.Label>
                                <div style={{display: "flex"}}>
                                    <Form.Control onChange={onAmountHandler} type="text" rows={3} style={{ width: "80%"}}/>
                                    <h5 style={{marginLeft: "auto"}}>원</h5>
                                </div>
                            </Form.Group>
                        </Modal.Body>) : (
                        <Modal.Body style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                            <h2>로그인을 해주세요</h2>
                        </Modal.Body>
                    )}
                    {allState.loginSuccess?.data?.code === '0000' && allState.isLoggedIn === true ? (
                        <Modal.Footer>
                            <Button variant="primary" type='submit'>
                                후원하기
                            </Button>
                        </Modal.Footer>) : (
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>
                                돌아가기
                            </Button>
                        </Modal.Footer>)}
                </Form>
            </Modal>
        </>
    );
}

export default PostDetail;