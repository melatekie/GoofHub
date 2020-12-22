import React, { useContext, useState } from 'react';
import './Submitjoke.css';
import { AuthContext } from "../auth/Auth";
import { Card, Col, Row, Form, Button } from 'react-bootstrap';
import firebase from "../firebase/firebase";
import  {useGetUser} from '../firebase/useFetch';

export default function SubmitText() { 
    const [Category, setCategory] = useState("other");
    const [Joke, setJoke] = useState("");
    const [keywords, setKeywords] = useState("");
    const [profilename, setProfileName] = useState("");
   
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
   
    
    const handleSubmit = (e) => {
        e.preventDefault();

        firebase.firestore()
        .collection("jokes").doc()
        .set({
            category: [Category],
            content: Joke,
            keywords: keywordsArr,
            name: name,
            createdAt: new Date().toJSON().split("T")[0],
            release: false,
            type: "text",
            uid: currentUser.uid
        })
        .then(() => {
            alert("Your joke will be reviewed!");
        })
        .catch((error) => {
            alert(error.message);
        });
    
        setCategory("other");
        setJoke("");
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
    <Card className="submitContainer submitContainerText">
        <Card.Body className="submitTitle">SUBMIT YOUR <span className = "typejoke" >TEXT</span> JOKE</Card.Body>
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
                <Form.Label className="submitLabel">Enter Your Joke</Form.Label>
                <Form.Control className="submitPlaceholder"
                    as="textarea" 
                    rows={3} 
                    required
                    placeholder="Make us laugh with your words!"
                    value={Joke}
                    onChange={(e) => setJoke(e.target.value)}
                    />
              
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