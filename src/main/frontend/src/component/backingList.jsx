import React, {useState, useEffect} from "react";
import {Button, Col, FormText, Modal, Row} from "react-bootstrap";
import Form from 'react-bootstrap/Form';


import '../css/BackingList.css';
import axios, {all} from "axios";
import {Link, useNavigate} from "react-router-dom";
import FormContext from "react-bootstrap/FormContext";
import {useDispatch, useSelector} from "react-redux";
import {postAction} from "../actions/postAction";
import {loginAction} from "../actions/loginAction";

function BackingList() {
    const movePage = useNavigate();
    const dispatch = useDispatch();

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
        dispatch(postAction()).then((res) => { //posts redux에 state 저장
            if (res.payload.data.code == '0000') {
                setPosts(res.payload.data.data);
            }
        });
    }, []); //두번째 인자인 [] 안넣으면 렌더링될때마다 호출하여 무한호출

    const addNewPost = () => {
        {allState.loginSuccess?.data?.code === '0000' && allState.isLoggedIn === true ? (
        movePage('/addBacking')) : (alert("로그인을 해주세요"))}
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
                <div className="button-container">
                    <Button variant="dark" style={{margin: '30px'}} onClick={addNewPost}> 후원글 추가 </Button>
                </div>
                <div className="post-container">
                    {posts?.map((post, index) => (
                        <div key={index}>
                            <div>
                                {/*<h2>{post.backingName}</h2>*/}
                                <h2>
                                    <Link to={`/post/${post.id}`}>{post.backingName}</Link>
                                </h2>
                                <Button variant="dark" onClick={() => handleShow(index)}> 후원하기 </Button>
                            </div>
                            <p>{post.backingExplanation}</p>
                            <img src={"/api/backing/image?imagePath=" + post.imagePath} alt={post.imageName} style={{margin: '30px'}}/>
                        </div>
                    ))}
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

export default BackingList;