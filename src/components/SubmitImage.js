import React, { useContext, useState } from 'react';
import './Submitjoke.css';
import { AuthContext } from "../auth/Auth";
import { Card, Col, Row, Form, Button } from 'react-bootstrap';
import firebase from "../firebase/firebase";
import  {useGetUser} from '../firebase/useFetch';

export default function SubmitImage() { 
    const [Category, setCategory] = useState("other");
    const [keywords, setKeywords] = useState("");
    const [profilename, setProfileName] = useState("");
   
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState("");

    //split keywords to an array
    const keywordsArr = keywords.toLowerCase().split(/\s*[\s,]\s*/);

    //get user's uid from authentication
    const { currentUser } = useContext(AuthContext);
    const currentUserId = currentUser ? currentUser.uid : null;
    //get user from data cross checking authenticated userID
    const users = useGetUser('users',currentUserId);
    
    //Pulling out only the field for username
    const Uname = users.map(items => items.username);

    //if checkbox is used then username is Anonymous, otherwise username in profile is used
    const name = profilename !== "Anonymous" ? Uname[0] : "Anonymous";

    const handleChange = e => {
        const file = e.target.files[0];

        if (file) {
            const fileType = file["type"];
            const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
            if (validImageTypes.includes(fileType)) {
                setError("");
                setImage(file);
            } else {
                console.log("error");
                setError("error please upload an image file");
            }
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (image) {
            // add to image folder in firebase
            const uploadDate = new Date();
            const imageName = `${uploadDate.toISOString()}-${image.name}`;
            const uploadTask = firebase.storage().ref(`images/${imageName}`).put(image);
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on("state_changed", snapshot => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            error => {
                // error function ....
                console.log(error);
                setError(error);
            },
            () => {
                // complete function ....
                firebase.storage()
                  .ref(`images/${imageName}`)
                  .getDownloadURL() // get download url
                  .then(url => {
                    console.log(url);
                    setUrl(url);
                    setProgress(0);
                    firebase.firestore()
                    .collection("jokes").doc()
                    .set({
                        category: [Category],
                        content: url,
                        keywords: keywordsArr,
                        name: name,
                        createdAt: new Date().toJSON().split("T")[0],
                        release: false,
                        type: "image",
                        uid: currentUser.uid
                    })
                    .then(() => {
                        alert("Your joke will be reviewed!");
                    })
                  }).catch((error) => {
                    alert(error.message);
                    });
            });
        } else {
        setError("Error please choose an image to upload");
        }
        setCategory("other");
        setUrl("");
        setKeywords("");
        setProfileName("");
    };

    //age limit for 18+ category submission
    const Uage = users.map(items => items.dob);
    const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)

    return (
        <>
    <Row lg={3}>
    <Col lg={2}></Col>
    <Col lg={8}>
    <Card className="submitContainer submitContainerImage">
        <Card.Body className="submitTitle">SUBMIT YOUR <span className = "typejoke" >IMAGE</span> JOKE</Card.Body>
        <Form  onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label className="submitLabel mt-3">What kind of Laugh is your Joke?</Form.Label>
                <Form.Control 
                    className="submitPlaceholder"
                    required
                    as="select" 
                    value={Category}
                    onChange={(e) => setCategory(e.target.value)}
                    >
                    <option value="other">SELECT A CATEGORY</option>
                    <option value="long">LONG</option>
                    <option value ="music">MUSIC</option>
                    <option value = "short">QUICK</option>
                    <option value = "holiday">HOLIDAY</option>
                    
                    {(getAge(Uage) >= 18 && getAge(Uage) <= 110)?
                    <option value = "18+">ADULTS ONLY</option>: null }
                </Form.Control>
                <Form.Text className="text-light submitSmallText">CAN'T DECIDE? LEAVE IT ON 'SELECT A CATEGORY' AND LEAVE THE REST TO US</Form.Text>
            
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label className="submitLabel">Upload Your Image Joke</Form.Label>
                <Form.File
                    className="position-relative text-light"
                    required
                    name="file"
                    
                    onChange={handleChange}
                    
                    />
                     <div style={{ height: "auto" }}>
                        <p style={{color:"red"}}>{error}</p>
                        {progress > 0 ? <progress value={progress} max="100" /> : ""}
                    </div>
                    <div className=" align-content-center">
                    {url ? (
                        <img src={url} 
                            width="300px"
                            height="auto" 
                            alt="Uploaded images" />
                    ) : null}
                    </div>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="submitLabel">Keywords</Form.Label>
                <Form.Control className="submitPlaceholder"
                    required
                    placeholder="One Liner, Knock Knock"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)} 
                    />
            </Form.Group>

            <Form.Check inline className="submitAnon"
            label="SUBMIT AS ANONYMOUS"
            type="checkbox"
            value="Anonymous"
            onChange={(e) => setProfileName(e.currentTarget.value)}
            />

            <Button
                className="submitButton"
                size="sm"
                variant="warning"
                type="submit"
                block
                > SUBMIT
            </Button>
        </Form>
    </Card>
    </Col>
    <Col lg={2}></Col>
    </Row>
    </>

    );         
}