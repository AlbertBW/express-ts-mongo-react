# ExpressTSMongoDBReact

This is a full-stack demo application showcasing a RESTful API built with **Express**, **TypeScript**, **MongoDB**, and **Zod** on the backend, and a simple **React** and **TypeScript** frontend using **Vite**.

## Description

This API allows you to manage users, sessions, and products. It includes the following features:

- **User Management**: Create and retrieve users.
- **Session Management**: Create, retrieve, and delete user sessions. Refresh session tokens.
- **Product Management**: Create, update, retrieve, and delete products. Product creation, updating, and deletion require authentication.

## Features

### Backend

- **Express**: Handles routing and middleware.
- **TypeScript**: Strongly typed backend development.
- **MongoDB**: MongoDB object modelling for data persistence.
- **Zod**: Schema validation for request bodies.

### Frontend

- **React**
- **TypeScript**
- **Vite**

## Installation

### Prerequisites

- Node.js
- MongoDB

### Clone the Repository

```bash
git clone https://github.com/your-username/express-ts-mongo-react.git
cd express-ts-mongo-react
```

### Setup Backend

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

### Setup Frontend

1. Navigate to the `frontend` folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file based on `.env.example` and set up your environment variables (e.g., API URL).
4. Start the development server:
   ```bash
   npm run dev
   ```

## License

This project is licensed under the MIT License.
