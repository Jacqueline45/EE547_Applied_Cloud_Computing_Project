# InstaMood

- EE547 Project (Fall 2022)
- (Group 19) InstaMood
- Creator: [Lifuling Wei](https://github.com/llling339), [Aravindh Soundararajan](https://github.com/Aravindh-Soundararajan), [Jacqueline Liu](https://github.com/Jacqueline45)

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
  - If a user forgets his/her username and password, he/she has to type the email that is associated with the account. If email can't be provided, he/she can call for help. [Just a simulation]
  - Log in
    - case1:(SUCCESS) --> Show Mood Menu
    - case2:(WRONG PASSWORD) --> "Wrong password."
    - case3:(USER NOT FOUND) --> "Username doesn't exist. Please sign up first."
  - Sign up 
    - Should enter phone number, email, username, password, and confirmed password.
    - The password entered by the user should be same as the confirmed password field.
    - Usernames have to be unique and non-empty.
    - Password validation:
      - A password must contain a lowercase letter, a capital letter, and a number.
      - Password length must be greater than 7 and less than 16 characters.
    - Phone number must be in USA format (10 digits).
    - Email validation:
      - An email address must end with one of the following: .com .org .edu .gov
      - An email address must contain a '@'.
      - An email address must contain at least one alphabet before '@'.
    - case1:(SUCCESS) --> Show Mood Menu
    - case2:(USER EXIST) --> "Username taken. Try another. If already registered, please log in."

2. Loads of Deadlines but Only Wanna be a Couch Potato
  - Should show previous posts if any.
  - Adding or deleting a post will immediately rerender accordingly.
  - Each post is draggable and removable. 

3. Extreme Sleepiness
  -  Click twice/once on the bulb: light off/on

4. Some Great News
  - Each user can have only one post but multiple comments.
  - Open a new tab at localhost:3000 and log in with a different username, you'll see updates from both tabs simultaneously.

5. Damnnnnn
  - Each user can create multiple items anonymously and give votes to multiple items.
  - Items can be deleted only if they are created by the user deleting them. 
  - Open a new tab at localhost:3000 and log in with a different username, you'll see updates from both tabs simultaneously.

6. I can do it
  - Should show previous notes if any.
  - Adding or deleting a note will immediately rerender accordingly.
  - Each note is draggable and removable. 
  
7. Blank

