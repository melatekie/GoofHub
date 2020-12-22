import React, {useState} from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import firebase from "./firebase";

export const EditFields = ({ joke }) => {
    const [category, setCategory] = useState(joke.category);
    const [keywords, setKeywords] = useState(joke.keywords);
    const [type, setType] = useState(joke.type);
    const [content, setContent] = useState(joke.content);
    
    const categoryArr = category.toString().split(',');
    function editCat() {
        firebase.firestore().collection('jokes')
          .doc(joke.id)
          .update({...joke, category: categoryArr})
          .then(() => {console.log("updated!");
          }).catch((error) => {alert(error.message);
          });       
    };
    const keywordsArr = keywords.toString().split(',');
    function editKey() {
        firebase.firestore().collection('jokes')
          .doc(joke.id)
          .update({...joke, keywords: keywordsArr})
          .then(() => {console.log("updated!");
          }).catch((error) => {alert(error.message);
          }); 
        
    };
    function editType() {
        firebase.firestore().collection('jokes')
        .doc(joke.id)
        .update({...joke, type: type})
        .then(() => {console.log("updated!");
        }).catch((error) => {alert(error.message);
        }); 
        
    };

    function editContent() {
        firebase.firestore().collection('jokes')
        .doc(joke.id)
        .update({...joke, content: content})
        .then(() => {console.log("updated!");
        }).catch((error) => {alert(error.message);
        }); 
        
    };

    return(
        <Form>
            {joke.type !== 'image' ? 
            <Form.Group as={Row} className="align-items-left">
                <Form.Label column sm="auto">content:</Form.Label>
                <Col sm="auto">
                <Form.Control
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    /> 
                </Col>
                <Button size='sm' onClick={() => editContent()}>
                    Update
                </Button>
            </Form.Group>
            : null
            }
            <Form.Group as={Row} className="align-items-left">
                <Form.Label column sm="auto">category:</Form.Label>
                <Col sm="auto">
                <Form.Control
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    />
                </Col>
                <Button size='sm' onClick={() => editCat()}>
                    Update
                </Button>
            </Form.Group>
            <Form.Group as={Row} className="align-items-left">
                <Form.Label column sm="auto">keywords:</Form.Label>
                <Col sm="auto">
                <Form.Control
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    /> 
                </Col>
                <Button size='sm' onClick={() => editKey()}>
                    Update
                </Button>
            </Form.Group>
            <Form.Group as={Row} className="align-items-left">
                <Form.Label column sm="auto">type:</Form.Label>
                <Col sm="auto">
                <Form.Control
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    /> 
                </Col>
                <Button size='sm' onClick={() => editType()}>
                    Update
                </Button>
            </Form.Group>
        </Form>
    );
};