import React, { useContext } from 'react';
import './card.css';
import { Card, CardDeck } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { AuthContext } from "../auth/Auth";
import  {useGetUser} from '../firebase/useFetch';

function Cards1() {
  
  //get user's uid from authentication
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  //get user from data cross checking authenticated userID
  const users = useGetUser('users',currentUserId);

  //checks user's age
  const Uage = users.map(items => items.dob);
  const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
  
  return (
<div className= "frame" 
  style={{maxWidth:"1100px", 
  height: "415px",
  overflow:"auto",
  padding:"2px", 
  paddingTop: "10px"}}
  >
    <Container className = "cardcontainer"> 
        <Row >
            <Col>
    <CardDeck className = "deck1">
    <Card className="categories">
  <Card.Img 
  className = "types" 
  src="https://firebasestorage.googleapis.com/v0/b/goofhub-team.appspot.com/o/HOLIDAY.png?alt=media&token=e47fb8f0-6bcf-4977-a3d9-afd4a4cd5be9" 
  alt="Card image" />  
  <a href="Holiday" className="btn btn-primary stretched-link">
  </a>
  </Card>

  <Card className="categories">
    <Card.Img 
    className = "types" 
    src="https://firebasestorage.googleapis.com/v0/b/goofhub-team.appspot.com/o/long.png?alt=media&token=700e2c0b-2fa0-4e3a-90d7-2cbc3ff0e6c5" 
    alt="Card image" />
    <a href="Long" className="btn btn-primary stretched-link">
    </a>  
  </Card>

  <Card className="categories">
  <Card.Img 
  className = "types" 
  src="https://firebasestorage.googleapis.com/v0/b/goofhub-team.appspot.com/o/Musiccard.png?alt=media&token=8fc6580d-d63c-427f-abbe-5d140a8386fc" 
  alt="Card image" />  
  <a  href="Music" className="btn btn-primary stretched-link">
   </a>
  </Card>


  <Card className="categories">
  <Card.Img 
  className = "types" 
  src="https://firebasestorage.googleapis.com/v0/b/goofhub-team.appspot.com/o/QUICK.png?alt=media&token=20f8cdea-24a4-40a8-9793-0220d9668d60" 
  alt="Card image" />  
  <a href="Short" className="btn btn-primary stretched-link">
    </a>
  </Card>

<br></br>
 
{currentUser && !(getAge(Uage) >= 18 && getAge(Uage) <= 110)? null:
     

  <Card className="categories">
    <Card.Img 
    className = "types" 
    src="https://firebasestorage.googleapis.com/v0/b/goofhub-team.appspot.com/o/ADULT.png?alt=media&token=f6389142-3a5c-47fa-9c73-fa69644c960e" 
    alt="Card image" />  
    <a href="plus18" className="btn btn-primary stretched-link">
    </a>
  </Card>

}</CardDeck>
</Col></Row>





</Container></div>
);
}

export default Cards1;