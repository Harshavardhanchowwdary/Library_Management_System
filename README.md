# Library Management System

## Project Overview

The Library Management System is a RESTful backend application built to simplify library operations such as managing books, members, and borrowing records. It provides a secure authentication system, role-based authorization, and a structured API for handling everyday library activities.

The application supports two types of users:

* **Librarian**

  * Manage books
  * View and manage members
  * Update inventory
  * Remove books

* **Member**

  * Register an account
  * Login securely
  * Browse available books
  * Borrow books
  * Return books
  * View borrowed books

The project is designed following REST API principles with a clean folder structure, centralized error handling, request validation, and MongoDB integration.

---

# Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Password Hashing using bcrypt
* Protected Routes
* Role-Based Authorization

### Book Management

* Add New Books
* View All Books
* View Book Details
* Update Book Information
* Delete Books
* Track Available Quantity

### Member Management

* View Registered Members
* Delete Member Accounts

### Borrow Management

* Borrow Books
* Return Books
* View Borrowed Books
* Prevent Duplicate Borrow Requests
* Prevent Borrowing Unavailable Books

### Validation & Error Handling

* Input Validation
* Email Validation
* Password Validation
* Required Field Validation
* Centralized Error Handling
* Consistent API Responses

---

# Technology Stack

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication

* JSON Web Token (JWT)
* bcrypt

## Validation

* express-validator

## Development Tools

* Git
* GitHub
* Postman
* VS Code
* Nodemon
* dotenv
* CORS

---

# System Architecture

```text
Client

↓

Routes

↓

Authentication Middleware

↓

Authorization Middleware

↓

Validation

↓

Controller

↓

MongoDB

↓

Response
```

---

# Project Structure

```text
library-management-system/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   └── memberController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Book.js
│   └── Borrow.js
│
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   └── memberRoutes.js
│
├── validators/
│   └── validationRules.js
│
├── .env
├── server.js
├── package.json
└── README.md
```

---

# Installation

## Clone the Repository

```bash
git clone https:/Harshavardhanchowwdary/github.com//library-management-system.git
```

## Move into the Project Directory

```bash
cd library-management-system
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

DATABASE_URL=

JWT_SECRET=
```

## Run the Development Server

```bash
npm run dev
```

## Run in Production

```bash
npm start
```

---

# Environment Variables

| Variable       | Description               |
| -------------- | ------------------------- |
| PORT           | Application Port          |
| DATABASE_URL   | MongoDB Connection String |
| JWT_SECRET     | Secret Key for JWT        |

---

# Database Setup

1. Create a MongoDB Atlas Cluster.
2. Create a database user.
3. Allow network access.
4. Copy the MongoDB connection string.
5. Add the connection string to the `.env` file.
6. Start the server.

---

# Authentication Flow

```text
Register User

↓

Validate Input

↓

Hash Password

↓

Save User

↓

Login

↓

Verify Credentials

↓

Generate JWT

↓

Access Protected Routes
```

---

# API Endpoints

## Authentication

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| POST   | /api/auth/register | Register User      |
| POST   | /api/auth/login    | Login User         |

---

## Books

| Method | Endpoint       | Access              |
| ------ | -------------- | ------------------- |
| GET    | /api/books     | Authenticated Users |
| GET    | /api/books/:id | Authenticated Users |
| POST   | /api/books     | Librarian           |
| PUT    | /api/books/:id | Librarian           |
| DELETE | /api/books/:id | Librarian           |

---

## Members

| Method | Endpoint              | Access    |
| ------ | --------------------- | --------- |
| GET    | /api/members          | Librarian |
| DELETE | /api/members/:id      | Librarian |
| GET    | /api/members/me/books | Member    |

---

## Borrow Management

| Method | Endpoint              | Access |
| ------ | --------------------- | ------ |
| POST   | /api/books/:id/borrow | Member |
| POST   | /api/books/:id/return | Member |

---

# API Response Format

### Success Response

```json
{
    "success": true,
    "message": "Request completed successfully",
    "data": {}
}
```

### Error Response

```json
{
    "success": false,
    "message": "Book not found"
}
```

---

# Validation Rules

* Email must be in a valid format.
* Password must contain at least 6 characters.
* Book quantity cannot be negative.
* Required fields cannot be empty.
* ISBN must be unique.

