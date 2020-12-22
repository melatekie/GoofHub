import React, { useContext } from 'react';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import './Jokespage.css';
import { Imagejokes,Textjokes,Videojokes } from '../components/Jokecard';
import {useFetch,useGetUser} from '../firebase/useFetch';
import { AuthContext } from "../auth/Auth";

function Plus18() {
    //change title on banner
    const title = 'Adults Only';
    //change category name based on data.
    const category = '18+';

    //get user's uid from authentication
    const { currentUser } = useContext(AuthContext);
    const currentUserId = currentUser ? currentUser.uid : null;
    //get user from data cross checking authenticated userID
    const users = useGetUser('users',currentUserId);

    //checks user's age
    const Uage = users.map(items => items.dob);
    const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)

    //get jokes from data
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
                return (<Col md={4} key={data.id}><Textjokes  data={data}/></Col>)
            default: 
                return (<Col md={4} key={data.id}><Textjokes  data={data}/></Col>)     
        }
        
    })
    
    return (
        (getAge(Uage) >= 18 && getAge(Uage) <= 110) && (
        <React.Fragment>
            <Container fluid >
                <Jumbotron className="banner">
                <h1 className ="plus18" style= {{fontSize: "50px"}}>{title} Jokes</h1>
                </Jumbotron>                      
                <Row lg={3}>{items}</Row>
            
            </Container>   
        </React.Fragment>
        )
    );
}

export default Plus18;