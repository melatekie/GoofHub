import React, {useState, useContext} from 'react';
import { AuthContext } from "../auth/Auth";
import firebase from "./firebase";
import { Container, Row, Col, Form, Button,ResponsiveEmbed, Card } from 'react-bootstrap';
import {useSubmission, useReport} from "./useFetch";
import { EditFields } from './adminEdit';
import JSONPretty from 'react-json-pretty';
import '../components/Jokecard.css';

function AddData() {
    //get user's uid from authentication
    const { currentUser } = useContext(AuthContext);
    const currentUserId = currentUser ? currentUser.uid : null;

    const joke = useSubmission('jokes');
    //console.log(joke);
    const sortedByDate = joke.sort(function(a, b) {
        var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt);
        return dateA - dateB;
    });
    const items = JSON.stringify(sortedByDate);
 
    const report = useReport('report');
    const reports = JSON.stringify(report);

    const reportjokeId = [];
    report.filter((doc) => reportjokeId.push(doc.jokeId));

    const [relVal, setRelVal] = useState("");
    
    function onDelete(jokes) {
        firebase.firestore().collection('jokes')
          .doc(jokes.id)
          .delete()
          .then(() => {console.log("Deleted in firestore!");
          }).catch((error) => {alert(error.message);
          });       

        if(jokes.type !== 'image'){//deletes image from storage
            return false;
        }
        let imageRef = firebase.storage().refFromURL(jokes.content);
        imageRef.delete().then(() => {
            console.log("Deleted in storage");
        }).catch(err => console.log(err));
    };
    
    const boolVal = relVal === 'true'? Boolean(relVal) : false
    function editRelease(jokes) {
          firebase.firestore().collection('jokes')
            .doc(jokes.id)
            .update({release: boolVal})
            .then(() => {console.log("released!");
            }).catch((error) => {alert(error.message);
            });       
    };
  
    const type = (info) => {
        switch (info.type){
        case info.type='image': 
            return (<Card.Img  className="jokebox2" variant="top" src={info.content} />)
        case info.type='video': 
            return (<><div style={{ width: '500px', height: 'auto' }}>
                        <ResponsiveEmbed aspectRatio="16by9">
                            <embed type="image/svg+xml" src={info.content} />
                        </ResponsiveEmbed>
                    </div></>)
        case info.type='text': 
            return (<div> {info.content}</div> )
        default: 
            return null
    }}

    return(
        //only one user id allow to see content
        (currentUserId === '4EGXhu4fS1f8kTgo5BseoUhQdkw2') && (
        <Container fluid>
        <br></br>

            <Row md={2}>
                <Col>
                    <h4>NEW JOKES</h4>
                    <JSONPretty id="json-pretty" data={items} ></JSONPretty>
                </Col>
                <Col>
                {joke.map((info) => (
                    
                <div key={info.id}>
                <Form >
                <Form.Group as={Row} className="align-items-left">
                <Form.Label  column sm="auto">{info.id}</Form.Label>
                <Button size='sm' variant='danger' onClick={() => onDelete(info)}>
                        DELETE FOREVER!
                </Button>
                </Form.Group>

                <Form.Group as={Row} className="align-items-left">
                <Form.Label column sm="auto">{type(info)}</Form.Label>
                </Form.Group>
                
                <Form.Group as={Row} id="formGridCheckbox" className="align-items-left">
                    <Col sm="auto">
                    <Form.Check inline
                        label="RELEASE IT"
                        type="checkbox"
                        value='true'
                        onChange={(e) => setRelVal(e.currentTarget.value)}
                        />
                    <Button size='sm' onClick={() => editRelease(info)} >
                        Update
                    </Button>
                    </Col>
                </Form.Group>
                </Form >  
                
                <EditFields  joke={info} />
                <div style={{ border: "double" }}></div>
                <br></br>
                </div>
                
                ))}
                </Col>
            </Row>
            <Row md={2}>
                <Col>
                    <h4>REPORT</h4>
                    <JSONPretty id="json-pretty" data={reports} ></JSONPretty>
                </Col>
                <Col>
            
                </Col>
            </Row>
        </Container>
        )
    );
}
export default AddData;
