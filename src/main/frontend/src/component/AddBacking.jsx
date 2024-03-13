import React, {useState, useEffect} from "react";
import {Button, Col, Row} from "react-bootstrap";

import '../css/BackingList.css';
import Container from "react-bootstrap/Container";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function BackingList() {
    const movePage = useNavigate();

    const [posts, setPosts] = useState([]);

    const addNewPost = () => {

    }

    return (
        <div>
            <Button variant="dark" style={{margin: '30px', float: "right"}} onClick={addNewPost}> 후원글 추가 </Button>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <img src={`/api/posts/images/${post.imageFilename}`} alt={post.title} />
                </div>
            ))}
        </div>
    );
}

export default BackingList;