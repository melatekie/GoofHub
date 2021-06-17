import { useState, useEffect } from "react";
import firebase from "./firebase";


//gets data from one table (one time)
//used in jokes pages
//gets data from one table (realtime) where jokes are released and in a certain category
export function useFetch(table,category) {
    const [jokes, setJokes] = useState([]);
    useEffect(() => {
        
        firebase.firestore()
            .collection(table)
            .where('release','==', true)
            .where('category','array-contains', category)
            .get().then((snapshot) => {
                const newJokes = snapshot.docs.map((doc) => ({
                    id: doc.id,...doc.data()
                    
                }))
  
                setJokes(newJokes);
            })
           
    }, [table,category])
    return jokes
}

//used in submitJoke, profile, jokecard
//get it realtime
export function useGetUser(table, currentUserId) {
  const [users, setUsers] = useState([]); 
  useEffect(() => {
          firebase.firestore()
              .collection(table)
              .where('uid','==', currentUserId)
              .onSnapshot((snapshot) => {
                  const newUsers = snapshot.docs.map((doc) => ({
                      id: doc.id,...doc.data()
                  }))
                  setUsers(newUsers);
              })    
  }, [table,currentUserId])
  return users
}
//used in profile, sign up
export function useGetUsername(table) {
    const [users, setUsers] = useState([]); 
    useEffect(() => {
            firebase.firestore()
                .collection(table)
                .onSnapshot((snapshot) => {
                    const newUsers = snapshot.docs.map((doc) => ({
                        id: doc.id,...doc.data()
                    }))
                    setUsers(newUsers);
                })    
        // eslint-disable-next-line
    }, [table])
    return users
  }

//likes
export function useFetchRealtime(joke, currentUserId) {
    const [jokes, setJokes] = useState([]);
    useEffect(() => {
        
        firebase.firestore()
          .collection('likes')
          .where('uid','==',currentUserId)
          .where('jokeId','==',joke.id).limit(1)
          .onSnapshot((snapshot) => {
              const newJokes = snapshot.docs.map((doc) => ({
                  id: doc.id,...doc.data()             
              }))
              setJokes(newJokes);
            })
        
    }, [joke, currentUserId])
    return jokes
}

//used in admin(secret) page for new submitted jokes
//get it realtime
export function useSubmission(table) {
  const [jokes, setJokes] = useState([]);
  
  useEffect(() => {
      firebase.firestore()
          .collection(table)
          .where('release','==', false)
          .onSnapshot((snapshot) => {
              const newJokes = snapshot.docs.map((doc) => ({
                  id: doc.id,...doc.data()
                  
              }))

              setJokes(newJokes);
          })
  }, [table])
  return jokes
}

//used in admin(secret) page for Report collection
export function useReport(table) {
    const [jokes, setJokes] = useState([]);
    
    useEffect(() => {
      
        firebase.firestore()
            .collection(table)
            .orderBy('jokeId','asc')
            .get().then((snapshot) => {
                const newJokes = snapshot.docs.map((doc) => ({
                    id: doc.id,...doc.data()
                    
                }))
  
                setJokes(newJokes);
            })
    }, [table])
    return jokes
  }

 