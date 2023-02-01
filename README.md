# Mitchy's Used Cars 


## Goal

> To have a internally generating app where a User can go to reliably sell their used cars.


## Technologies Used

1. HTML
2. Javascript
3. CSS
4. Node.js
5. NPM
6. Bcrypt
7. Passport/Passport-jwt
8. CORS
9. MIRO
10. Mongoose
11. MongoDB
12. JSONWENTOKEN
13. Express


## E.R.D.(Entity Relationship Diagram )

![ERD](image2.png)

## Routes Tables

| Index  | /cars        | GET    | Index all cars                                 |
|--------|--------------|--------|------------------------------------------------|
| Show   | /cars/:id    | GET    | Show details of specific car                   |
| Create | /cars        | POST   | Create new car post                            |
| Update | /cars/:id    | PATCH  | Update the details to a specific car           |
| Delete | /cars/:id    | DELETE | Delete a car post that you have created        |
| Create | /description | POST   | create a description for a car you created     |
| Create | /sign-up     | POST   | create a log in email and password combination |
| Create | /sign-in     | POST   | create a user token for sign authorization     |



