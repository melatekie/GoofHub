import React from 'react';
import { Card, ResponsiveEmbed } from 'react-bootstrap';
import './Jokecard.css';
import {useGetUser} from '../firebase/useFetch';


//Cards for text jokes
export function Textjokes({data}) {
    //get username from users collection
    const user = useGetUser('users',data.uid);
    const username = (user.map(item => item.username));
    //if user submitted joke as Anonymous credit goes to Anonymous, otherwise username under profile
    const Uname = data.name === 'Anonymous'? 'Anonymous': username;

    return(
    <Card className="jokebox1" border="dark">
        <Card.Body>
            <blockquote className="blockquote mb-0">
            <p>
                {data.content}
            </p>
            <footer className="blockquote-footer">
                <i>{Uname}</i>
            </footer>
            </blockquote>
            <Card.Text>
            </Card.Text>
        </Card.Body>
        
    </Card>
);
}


//Cards for image jokes
export function Imagejokes({data}) {
    //get username from users collection
    const user = useGetUser('users',data.uid);
    const username = (user.map(item => item.username));
    //if user submitted joke as Anonymous credit goes to Anonymous, otherwise username under profile
    const Uname = data.name === 'Anonymous'? 'Anonymous': username;

    return(
    <Card className="jokebox1" border="dark">   
        <Card.Img className="jokebox2" variant="top" src={data.content} />
        <Card.Body>
            <blockquote className="blockquote mb-0">
                <footer className="blockquote-footer">
                    <i>{Uname}</i>
                </footer>
            </blockquote>
            <Card.Text>
            </Card.Text>
        </Card.Body>
            
    </Card>
    );
}

//Cards for video jokes
export function Videojokes({data}) {
    //get username from users collection
    const user = useGetUser('users',data.uid);
    const username = (user.map(item => item.username));
    //if user submitted joke as Anonymous credit goes to Anonymous, otherwise username under profile
    const Uname = data.name === 'Anonymous'? 'Anonymous': username;

    return(
    <Card className="jokebox1" border="dark"> 
    <React.Fragment>    
        <div style={{ width: 'auto', height: 'auto' }}>
            <ResponsiveEmbed aspectRatio="16by9">
                <embed type="image/svg+xml" src={data.content} />
            </ResponsiveEmbed>
        </div>
     
    </React.Fragment>
    <Card.Body>
        <blockquote className="blockquote mb-0">
            <footer className="blockquote-footer">
                <i>{Uname}</i>
            </footer>
        </blockquote>
        <Card.Text>
        </Card.Text>
    </Card.Body>
    
    </Card>
    );
}
