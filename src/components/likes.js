import React, { useContext } from "react";
import { AuthContext } from "../auth/Auth";
import './likes.css';
import firebase from '../firebase/firebase';
import { Link } from 'react-router-dom';
import { useFetchRealtime } from '../firebase/useFetch';

export default function LikeButton({ joke }) {
    //get user's uid from authentication
    const { currentUser } = useContext(AuthContext);
    const currentUserId = currentUser ? currentUser.uid : null;
    
    const likedb = firebase.firestore()
        .collection('likes')
        .where('uid','==',currentUserId)
        .where('jokeId','==',joke.id).limit(1);
    const likes = useFetchRealtime(joke,currentUserId).some(joke => joke.uid===currentUserId);
    
    function addLike(joke, userId) {
        likedb.get().then((doc) => {
            if(doc.empty) {
                return firebase.firestore().collection('likes').add({
                    uid: userId,
                    jokeId: joke.id
                })
                .then(() => {
                    return firebase.firestore().doc('jokes/' + joke.id).update({
                        likeCount: firebase.firestore.FieldValue.increment(1)
                    });
                })

            }
        })          
    }

    function unLike(joke, userId) {
               
        likedb.get().then((data) => {
            if(!data.empty) {
                firebase.firestore().doc(`/likes/${data.docs[0].id}`).delete()
                    .then(() => {
                        //joke.likeCount--;
                        return firebase.firestore().doc('jokes/' + joke.id).update({
                            likeCount: firebase.firestore.FieldValue.increment(-1)
                        });
                    })
            }
        }) 
    }
    return (
        
        !currentUser ? (
            <Link to="/login">
               <div type='submit' className="likebutton">
                    <i className="far fa-heart heartoutline"></i> 
                </div> 
            </Link>) : 
            
        likes === true ? (
            <div type='submit' className="likebutton"
                onClick={() =>unLike(joke,currentUserId)}>
                <i className="fas fa-heart heartfull"></i>
            </div>) :
        (
            <div type='submit' className="likebutton"
                onClick={() =>addLike(joke,currentUserId)}>
                <i className="far fa-heart heartoutline"></i>
            </div>)
         
    );
    
}