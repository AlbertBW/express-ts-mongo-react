# Express TS MongoDB API

## API Endpoints

### Healthcheck

- **GET** `/healthcheck`
  - Returns `200 OK` if the server is running.

### Users

- **POST** `/api/users` - Create a new user.
- **GET** `/api/users` - Get all users.

### Sessions

- **POST** `/api/sessions` - Create a user session.
- **GET** `/api/sessions` - Get active user sessions.
- **DELETE** `/api/sessions` - Logout from a session.
- **POST** `/api/sessions/refresh` - Refresh session token.

### Products

- **POST** `/api/products` - Create a new product (requires authentication).
- **PUT** `/api/products/:productId` - Update a product (requires authentication).
- **GET** `/api/products` - Fetch all products.
- **GET** `/api/products/:productId` - Fetch a single product.
- **DELETE** `/api/products/:productId` - Delete a product (requires authentication).
