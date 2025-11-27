# WTWR (What to Wear?): Back End

This backend provides a RESTful API for the WTWR app. Users can:

- Create an account
- View all clothing items
- Add their own clothing items
- Delete only items they own
- Like or unlike items
- View and update their user profile

The service stores data in MongoDB, validates input, and responds with standardized server messages. Authentication is enforced using JSON Web Tokens.

## Technologies and Methods Used

- Node.js
- JavaScript
- Express.js
- MongoDB
- jsonwebtoken (JWT)
- Password hashing
- CORS
- Controllers for clean separation of logic
- Centralized error handling
- Status-code-based error reporting

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature
