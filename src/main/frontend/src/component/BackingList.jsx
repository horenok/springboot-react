import React, {useState, useEffect} from "react";
import {Button, Col, Row} from "react-bootstrap";

import '../css/BackingList.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

/*function BackingList() {

    const [posts, setPosts] = useState([
        /!*{ id: 1, imgSrc: require('../images/dog1.jpeg'), title: '후원1', description: '후원설명1' },
        { id: 2, imgSrc: require('../images/dog2.jpeg'), title: '후원2', description: '후원설명2' },
        { id: 3, imgSrc: require('../images/dog3.jpeg'), title: '후원3', description: '후원설명3' }*!/
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
                {/!*<Row>
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
                </Row>*!/}
                <Row>
                    {posts.map(post => (
                        <Col sm key={post.id}>
                            {/!* 이미지 경로를 동적으로 설정 *!/}
                            <img src={post.imgSrc} className="list_img" alt={post.title} />
                            <h4>{post.title}</h4>
                            <p>{post.description}</p>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}*/

function BackingList() {
    const movePage = useNavigate();

    const [posts, setPosts] = useState([]);

    /*useEffect(() => {
        axios.get("/api/backing/getlist")
            .then(response => {
                setPosts(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    }, []);*/

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

    return (
        <div>
            <div className="button-container">
                <Button variant="dark" style={{margin: '30px'}} onClick={addNewPost}> 후원글 추가 </Button>
            </div>
            <div className="post-container">
                {posts.map((post, index) => (
                    <div key={index}>
                        <h2>{post.backingName}</h2>
                        <p>{post.backingExplanation}</p>
                        <img src={"/api/backing/image?imagePath=" + post.imagePath} alt={post.imageName} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BackingList;