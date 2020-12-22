import React, { useState, useEffect } from 'react';
import './components/Searchbar.css';
import { Container, Row, Col,Form, Jumbotron } from 'react-bootstrap';
import { Imagejokes,Textjokes,Videojokes } from './components/Jokecard';
import firebase from "./firebase/firebase";
import './joke.css';

const db = firebase.firestore();
function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [radio, setRadio] = useState('all');

  function useFetch() {
    const [jokes, setJokes] = useState([]);

    useEffect(() => {
          db.collection('jokes')
            .where('release','==', true)
            .onSnapshot((snapshot) => {
                const newJokes = snapshot.docs.map((doc) => ({
                    id: doc.id,...doc.data()
                }))

                setJokes(newJokes);
            })
    }, [])
    return jokes
  }
  const jokes = useFetch();
  const no18Jokes = jokes.filter(word => word.category.some(data => data !== '18+'));
  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

     
  const results = no18Jokes.filter(word => word.keywords.some(data => data === searchTerm.toLowerCase() && data !== ""));
  //console.log(results);
  //radio selection
  const filterType = radio === 'all'? results :  results.filter(item => item.type === radio)
  
  const items = filterType.map((data) => {
    switch (data.type){
        case data.type='image': 
            return (<Col md={4} key={data.id}><Imagejokes  data={data}/></Col>)
        case data.type='video': 
            return (<Col md={4} key={data.id}><Videojokes  data={data}/></Col>)
        case data.type='text': 
            return (<Col md={4} key={data.id}><Textjokes  data={data}/></Col>)
        default: 
            return null     
    }
})
  return (
    
    <React.Fragment>
    <Container fluid >
    <Form>  
    <div key={`custom-inline-${radio}`} inline className="typeFilter d-flex justify-content-center h-100 mb-3 mt-3">
    <Form.Check
        custom
        inline
        label="ALL"
        type='radio'
        id={`custom-inline-${radio}-0`}
        checked={radio === 'all'}
        value='all'
        onChange={(e)=>{ setRadio(e.target.value)}}
        style = {{fontFamily: "BuiltTitlingRg-Regular", fontSize: "30px"}}
        className="onoffswitch-checkbox"
      />
      <Form.Check
        custom
        inline
        label="TEXT"
        type='radio'
        id={`custom-inline-${radio}-1`}
        checked={radio === 'text'}
        value='text'
        onChange={(e)=>{ setRadio(e.target.value) }}
        style = {{fontFamily: "BuiltTitlingRg-Regular", fontSize: "30px"}}
        className="onoffswitch-checkbox"
      />
      <Form.Check
        custom
        inline
        label="IMAGE"
        type='radio'
        id={`custom-inline-${radio}-2`}
        checked={radio === 'image'}
        value='image'
        onChange={(e)=>{ setRadio(e.target.value) }}
        style = {{fontFamily: "BuiltTitlingRg-Regular", fontSize: "30px"}}
        className="onoffswitch-checkbox"
      />
      <Form.Check
        custom
        inline
        label="VIDEO"
        type='radio'
        id={`custom-inline-${radio}-3`}
        checked={radio === 'video'}
        value='video'
        onChange={(e)=>{ setRadio(e.target.value) }}
        style = {{fontFamily: "BuiltTitlingRg-Regular", fontSize: "30px"}}
        className="onoffswitch-checkbox"
      />
    </div>  
  </Form>
    <div className="d-flex justify-content-center h-100">
        <div className="searchbplogin-box searchbptextbox d-flex justify-content-center ">
            <input 
              className="searchbptextbox" 
              type="text" placeholder="Search keyword" 
              aria-label="Search" 
              value={searchTerm} 
              onChange={handleChange}/>
            <div className="search_icon1 button-small">
            
            <i className="fas fa-search" ></i></div>
        </div>
    </div>
    

    
    <br></br>
    <br></br>
    <br></br>
    <Row lg={3}>
        {items}
    </Row>
    </Container>
    <Jumbotron className="bg-transparent "/>
    <Jumbotron className="bg-transparent "/>
    <Jumbotron className="bg-transparent "/>
    </React.Fragment>
  );
}
export default Search;

