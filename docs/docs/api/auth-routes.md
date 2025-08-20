---
icon: lock
---

# Authentication Routes

## Overview

Authentication routes handle user registration, login, logout, and token management. These endpoints provide secure access control for the Shortly API.

## 📚 OpenAPI Reference

For complete endpoint details, request/response schemas, and examples, refer to the [OpenAPI Specification](../../api-specs/openapi.yaml) under the **Authentication** tag.

## 🔑 Available Endpoints

### 1. User Registration

* **Endpoint:** `POST /auth/register`
* **Description:** Create a new user account
* **Authentication:** Not required
* **Rate Limit:** 5 requests per 15 minutes

**Request Body:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response:** `200 OK`

```json
{
  "user": {
    "_id": "user_id_here",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "passwordResetToken": null,
    "role": "user"
  },
  "accessToken": "jwt_access_token_here"
}
```

**Notes:**

* Sets `refreshToken` cookie automatically
* Admin role requires whitelisted email addresses
* Returns user data and access token

### 2. User Login

* **Endpoint:** `POST /auth/login`
* **Description:** Authenticate user and receive access token
* **Authentication:** Not required
* **Rate Limit:** 5 requests per 15 minutes

**Request Body:**

```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`

```json
{
  "user": {
    "_id": "user_id_here",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "user"
  },
  "accessToken": "jwt_access_token_here"
}
```

**Headers Set:**

* `Set-Cookie: refreshToken=token_value; HttpOnly; Secure; SameSite=Strict`

### 3. User Logout

* **Endpoint:** `DELETE /auth/logout`
* **Description:** Logout user and invalidate refresh token
* **Authentication:** Required (Bearer token)
* **Rate Limit:** 5 requests per 15 minutes

**Headers Required:**

```http
Authorization: Bearer <access_token>
```

**Response:** `204 No Content`

**Notes:**

* Invalidates the refresh token cookie
* Requires valid access token
* Clears refresh token from database

### 4. Refresh Access Token

* **Endpoint:** `GET /auth/refresh-token`
* **Description:** Get new access token using refresh token
* **Authentication:** Not required (uses cookie)
* **Rate Limit:** 5 requests per 15 minutes

**Response:** `200 OK`

```json
{
  "accessToken": "new_jwt_access_token_here"
}
```

**Notes:**

* Reads refresh token from HTTP-only cookie
* Automatically handles token refresh
* Returns new access token

### 5. Forgot Password

* **Endpoint:** `POST /auth/forgot-password`
* **Description:** Send password reset email
* **Authentication:** Not required
* **Rate Limit:** 5 requests per 15 minutes

**Request Body:**

```json
{
  "email": "jane@example.com"
}
```

**Response:** `204 No Content`

**Notes:**

* Sends password reset email
* Generates secure reset token
* Token expires after 1 hour

### 6. Reset Password

* **Endpoint:** `POST /auth/reset-password`
* **Description:** Reset password using token from email
* **Authentication:** Not required
* **Rate Limit:** 5 requests per 15 minutes

**Request Body:**

```json
{
  "password": "newPassword123"
}
```

**Response:** `204 No Content`