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
1. [Wireframes](#Wireframes)
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
* Log In
    - Users log in with their username and password
    - Log in button disabled when username or password are empty
    - Has a button to Sign Up Screen
* Sign Up
    - Switches between sign up with User or Professional
    - Users can enter to Home screen immediately after sign up
    - Professionals are brought back to Log In screen after sign up
    - Goes back to Log In screen with back button
* Profile
    - Displays user first and last name, date of birth, username and email
    - User able to change username. Profile name in NavBar is changed after automatic refresh. All other areas immediate change.
    - User able to change email with correct current password
    - User able to change password with correct current password 
* Submit a Joke
    - Authenticated users can submit a joke. Default option is text joke. 
    - Default category selection is "other". Under 18 users does not have the option of "Adults Only" category. 
    - Text joke: Text is required.
    - Image joke: Image file is required.
    - Video joke: YouTube video link is required.
    - Keywords: At least one word is required.
    - User has the option to submit the joke as Anonymous.
* Search Page
* Category Jokes Page
    - Back button takes user back to Home Activity
    - Action bar displays username of post creator and beginning of description
    - Displays similar info as Home Activity 
    - Full image button shows a popup with the full image
    - Tag for its category
    - Current user can reply to post, increments comment count
    - Current user profile image displays next to reply space
    - All related comments are displays for post
    - Replied comments displays user profile image, username, description, time difference
    - Users can delete their own comments, also decrements comment count
* Admin Page

**Optional Nice-to-have Stories**
* Tips to pop up when open app
* Administration to monitor users and professionals
* Setting
    * Choose to show private information or not 
    * change password
* rating
* upload profile image
* reply to posts
* other users can DM other users
* Search posts
* Professionals can advertise
* Users can search for repair/fix based on their location

### 2. Navigation
**Navigation Bar (top)**
* Home
* Submit a Joke
* Profile
* Log In/Log Out
* Search


**Flow Navigation** (Screen to Screen)
* Login
    - Home
    - Register
* Register
    - Cancel to Login
    - Home
* Home
    - Category page
    - Submit a joke
    - Profile
    - Search
    - Log-In/Log-Out
* Profile
    - Log out button to Log in 
* Detail Post
    - back to previous 
* User Profile
    - back to previous 
* Compose
    - Home
* LogOut
    * Login


## Wireframes


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
