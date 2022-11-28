# InstaMood

- EE547 Project (Fall 2022)
- (Group 19) InstaMood
- Creator: [llling339](https://github.com/llling339), [Aravindh-Soundararajan](https://github.com/Aravindh-Soundararajan), [Jacqueline45](https://github.com/Jacqueline45)

## Steps to test in local
First, clone this repository
```cmd
cd EE547_project
```
### Backend
1. Install dependencies under backend/
```cmd
cd backend && npm install
```
2. Return to EE547_project/ and activate the server
```cmd
cd .. && yarn server
```
3. If the server is activated successfully, you'll see: \
&nbsp; GraphQL Server running on http://localhost:5000/graphql \
&nbsp; WebSockets listening on ws://localhost:5000/graphql
### Frontend
1. Install dependencies under frontend/
```cmd
cd frontend && npm install
```
2. Return to EE547_project/ and execute frontend code
```cmd
cd .. && yarn start
```
3. If frontend is executed successfully, you'll see a webpage popped up at localhost:3000

## Detailed Functional Tests
1. Log in/Sign Up
  - Usernames have to be unique.
  - If password is forgotten, users have to sign up again with a different username.
  - Username & Password shouldn't be empty. If empty --> show error message.
  - Log in
    - case1:(SUCCESS) --> Show Mood Menu
    - case2:(WRONG PASSWORD) --> "Wrong account/password. Please try again. If you still can't log in after multiple trials, please sign up with a new username."
    - case3: (USER NOT FOUND) --> "Please sign up first."
  - Sign up 
    - case1:(SUCCESS) --> Show Mood Menu
    - case2:(USER EXIST) --> "Username taken. Try another. If already registered, please log in."

2. Loads of Deadline but Only Wanna be a Couch Potato
  - Should show previous posts if any.
  - Adding or deleting a post will immediately rerender accordingly.
  - Each post is draggable and removable. 

3. Extreme Sleepiness
  -  Click twice/once on the bulb: light off/on

4. Some Great News
  - Each person can have only one post but multiple comments.
  - Open a new tab at localhost:3000 and log in with a different username, you'll see updates from both tabs simultaneously.

