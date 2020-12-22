import React from 'react';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import './Jokespage.css';
import { Imagejokes,Textjokes,Videojokes } from '../components/Jokecard';
import {useFetch} from '../firebase/useFetch';

function Music() {
    //change title accordingly.
    const title = 'Music';
    //change category name based on data.
    const category = 'music';
    const jokes = useFetch('jokes',category.toLowerCase());

    //sort date by decreasing order
    const sortedByDate = jokes.sort(function(b, a) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt);
        return dateA - dateB;
    });
    
    const items = sortedByDate.map((data) => {
        switch (data.type){
            case data.type='image': 
                return (<Col md={4} key={data.id}><Imagejokes data={data}/></Col>) ;
            case data.type='video': 
                return (<Col md={4} key={data.id}><Videojokes data={data}/></Col>) ;
            case data.type='text': 
                return (<Col md={4} key={data.id}><Textjokes  data={data}/></Col>) ;
            default: 
                return null     
        }
        
    })
    
    return (
        
        <React.Fragment>
            <Container fluid >
                <Jumbotron className="banner">
                <h1 style= {{fontSize: "50px"}}>{title} Jokes</h1>
                </Jumbotron>                      
                <Row lg={3}>{items}</Row>
            
            </Container>   
        </React.Fragment>
    );
}

export default Music;