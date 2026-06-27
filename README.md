# 📚 Library Management System

A secure and scalable RESTful backend application for managing library operations, including user authentication, book inventory, member management, and book borrowing workflows.

Built with **Node.js**, **Express.js**, and **MongoDB**, the application follows clean architecture principles, implements role-based access control, and exposes well-structured REST APIs for seamless integration with frontend applications.

---

## 🚀 Project Overview

Managing a library involves much more than storing book records. Librarians need an efficient way to organize books, monitor inventory, manage members, and track borrowing activities.

This project provides a complete backend solution for those requirements. It offers secure authentication, role-based authorization, inventory management, borrowing history, and validation to ensure data integrity throughout the application.

The system supports two user roles:

### 👨‍💼 Librarian

* Manage books
* View and manage members
* Update inventory
* Remove books from the system

### 👤 Member

* Register an account
* Log in securely
* Browse available books
* Borrow books
* Return borrowed books
* View currently borrowed books

---

# ✨ Features

* Secure User Registration & Login
* JWT Authentication
* Role-Based Authorization
* Password Hashing with bcrypt
* Book Inventory Management
* Member Management
* Borrow & Return Books
* Input Validation
* Centralized Error Handling
* RESTful API Design
* Environment Configuration
* MongoDB Integration

---

# 🏗️ System Architecture

```text
Client
   │
   ▼
Routes
   │
   ▼
Authentication Middleware
   │
   ▼
Authorization Middleware
   │
   ▼
Request Validation
   │
   ▼
Controller
   │
   ▼
Database (MongoDB)
   │
   ▼
Response
```

---

# 🛠️ Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JSON Web Token (JWT)
* bcrypt

### Validation

* express-validator

### Development Tools

* Postman
* Git
* GitHub
* VS Code
* Nodemon

---

# 📁 Project Structure

```text
library-management-system
│
├── config
│   └── db.js
│
├── controllers
│   ├── authController.js
│   ├── bookController.js
│   └── memberController.js
│
├── middleware
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   └── errorMiddleware.js
│
├── models
│   ├── User.js
│   ├── Book.js
│   └── Borrow.js
│
├── routes
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   └── memberRoutes.js
│
├── validators
│   └── validationRules.js
│
├── .env
├── server.js
├── package.json
└── README.md
```

---

# ⚙️ Installation

### Clone the Repository

```bash
git clone <repository-url>
```

### Navigate to the Project

```bash
cd library-management-system
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

DATABASE_URL=

JWT_SECRET=

JWT_EXPIRES_IN=1d

NODE_ENV=development
```

### Start Development Server

```bash
npm run dev
```

### Production

```bash
npm start
```

---

# 💾 Database Setup

1. Create a MongoDB Atlas Cluster.
2. Create a database user.
3. Allow network access.
4. Copy the MongoDB connection string.
5. Add the connection string to your `.env` file.

Example:

```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/library
```

---

# 🔐 Authentication Flow

```text
User Registration

↓

Validate Request

↓

Hash Password

↓

Store User

↓

User Login

↓

Verify Credentials

↓

Generate JWT Token

↓

Access Protected APIs

↓

Logout
```

---

# 👥 User Roles

| Role      | Permissions                            |
| --------- | -------------------------------------- |
| Librarian | Manage Books, Manage Members           |
| Member    | View Books, Borrow Books, Return Books |

---

# 📚 API Endpoints

## Authentication

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| POST   | /api/auth/register | Register a new member |
| POST   | /api/auth/login    | Login                 |
| GET    | /api/auth/profile  | Get logged-in user    |

---

## Books

| Method | Endpoint       | Access    |
| ------ | -------------- | --------- |
| GET    | /api/books     | All Users |
| GET    | /api/books/:id | All Users |
| POST   | /api/books     | Librarian |
| PUT    | /api/books/:id | Librarian |
| DELETE | /api/books/:id | Librarian |

---

## Members

| Method | Endpoint              | Access    |
| ------ | --------------------- | --------- |
| GET    | /api/members          | Librarian |
| DELETE | /api/members/:id      | Librarian |
| GET    | /api/members/me/books | Member    |

---

## Borrow

| Method | Endpoint              | Access |
| ------ | --------------------- | ------ |
| POST   | /api/books/:id/borrow | Member |
| POST   | /api/books/:id/return | Member |

---

# 📦 API Response Format

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

# ✅ Validation Rules

* Email must be valid.
* Password must contain at least 6 characters.
* Book quantity cannot be negative.
* Required fields cannot be empty.
* ISBN must be unique.

---

# 🔒 Security

This project includes several security practices to protect application data and user accounts.

* Passwords are hashed using bcrypt.
* JWT is used for authentication.
* Protected routes require valid tokens.
* Role-based authorization restricts sensitive operations.
* Input validation prevents invalid requests.
* Environment variables keep sensitive credentials out of the codebase.

---

# 📊 Database Collections

### Users

* Name
* Email
* Password
* Role

### Books

* Title
* Author
* ISBN
* Category
* Quantity
* Available Quantity

### Borrow Records

* Member
* Book
* Borrow Date
* Return Date
* Status

---

# 🧪 API Testing

The APIs were tested using Postman.

Tested scenarios include:

* User Registration
* Login
* Book CRUD Operations
* Borrow Book
* Return Book
* Authorization Rules
* Validation Errors

---

# 🚀 Deployment

## Backend

**Live API**

```
https://your-backend-url.com
```

## Repository

```
https://github.com/yourusername/library-management-system
```

---

# 📮 Postman Collection

Export the Postman collection and include it inside the repository.

```
postman/
    Library Management System.postman_collection.json
```

---

# 📈 Future Improvements

* Refresh Token Authentication
* Email Verification
* Pagination
* Search & Filtering
* Book Reservation System
* Fine Calculation
* Notifications
* Docker Support
* Unit Testing
* Swagger API Documentation

---

#  Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

# Author

**Harsha Vardhan**

MERN Stack Developer

* GitHub: https://github.com/Harshavardhanchowwdary/Library_Management_System
* LinkedIn: https://linkedin.com/in/yourprofile
* Portfolio: https://yourportfolio.com

* Project Working ScreenShots :
 Register User : [ http://localhost](http://localhost:5000/api/auth/register)
<img width="1558" height="930" alt="image" src="https://github.com/user-attachments/assets/1db605ef-70f7-49fb-942e-9bdc3fb0c8b3" />

---


---

##  Acknowledgements

This project was developed to strengthen backend engineering concepts, including authentication, authorization, REST API design, database modeling, and clean project organization. It reflects practical implementation of industry-standard development practices and serves as a foundation for building scalable backend applications.
