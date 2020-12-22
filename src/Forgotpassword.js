import React, { useState, useContext } from 'react';
import { Redirect } from "react-router";
import './Login.css'
import { Card, Col, Row, Container, Button, Form } from 'react-bootstrap';
import { AuthContext } from "./auth/Auth";
import firebase from "./firebase/firebase";

function ForgotPassword({ history }) {
    
    const [email, setEmail] = useState("");
    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "email") {
        setEmail(value);
        }
    };
    const sendResetEmail = event => {
        event.preventDefault();
       
        firebase.auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                history.push("/Login");
            })
            .catch((error) => {
                alert(error);
            });
    };
    const { currentUser } = useContext(AuthContext);
    
    if (currentUser) {
    return <Redirect to="/" />
    }
    return (
   
        <Container>
        <Row lg={3}>
        <Col lg={3}></Col>
        <Col lg={6}>
        <Card className="login ">
            <Card.Body className=" ml-4 mr-4">
            <Form  onSubmit={sendResetEmail}>
            <Card.Title className= "email1">PASSWORD RESET</Card.Title>
            <div className="divider1"></div>
            <Form.Group className="emailaddress" controlId="formBasicEmail">
            <Form.Label className="fontlabel">EMAIL ADDRESS</Form.Label>
            <Form.Control className="fontfill" required onChange={onChangeHandler} name="email" type="email" placeholder="name@example.com" />
            </Form.Group>
                        
           
            <Button
                className="enter align-content-center relative"
                size="lg"
                variant="warning"
                type="submit"
                block
                >SEND ME A RESET LINK
            </Button>
            </Form>
           
            <div className="divider2"></div>
            <Button
                className="enter align-content-center relative  mb-5"
                size="lg"
                variant="warning"
                href="LogIn"
                block
                >LOG IN HERE
            </Button>        
            </Card.Body>
        </Card>
        </Col>
        <Col lg={3}></Col>
        </Row>
        </Container>
   
    );
}
export default ForgotPassword;