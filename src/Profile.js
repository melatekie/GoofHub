import React, { useContext, useState } from "react";
import { AuthContext } from "./auth/Auth";
import { Row, Col, Form,Card, Button } from "react-bootstrap";
import firebase from "./firebase/firebase";
import {useGetUser} from "./firebase/useFetch";
import './Profile.css';

const Profile = () => {
  //get user's uid from authentication
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  //get user from data cross checking authenticated userID
  const users = useGetUser('users',currentUserId);
  //const otherUser = useGetUsername('users');

  const [name, setName] = useState("");
  const [newEmail, setnewEmail] = useState("");
  const [currentPassword1, setcurrentPassword1] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [currentPassword, setcurrentPassword] = useState("");
  
  const regex = /^\s*$/;//regular expression for blank spaces

  //updates username and displayName
  function editName(users) {
    
    //input cannot be a blank space
    if(regex.test(name) === true){
      alert('Invalid input');
      setName("");
      return false;
    }
    
    const updateUsername = {
      username: name,
    };
    firebase.firestore().collection("users")
    .doc(users.id)
    .update(updateUsername)//update in firestore
    .then(() => {//update in authentication
      const user = firebase.auth().currentUser;
      user.updateProfile({
          displayName: name
          });
    }).then(() => {
        alert("Goof name has changed.");
        window.location.reload();
    }).catch((error) => {alert(error.message);
    });

    setName("");
    
};

  //needs to reauthenticate when changing email or password
  function reauthenticate(currentPassword) {
    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  //updates email in firestore and authentication
  function changeEmail(users, currentPassword1, newEmail) {
    const regex1 = /[\w\d.-]+@[\w\d.-]+\.[\w\d.-]+/;//regular expression for valid email
    //input cannot be a blank space
    if (regex1.test(newEmail) === false || regex.test(newEmail) === true) {
      alert("Incorrect email format!");
      setcurrentPassword1("");
      setnewEmail("");
      return false;
    }

    const updateEmail = {
      email: newEmail,
    };
    reauthenticate(currentPassword1)
    .then(() => {//creates user in firestore
      return firebase.firestore().collection("users")
      .doc(users.id)
      .update(updateEmail)//update in firestore
    }).then(() => {
      const user = firebase.auth().currentUser;
      user.updateEmail(newEmail).then(() => {
       alert("Email updated!");
      }).catch((error) => { alert(error.message); });
    }).catch((error) => {console.log("Incorrect email format!") });
    setcurrentPassword1("");
    setnewEmail("");
  }

  const regex2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;//6-20 char, 1 num dig, 1 lower, 1 upper
  //change password 
  function changePassword(currentPassword, newPassword) {
    const nPassword = (regex2.test(newPassword) === true) ? null : newPassword;
    
    reauthenticate(currentPassword)
      .then(() => {
        const user = firebase.auth().currentUser;
        user.updatePassword(nPassword).then(() => {
          alert("Password updated!");
        }).catch((error) => { alert(error.message); });
    }).catch(() => { alert("Password is badly formatted. It must be 6-20 characters long!"); });
    setcurrentPassword("");
    setnewPassword("");
  }

  return (
    currentUser && ( 
      <Row lg={3}>
      <Col lg={2}></Col>
      <Col lg={8}>
      <Card className="proCard">
      
      {users.map((items) => (
      <Row key={items.id}>
        <Col md={3} className="mt-5 align-items-center ">
          <img
            src={currentUser.photoURL===null? "https://firebasestorage.googleapis.com/v0/b/goofhub-team.appspot.com/o/profilepic.png?alt=media&token=d554c921-c31f-4592-8abf-78aca34a7e9d" : currentUser.photoURL}
            alt="Profile"
            className="rounded-circle proimg-fluid"
          />
          <div className="btn-lg proAddBtn">
          <i className="fas fa-plus-circle"></i></div>
        <Row>
            <Col  className="mt-5 align-items-center profile-header">
              <Card className="proSideCard">
                <Card.Title className="proSideName">{items.first} {items.last}</Card.Title>
                <Card.Text className="proSideUser">{items.username}</Card.Text>
                <Card.Text className="proSideEmail">{items.email}</Card.Text>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md>
      <Card.Body className="proCardBody">
        <Card.Title className="proTitle">ACCOUNT SETTINGS</Card.Title>  
        <Form className="proForm" >
          <Form.Row className="progroup proLineTop">
            <Form.Group as={Col} >
              <Form.Label  className="proWhite">NAME</Form.Label>
            </Form.Group>
            <Form.Group as={Col} >
              <Form.Label  className="proText" >{items.first} {items.last}</Form.Label>
            </Form.Group>
            <Form.Group as={Col}></Form.Group>
          </Form.Row>

          <Form.Row className="progroup">
            <Form.Group as={Col} >
              <Form.Label className="proWhite">DATE OF BIRTH</Form.Label>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label  className="proText">{items.dob}</Form.Label>
            </Form.Group>
            <Form.Group as={Col} ></Form.Group>
          </Form.Row>
               
          <Form.Row className="progroup ">
            <Form.Group  as={Col} >
              <Form.Label className="proWhite" >GOOF NAME CHANGE</Form.Label>
            </Form.Group>
            <Form.Group as={Col} >
              <Form.Control required 
                className="procontrol proText" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="sm" 
                type="username" 
                placeholder={items.username}/>
            </Form.Group>
            <Form.Group as={Col} >
                <div type="submit" onClick={() => editName(items)} className="profas">
                {/* <i className="fas fa-pen"></i> */}
                <Button
                className="enter1 align-content-center "
                size="sm"
                variant="outline-light"
                style = {{color: "black", fontSize: "25px"}}
                > UPDATE
            </Button>
                </div>
            </Form.Group>
          </Form.Row>
          

          <Form.Row className="progroup">
            <Form.Group as={Col} >
              <Form.Label className="proWhite1">EMAIL CHANGE</Form.Label>
            </Form.Group>  
            <Form.Group as={Col} >
                <Form.Control required 
                  controlid="formPlaintextEmail"
                  className="procontrol proEmail" 
                  value={newEmail}
                  onChange={(e) => setnewEmail(e.target.value)}
                  size="sm" 
                  type="email" 
                  placeholder={items.email}/>
           
                <Form.Control required 
                  controlid="formPlaintextPassword"
                  className="procontrol proText1" 
                  value={currentPassword1}
                  onChange={(e) => setcurrentPassword1(e.target.value)}
                  size="sm" 
                  type="password" 
                  placeholder="Current Password"/>
            </Form.Group>
            <Form.Group as={Col}>
                <div type="submit" onClick={() => changeEmail(items,currentPassword1,newEmail)} className="profas1">
                <Button
                className="enter1 align-content-center "
                size="sm"
                variant="outline-light"
                style = {{ color: "black", fontSize: "25px"}}
                > UPDATE
            </Button></div>
            </Form.Group>
          </Form.Row>

          <Form.Row className="proLineBot">
            <Form.Group as={Col}  >
              <Form.Label className="proWhite1" >PASSWORD CHANGE</Form.Label>
            </Form.Group>  
            <Form.Group as={Col} >
            <Form.Control required 
                controlid="formPlaintextPassword1"
                className="procontrol proEmail" 
                value={currentPassword}
                onChange={(e) => setcurrentPassword(e.target.value)}
                size="sm" 
                type="password" 
                placeholder="Current Password"/>
              <Form.Control required 
                controlid="formPlaintextPassword2"
                className="procontrol proText1" 
                value={newPassword}
                onChange={(e) => setnewPassword(e.target.value)}
                size="sm" 
                type="password" 
                placeholder="New Password" />
            </Form.Group>  
            <Form.Group as={Col}>
                <div type="submit" onClick={() => changePassword(currentPassword,newPassword)} className=" profas1">
                <Button
                className="enter1 align-content-center "
                size="sm" 
                variant="outline-light"
                style = {{color: "black", fontSize: "25px"}}
                > UPDATE
            </Button></div>  
            </Form.Group>
          </Form.Row>
        </Form>
      </Card.Body>
          
        </Col>
      </Row>
      ))}
     
      </Card>
    </Col>
    <Col lg={2}></Col>
    </Row>
    )
  )
}

export default Profile;
