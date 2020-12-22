import React, { useContext } from 'react';
import { AuthContext } from "../auth/Auth";
import firebase from "../firebase/firebase";
import './Navibar.css';
import {Navbar,Nav,Form} from 'react-bootstrap';


function Navibar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="Navibar">
      
      <Navbar collapseOnSelect expand="lg" className="nav-color" variant="light">
        <Nav className="nav-siteName">
          
          <Nav.Link href="/">
            <Navbar.Brand>
              <div className="header-container">
                <h1><font size="100">G</font>OOF-<font size="30">H</font>UB</h1>
                  <span className="subheader"> The world of jokes </span>
              </div>
            </Navbar.Brand>
          </Nav.Link>    
        </Nav>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        
        <Nav className="mr-auto"></Nav>
          <Nav className="nav-font">
          
            <Nav.Link href="Submitjoke">SUBMIT A JOKE</Nav.Link> 
            {!currentUser ? 
              ( <Nav.Link href="Login">LOG IN/SIGN UP</Nav.Link> ) :
              (<><Nav.Link href="Profile">{currentUser.displayName}</Nav.Link> 
                <Nav.Link href="Login" onClick={() =>firebase.auth().signOut()}>LOG OUT</Nav.Link></>)
            }
            <Form inline>
            <Nav.Link href="Search">
            <div className="md-form my-0">
              <i className="fas fa-search text-black ml-0" aria-hidden="true"></i>
            </div>
            </Nav.Link>
          </Form>
          </Nav>
        </Navbar.Collapse>
        
      </Navbar>
      </div>          
  );
  
}

export default Navibar;
