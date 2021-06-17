import React, { useContext, useState} from "react";
import { AuthContext } from "../auth/Auth";
import './likes.css';
import firebase from '../firebase/firebase';
import { Link } from 'react-router-dom';
import { Popover, OverlayTrigger, Form, Button } from 'react-bootstrap';


export default function ReportButton({ joke }) {
    //get user's uid from authentication
    const { currentUser } = useContext(AuthContext);
    const currentUserId = currentUser ? currentUser.uid : null;
    
    const [show, setShow] = useState(false);   
    const [reason, setReason] = useState('');
    const regex = /^\s*$/;//regular expression for blank spaces
    
    function addReport(joke, userId) {
        if(regex.test(reason) === true){
            alert('Invalid input');
            setReason("");
            return false;
          }
        firebase.firestore().collection('report').add({
            uid: userId,
            jokeId: joke.id,
            createdAt: new Date().toISOString(),
            reason
        }).then(() => {
            alert("Joke has been reported");
            window.location.reload();
        }).catch((error) => {alert(error.message);
        });
        setReason(''); 
        setShow(!show);       
    }

    
    return (
        
        !currentUser ? (
            <Link to="/login">
               <div type='submit' className="reportbutton">
                    <i className="far fa-flag flagoutline"></i>         
                    
                </div> 
            </Link>) : (
            <OverlayTrigger
                    trigger='click'
                    placement="bottom-end"
                    overlay={
                    <Popover className='reportpop' id="popover-basic" >
                    <Popover.Title  className=" bg-dark text-white" >REPORT REASON:</Popover.Title>
                    <Popover.Content className="bg-dark">
                        <Form.Control className="mb-2"
                            as="textarea" 
                            rows={2}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            />
                        <Button
                            className="reportpop justify-content-end"
                            onClick={() =>addReport(joke,currentUserId)}
                            size="sm"
                            variant="warning"
                            type="submit"
                            block
                            > REPORT
                        </Button>
        
                    </Popover.Content>
                    </Popover>
                    }
                    >
                    <div type='submit' className="reportbutton">
                        <i className="far fa-flag flagoutline"></i>
                    </div>    
            </OverlayTrigger>
            )
         

    );
    
}