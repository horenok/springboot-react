import React, {useState, useEffect} from "react";
import {Button, Col, Row} from "react-bootstrap";

import '../css/BackingList.css';
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

    const onFileChange = (event) => {
        setImagePath(event.target.files[0]);
    }

    const onAddHandler = (event) => {
        console.log(ImagePath);
        let body = {
            backingName: BackingName,
            backingExplanation: BackingExplanation,
            imagePath: ImagePath,
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
                       style={{/*width: '300px', height: '30px', */fontSize: '16px', marginBottom: '5px'}}
                />
                <input type="file" accept="image/*" onChange={onFileChange}
                       style={{width: '300px', height: '30px', fontSize: '16px', marginTop: '10px'}}/>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '10px'}}>
                    <Button variant="dark" style={{margin: '5px', marginLeft: 'auto'}} onClick={onAddHandler}>추가</Button>
                </div>
            </form>
        </div>
    );
}

export default BackingList;