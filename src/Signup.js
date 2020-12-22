import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import './Login.css'
import { Card,Row, Container, Button, Form, Col } from 'react-bootstrap';
import { AuthContext } from "./auth/Auth";
import firebase from "./firebase/firebase";

function SignUp() {
    
    //convert yyyy-mm-dd to mm/dd/yyyy
    function changeDateFormat(inputDate){  // expects Y-m-d
        var splitDate = inputDate.split('-');
        if(splitDate.count === 0){
            return null;
        }
        var year = splitDate[0];
        var month = splitDate[1];
        var day = splitDate[2]; 
    
        return month + '/' + day + '/' + year;
    }
    const regex1 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;//6-20 char, 1 num dig, 1 lower, 1 upper
    const regex = /^\s*$/;//regular expression for blank spaces
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password, first, last, dob, username } = event.target.elements;
       
        const newDate = changeDateFormat(dob.value);
        if(regex.test(first.value) === true) {
            alert('Invalid first name!')
            return false;
        }
        if(regex.test(last.value) === true) {
            alert('Invalid last name!')
            return false;
        }
        if(regex.test(username.value) === true) {
            alert('Invalid Goof name!')
            return false;
        }
       
        if(regex1.test(password.value) === true) {
            alert('Invalid password!')
            return false;  
        }
        try {
          firebase
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then(cred => {//creates user in firestore
                return firebase.firestore().doc('users/' + cred.user.uid).set({
                    first: first.value,
                    last: last.value,
                    email: email.value,
                    dob: newDate,
                    username: username.value,
                    uid: cred.user.uid
                });
                
            })
            .then(() => {//add in displayName & default photo in authentication
                const user = firebase.auth().currentUser;
                user.updateProfile({
                    displayName: username.value,
                    photoURL: "https://firebasestorage.googleapis.com/v0/b/goofhub-team.appspot.com/o/profilepic.png?alt=media&token=d554c921-c31f-4592-8abf-78aca34a7e9d"
                });
            })
            .then(() => {
                window.location.reload();
            });
          
        } catch (error) {
          alert(error);
        }
        // eslint-disable-next-line
    }, []);

    const { currentUser } = useContext(AuthContext);
    
    if (currentUser) {
    return <Redirect to="/" />
    }
     
    return (
        <Container>
        <Row lg={3}>
        <Col lg={3}></Col>
        <Col lg={6}>
        <Card className="login">
            <Card.Body className="ml-4 mr-4">
            <Form onSubmit={handleSignUp}>
            <Card.Title className= "email1">SIGN UP</Card.Title>
            <div className="divider1"></div>

            <Form.Group>
                <Form.Label className="fontlabel">Name</Form.Label>
                <Form.Row >
                    <Col>
                    <Form.Control className="fontfill" required name="first" type="first" placeholder="First name" />
                    </Col>
                    <Col>
                    <Form.Control className="fontfill" required name="last" type="last" placeholder="Last name" />
                    </Col>
                </Form.Row>
            </Form.Group>

            <Form.Group controlId="dob">
            <Form.Label className="fontlabel">Date of Birth</Form.Label>
            <Form.Control className="fontfill" required name="dob" type="date" placeholder="MM/DD/YYYY" />
            </Form.Group>

            <Form.Group>
            <Form.Label className="fontlabel">Goof Name</Form.Label>
            <Form.Control className="fontfill" required name="username" type="username" placeholder="John Doe or an alias" />
            <Form.Text className="text-light fontText">USED FOR CREDITING JOKE SUBMISSION</Form.Text>
            </Form.Group>

            <Form.Group className="emailaddress" controlId="formBasicEmail">
            <Form.Label className="fontlabel">email address</Form.Label>
            <Form.Control className="fontfill" required name="email" type="email" placeholder="name@example.com" />
            <Form.Text className="text-light fontText">YOUR EMAIL IS SAFE WITH US</Form.Text>
            </Form.Group>
            
            <Form.Group controlId="formBasicPassword">
            <Form.Label className="fontlabel">password</Form.Label>
            <Form.Control className="fontfill" required name="password" type="password" placeholder="Enter password" />
            <Form.Text className="text-light fontText">MUST BE 6-20 CHARACTERS LONG, CONTAINS AT LEAST ONE NUMERIC DIGIT, ONE UPPERCASE, ONE LOWERCASE LETTER</Form.Text>
            </Form.Group>
            
        
            <Button
                className="enter1 align-content-center relative"
                size="lg"
                variant="warning"
                type="submit"
                block
                > SIGN UP
            </Button>
            </Form>

            <div className="divider2"></div>
            <Button
                className="enter align-content-center relative  mb-5"
                size="lg"
                variant="warning"
                href="Login"
                block
                > LOG IN HERE
            </Button>      
                            
            </Card.Body>
        </Card>
        </Col>
        <Col lg={3}></Col>
        </Row>
        </Container>
    );
}

export default withRouter(SignUp);