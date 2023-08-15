import React, {useState} from 'react';
import axios from 'axios';
import UpdateIcon from "@mui/icons-material/Update";
import {Button} from "@mui/material";


function ImageUpload() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            'img': selectedFile
        }
        axios.post('/upload', data, {
            headers: {'Content-Type': 'multipart/form-data'},
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            alert(err)
        });
    };


    return (
        <div>
            <h1>Image Upload</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange}/>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}
;

export default ImageUpload;
