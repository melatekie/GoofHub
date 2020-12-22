import React from 'react';
import './Home.css';
import JotD from './components/JotD';
import Cards1 from './components/card'
import { Container, Row, Col } from 'react-bootstrap'


function Home(){
    return(
        <Container>
        <br></br>
        
        <Row lg={3}>  
            <Col  md={2} lg={3}></Col>  
            <Col  md={8} lg={6}><JotD /></Col>
            <Col  md={2} lg={3}></Col>
        </Row>
      

        <h1 className="home-container">What kind of laugh are you looking for?</h1>
        <Cards1 />
        
        
        </Container>
                
    );
}   

export default Home;
       
            
                
       
                 
    