import React, {useState} from "react";
import {Button, Col, Row} from "react-bootstrap";

import '../css/bar1.css';
import Container from "react-bootstrap/Container";

function Bar1() {

    const [posts, setPosts] = useState([
        { id: 1, imgSrc: require('../images/dog1.jpeg'), title: '후원1', description: '후원설명1' },
        { id: 2, imgSrc: require('../images/dog2.jpeg'), title: '후원2', description: '후원설명2' },
        { id: 3, imgSrc: require('../images/dog3.jpeg'), title: '후원3', description: '후원설명3' }
    ]);

    const addNewPost = () => {
        const newPost = {
            id: posts.length + 1,
            imgSrc: require('../images/dog1.jpeg'),
            title: '새로운 후원',
            description: '새로운 후원 설명'
        };
        setPosts([...posts, newPost]);
    }

    return (
        <>
            <div className="main_bg"/>
            <Button variant="dark" style={{margin: '30px', float: "right"}} onClick={addNewPost}> 후원글 추가 </Button>
            <Container style={{position: "relative", top: "100px"}}>
                {/*<Row>
                    <Col sm>
                        <img src={require('../images/dog1.jpeg')} className="list_img"/>
                        <h4>후원1</h4>
                        <p>후원설명1</p>
                    </Col>
                    <Col sm>
                        <img src={require('../images/dog2.jpeg')} className="list_img"/>
                        <h4>후원2</h4>
                        <p>후원설명2</p>
                    </Col>
                    <Col sm>
                        <img src={require('../images/dog3.jpeg')} className="list_img"/>
                        <h4>후원3</h4>
                        <p>후원설명3</p>
                    </Col>
                </Row>*/}
                <Row>
                    {posts.map(post => (
                        <Col sm key={post.id}>
                            {/* 이미지 경로를 동적으로 설정 */}
                            <img src={post.imgSrc} className="list_img" alt={post.title} />
                            <h4>{post.title}</h4>
                            <p>{post.description}</p>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default Bar1;