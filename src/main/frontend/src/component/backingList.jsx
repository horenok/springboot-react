import React, {useState, useEffect} from "react";
import {Button, Col, Row} from "react-bootstrap";

import '../css/BackingList.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function BackingList() {
    const movePage = useNavigate();

    const [posts, setPosts] = useState([]);

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