---

# Error Handling

The application uses  error handling to return consistent responses for validation failures, authentication errors, authorization failures, and unexpected server errors.

Common HTTP Status Codes:

| Status Code | Description           |
| ----------- | --------------------- |
| 200         | Success               |
| 201         | Resource Created      |
| 400         | Bad Request           |
| 401         | Unauthorized          |
| 403         | Forbidden             |
| 404         | Resource Not Found    |
| 409         | Conflict              |
| 500         | Internal Server Error |

---

# Security

The application follows standard security practices including:

* Password hashing using bcrypt
* JWT-based authentication
* Role-based authorization
* Protected API routes
* Request validation
* Environment variable configuration
* Duplicate borrow prevention

---

# Database Collections

## User

* name
* email
* password
* role

## Book

* title
* author
* isbn
* category
* quantity
* availableQuantity

## Borrow

* memberId
* bookId
* borrowDate
* returnDate
* status

---

# API Testing

The APIs have been tested using Postman.

The following modules were verified:

* User Registration
* User Login
* Book Management
* Member Management
* Borrow Book
* Return Book
* Authentication
* Authorization
* Input Validation

---

# Deployment

## Backend URL

```text
https://library-management-system-rrba.onrender.com/
```

## GitHub Repository

```text
https://github.com/Harshavardhanchowwdary/Library_Management_System
```

---

# Future Improvements

* Refresh Token Authentication
* Search Books
* Category Filtering
* Pagination
* Email Notifications
* Fine Management
* Book Reservation
* Docker Support
* Swagger API Documentation
* Unit Testing

---

# API Demonstration

The following screenshots demonstrate the complete workflow of the application.

---

## 1. Register User

Creates a new member account.
<img width="1558" height="930" alt="Screenshot 2026-06-27 150330" src="https://github.com/user-attachments/assets/6037bb75-8a12-4093-9cf4-96d10adb8560" />

## 2. Login User

Authenticates the user and returns a JWT token.
<img width="1560" height="937" alt="image" src="https://github.com/user-attachments/assets/ad1787de-e03a-4a70-84d5-58d9d7ef95d5" />

## 3. Logout User

member/librarian logouts from the System
<img width="1558" height="923" alt="image" src="https://github.com/user-attachments/assets/6de946d1-c5fa-4c64-9edf-82760affe75f" />


## 4.  Add Book (Librarian)

Adds a new book to the library inventory.
<img width="1558" height="922" alt="image" src="https://github.com/user-attachments/assets/48f1dd6b-a46f-47e3-8f5a-d8c8aa7a45e3" />

## 5. Get All Books

Returns the list of available books.
<img width="1568" height="925" alt="image" src="https://github.com/user-attachments/assets/64b4f920-1978-4866-98a7-a56e427bffa4" />

## 6. Get Book By ID

Retrieves details of a specific book.
<img width="1571" height="923" alt="image" src="https://github.com/user-attachments/assets/7db9ad5e-0736-47b5-9e93-4226fd030cab" />

## 7. Update Book

Updates an existing book.
<img width="1558" height="932" alt="image" src="https://github.com/user-attachments/assets/82f9ed3a-e3c0-4d39-b05d-585735b9e854" />

## 8. Delete Book

Removes a book from the inventory.
<img width="1551" height="937" alt="image" src="https://github.com/user-attachments/assets/33f01ad5-64ea-4be6-98fb-d30607d5d8a9" />

## 9. Borrow Book

Allows a member to borrow a book.
<img width="1568" height="942" alt="image" src="https://github.com/user-attachments/assets/9190546d-ad2c-408c-8c65-004551b157f3" />

## 10. View Returned Book

Display the books returned by the logged-in member.
<img width="1562" height="930" alt="image" src="https://github.com/user-attachments/assets/b026971c-e8a9-4a3e-a2af-d5259799c7ce" />

## 11. View Borrowed Books

Displays all books borrowed by the logged-in member.
<img width="1572" height="943" alt="image" src="https://github.com/user-attachments/assets/02d4ebb6-4c99-415c-a83a-e2c9fef04d6a" />


# Author

**Harsha Vardhan**

Backend Developer

GitHub: https://github.com/Harshavardhanchowwdary/

LinkedIn: www.linkedin.com/in/channupatiharshavardhan
