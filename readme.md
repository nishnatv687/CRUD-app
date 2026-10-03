# Authentication & Product CRUD E-Commerce App

A full-stack e-commerce application built with **React, Node.js, Express, MongoDB, and JWT authentication**.

The project provides user authentication, role-based authorization, and complete Product CRUD functionality with image upload and update support.

## Features

### Authentication
- User registration
- User login
- JWT access token authentication
- Refresh token authentication
- HTTP-only refresh token cookie
- Get current logged-in user
- Logout

### Authorization
- Buyer and Seller roles
- Seller-only product creation
- Seller-only product update
- Seller-only product deletion
- Protected backend APIs

### Product Management
- View all products
- View product details
- Create a product
- Update product
- Delete a product
- Upload product images
- Update product images
- Product validation

## Tech Stack

### Frontend
- React
- React Router
- Axios
- React Hook Form
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- express-validator
- Multer
- ImageKit

## Project Structure

```text
project/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── routes/
│   │   └── ...
│   └── ...
│
└── README.md
```

## Authentication Flow

The application uses JWT authentication with access and refresh tokens.

```text
Login
  ↓
Backend verifies credentials
  ↓
Access Token returned to frontend
  ↓
Refresh Token stored in HTTP-only cookie
  ↓
Access Token used for protected APIs
  ↓
Refresh Token used to generate a new Access Token
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/refresh-token` | Generate a new access token |
| GET | `/api/auth/getMe` | Get logged-in user |
| POST | `/api/auth/logout` | Logout user |

### Products

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:productId` | Get a single product |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:productId` | Update product |
| DELETE | `/api/products/:productId` | Delete product |

## Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
```

### Backend

```bash
cd backend
npm install
```

Create a `.env` file and add the required environment variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Start the backend:

```bash
npm run dev
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Do not commit your real `.env` file to GitHub.

Add `.env` to `.gitignore`.

## Frontend Flow

```text
Login / Register
      ↓
AuthContext
      ↓
Access Token
      ↓
Protected API Requests
      ↓
Product CRUD
```

## Live Demo

Frontend: `https://crud-app-omega-seven.vercel.app/`

Backend: `https://crud-app-mhys.onrender.com/`

## GitHub Repository

`https://github.com/nishnatv687/CRUD-app`

## Author

**Nishant Verma**

B.Tech CSE Student
