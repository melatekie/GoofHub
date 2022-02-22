Web App Design Project
===

# Goof-Hub
## Group Members
- Ricardo Daniels
- Mei Tak Lee
- Quinton Negron
- Denice Veluz
## Table of Contents
1. [Overview](#Overview)
1. [Product Spec](#Product-Spec)
2. [Schema](#Schema)

## Overview
### Description
A web app where users of all ages are able to enjoy text, image, and video jokes on their spare time. 

### App Evaluation
- **Category:** Entertainment
- **Web:** Web app allows anyone use to it on different device platform without installation.
- **Story:** Did you know that a good laugh is good for your health? A laugh boosts immunity, lowers stress, enhances teamwork and helps defuse conflict. Laughing as much as 100 times a day has the same effect as 15 minutes of cardio. One of the reasons why we should laugh more often. Also, top quality jokes are hard to find. How can users see, look for, rate, and share jokes during their busy lives? This app will give users a quick fix of comedy gold to make those busy days go by more pleasantly.
- **Market:** All ages. Our Audience is mainly bored/anxious/unhappy/stressed users who are looking to improve their mood through humor. Users who want to cheer up others or just use jokes as a conversation starter. They are anyone from over the age of 5, beginners who started to learn how to read, office worker who needs a break, busy parents who are waiting to pick up their kids from after school activities, to retiree with lots of time. Along with entertaining our main demographic we will also include in our Audience Goofers who wish to entertain others by sharing their own jokes. 
- **Habit:** This app can be used at least once a day when the user has time to browse the internet.
- **Scope:** Users are not required to log-in in order to view jokes but are required if they want to submit and like jokes. Authenticated users can submit text, image and video jokes. Submitted jokes are reviewed by the admin within the Admin page to check its appropriateness and duplicates before being published on the site. Non-authenticated users and users under 18 are not allow to see Adult content jokes.


## Product Spec

### 1. User Stories (Required)

**Required Must-have Stories**

* Home
    - Unauthenticated (for any users)
        - Joke of the Day changes with each refresh
        - Each category is an image where users are able to click into any category to view jokes
        - Log in/Sign up button only unauthenticated users are seen
        - Search button
        - The word "GOOF-HUB" returns to Home page when clicked 
    - Authenticated
        - Adult category is shown if user is over 18
        - Current username is shown and can be clicked to profile page
        - Log out button appears
        
<img src="https://user-images.githubusercontent.com/43690277/131433425-42ca0b3f-5992-4152-8212-1d0f6a65f24d.gif" height=350>       <img src="https://user-images.githubusercontent.com/43690277/131434240-18e90ca2-685f-4e6c-aa7c-ce1a7e5b137d.gif" height=350>


* Log In
    - Users log in with their email and password
    - Log in button disabled when email or password are empty
    - Has a button to Sign Up Screen
    - Has buttn to reset password
    
<img src="https://user-images.githubusercontent.com/43690277/131434527-dfa8ae55-9961-41cf-bccb-0022caeb0586.gif" height=350>    <img src="https://user-images.githubusercontent.com/43690277/131434570-887eeb26-5eec-4a71-8a73-04797d327fbc.gif" height=350>


* Sign Up
    - Information needed: first, last name, date of birth, username, email address, password
    - User is logged in immediately after sign up
    - Log In screen button
* Reset Password
    - Enter email address to receive a reset link
    - Log In screen button
* Profile
    - Displays user first and last name, date of birth, username and email
    - User able to change username. Profile name in NavBar is changed after automatic refresh. All other areas immediate change. Username change also appears on the jokes they submitted except if jokes are created Anonymous.
    - User able to change email with correct current password
    - User able to change password with correct current password 

<img src="https://user-images.githubusercontent.com/43690277/131434693-bff29d50-9201-4253-8e59-523a27b7adb9.gif" height=450>

* Submit a Joke
    - Authenticated users can submit a joke. Default option is text joke. 
    - Default category selection is "other". Under 18 users does not have the option of "Adults Only" category. 
    - Text joke: Text is required.
    - Image joke: Image file is required.
    - Video joke: YouTube video link is required.
    - Keywords: At least one word is required.
    - User has the option to submit joke as Anonymous.

<img src="https://user-images.githubusercontent.com/43690277/131434751-1542e83e-710f-41aa-8f59-9f525caa4288.gif" height=450>

* Search Page
    - When the correct keyword typed all the jokes with that keyword appears. Jokes can be filtered based on text, image, or video.

<img src="https://user-images.githubusercontent.com/43690277/131434796-0e291360-24b2-4c07-b3ae-e83f5250a560.gif" height=350>    <img src="https://user-images.githubusercontent.com/43690277/131434839-5590bb78-0ce7-485a-a296-3a166227c161.gif" height=350>


* Category Jokes Page
    - Each joke contains the content, username of joke creator, number of likes and report button
    - Jokes are displayed according to the latest createdAt date first.
    - Red heart indicates each joke the current user likes. Each user can only like each joke once. Click again to unlike joke.
    - To flag or report a joke user has to state a reason. User can flag more than once.

<img src="https://user-images.githubusercontent.com/43690277/131434888-983e61ff-454e-475e-b2a2-1d3e3e5d4b64.gif" height=450>

* Admin Page
    - Only a moderator has the ability to access the secretPage by typing on the url sitename.com/secretpage
    - New submitted jokes are shown for review. Moderator can edit video links, add or delete keywords, edit category, edit type, decide it to be released on site, or delete it forever. The left column shows JSON format of input from database. Right column shows the content. Below the new jokes, reported jokes are listed in JSON format and their reasons.

<img src="https://user-images.githubusercontent.com/43690277/131435412-3fc30f58-9443-40e6-8b27-c448200ee2f5.gif" height=450>


**Optional Nice-to-have Stories**
* Sharing jokes in social media
* Wider variety of emoji likes (ie. Funny, Cringe, Aww, Wow emojis)
* Joke recommendations based on user likes
* List all the jokes and the likes user has submitted in Profile page
* Upload profile image
* Able to follow other users

### 2. Navigation
**Navigation Bar (top)**
* Home
* Submit a Joke
* Profile
* Log In/Log Out
* Search


## Schema
### Models
#### users

   | Property      | Type     | Description |
   | ------------- | -------- | ------------|
   | objectId      | String   | unique id for the user account(same as Authentication Id) |
   | firstName     | String   | name of user |
   | lastName      | String   | name of user |
   | email         | String   | email of user |
   | username      | String   | alias of user |
   | dob           | String   | date of birth of user |
   | uid           | String   | authentication Id |

#### joke

   | Property      | Type     | Description |
   | ------------- | -------- | ------------|
   | objectId      | String   | unique id for the user post (default field) |
   | category      | Array    | genre of joke |
   | content       | String   | text, image link, video link of joke |
   | keywords      | Array    | descriptive words of joke for keyword search |
   | name          | String   | name of joke creator |
   | release       | Boolean  | true when joke is published on site |
   | createdAt     | String   | date when joke is created  |
   | type          | String   | text, image, or video |
   | uid           | String   | user Id |

#### likes

   | Property      | Type     | Description |
   | ------------- | -------- | ------------|
   | objectId      | String   | unique id for the user account(default field) |
   | jokeId        | String   | unique id of joke |
   | uid           | String   | unique id of user |

#### report

   | Property      | Type     | Description |
   | ------------- | -------- | ------------|
   | objectId      | String   | unique id for the user account(default field) |
   | jokeId        | String   | unique id of joke |
   | uid           | String   | unique id of user |
   | reason        | String   | reason for the flagged joke |
   | createdAt     | String   | datetime when report is created  |

### Networking
#### List of network requests by screen
   - Category Feed Screen
      - (Read/GET) Query all jokes that are released within a category
         ```javascript
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
        ```

## Open-source libraries used

- [React](https://reactjs.org) - Frontend base in development of single-page application for user interfaces or UI components
- [React-Bootstrap](https://react-bootstrap.github.io) - Responsiveness and high quality UI
- [React-Hook](https://reactjs.org/docs/hooks-intro.html) - Functions for code readablility, cleaner look and re-usability of stateful logic
- [Firebase Authentication](https://console.firebase.google.com/) - User authentication
- [Firebase Cloud Firestore Database](https://console.firebase.google.com) - Backend database
- [Firebase Storage](https://console.firebase.google.com) - Image storage
