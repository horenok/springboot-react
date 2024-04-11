import React, {useState, useEffect} from "react";
import {Button, Col, FormText, Modal, Row} from "react-bootstrap";
import Form from 'react-bootstrap/Form';


import '../css/BackingList.css';
import axios, {all} from "axios";
import {useNavigate} from "react-router-dom";
import FormContext from "react-bootstrap/FormContext";
import {useSelector} from "react-redux";

function BackingList() {
    const movePage = useNavigate();

    const allState = useSelector(state => state);
    const [posts, setPosts] = useState([]);
    const [backingAmount, setBackingAmount] = useState("");
    const [show, setShow] = useState({tf: false, name: ""});
    const handleClose = () => setShow({tf: false, name: ""});
    const handleShow = (index) => setShow({tf: true, name: posts[index].backingName});
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
            backingAmount: backingAmount
        }
        axios.post('/api/backing/backing', body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).
        then((res) =>{
            if(res.data.code === '0000') {
                alert("backingSuccess");
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
                                <h2>{post.backingName}</h2>
                                <Button variant="dark" onClick={() => handleShow(index)}> 후원하기 </Button>
                            </div>
                            <p>{post.backingExplanation}</p>
                            <img src={"/api/backing/image?imagePath=" + post.imagePath} alt={post.imageName} />
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
                    <Button variant="primary" type='submit' onClick={handleClose}>
                        후원하기
                    </Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default BackingList;