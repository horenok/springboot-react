import React, {useState, useEffect} from "react";
import {Button, Col, Row} from "react-bootstrap";

import axios from "axios";
import {useNavigate} from "react-router-dom";

function BackingList() {
    const movePage = useNavigate();

    const [BackingName, setBackingName] = useState("");
    const [BackingExplanation, setBackingExplanation] = useState("");
    const [ImagePath, setImagePath] = useState(null);

    const onBackingNameHandler = (event) => {
        setBackingName(event.currentTarget.value);
    }
    const onBackingExplanationHandler = (event) => {
        setBackingExplanation(event.currentTarget.value);
    }

    const onFileChangeHandler = (event) => {
        event.preventDefault();
        setImagePath(event.target.files[0]);
    }

    const onAddHandler = (event) => {
        console.log(ImagePath);
        let body = {
            backingName: BackingName,
            backingExplanation: BackingExplanation,
            imagePath: ImagePath,
        }

        if(body.backingName === "" || body.backingExplanation === "") {
            alert("후원명 혹은 후원에 대한 설명이 입력되지 않았습니다.");
            return;
        }
        if(body.imagePath === null) {
            alert("이미지를 선택해주세요");
            return;
        }

        axios.post('/api/backing/addnewbacking', body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).
        then((res) =>{
            if(res.data.code === '0000') {
                movePage('/backingList')
            }
        })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <form style={{
                display: 'flex', flexDirection: 'column'}}>
                <label>후원명</label>
                <input type="text" value={BackingName} onChange={onBackingNameHandler}
                       style={{width: '300px', height: '30px', fontSize: '16px', marginBottom: '5px'}}
                />
                <label>후원 설명</label>
                <textarea type='text' value={BackingExplanation} onChange={onBackingExplanationHandler}
                       style={{fontSize: '16px', marginBottom: '5px'}}
                />
                <input type="file" accept="image/*" onChange={onFileChangeHandler}
                       style={{width: '300px', height: '30px', fontSize: '16px', marginTop: '10px'}}/>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '10px'}}>
                    <Button variant="dark" style={{margin: '5px', marginLeft: 'auto'}} onClick={onAddHandler}>추가</Button>
                </div>
            </form>
        </div>
    );
}

export default BackingList;