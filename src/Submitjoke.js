import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import SubmitImage from "./components/SubmitImage";
import SubmitText from "./components/SubmitText";
import SubmitVideo from "./components/SubmitVideo";
import './joke.css';

export default function SubmitJoke() { 
    const [radio, setRadio] = useState('text');
    const filterType = radio === 'text'? <SubmitText /> :  
                        radio === 'image'? <SubmitImage /> : 
                        radio === 'video'? <SubmitVideo /> : null;
    
    
    return (
    <>
    
    <Form><Container className ="radiocont">
    <div key={`custom-inline-${radio}`} className="typeFilter d-flex justify-content-center h-100 mb-3 mt-3">

      <Form.Check
        custom
        inline
        label="TEXT"
        name = "onoffswitch"
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
        className="custom-control-input1"
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
      />
    </div></Container>
    </Form>
    {filterType}
    </>

    
  
    );         
}