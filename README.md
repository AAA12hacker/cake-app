# Complete Cake Project

# Project Overview

This project is a full-stack application with both backend and frontend components. It includes user authentication, cake management (CRUD operations), and proper error handling to ensure smooth operation.

# Backend Features

1. User Authentication: Created user login and registration system.
2. Auth Middleware: Added middleware to protect routes that need authentication.
3. Cake Model & CRUD Operations: Built the cake model and implemented Create, Read, Update, and Delete operations for cakes.
4. Error Handling: Managed all edge cases, including handling network failures.

# Backend Setup

To run the backend:

## Create a .env file and add the following:

MONGO_URI=Your mongo URI
JWT_SECRET=waraclesecret

## In the backend folder, run:

### `npm install`

### `node server.js`

# Frontend Features

1. User and Cake Routes: Set up user authentication and cake-related routes, ensuring cakes are only visible to logged-in users.
2. State Management: Used AuthContext and CakeContext for better state management and to avoid passing props down multiple components.
3. Validation and Error Handling: Managed input validations and handled various edge cases for a smoother user experience.

# Frontend Setup

To run the frontend:

## Create a .env file and add the following:

REACT_APP_URL = "http://localhost:5000/api"

## In the frontend folder, run:

### `npm install`

### `npm start`

## That's it! The backend and frontend should now be running smoothly.
