---
icon: lock-keyhole
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
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "user"
}
```

**Response:** `200 OK`

```json
{
  "user": {
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "totalVisitCount": 0,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "accessToken": "jwt_access_token_here"
}
```

**Notes:**

* Sets `refreshToken` cookie automatically
* Admin role requires whitelisted email addresses
* Password must be at least 8 characters

### 2. User Login

* **Endpoint:** `POST /auth/login`
* **Description:** Authenticate user and receive access token
* **Authentication:** Not required
* **Rate Limit:** 5 requests per 15 minutes

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:** `200 OK`

```json
{
  "user": {
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "totalVisitCount": 0,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
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

### 5. Forgot Password

* **Endpoint:** `POST /auth/forgot-password`
* **Description:** Send password reset email
* **Authentication:** Not required
* **Rate Limit:** 5 requests per 15 minutes

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

**Response:** `200 OK`

```json
{
  "message": "Password reset email sent successfully"
}
```

**Notes:**

* Sends reset token via email
* Rate limited to prevent abuse

### 6. Reset Password

* **Endpoint:** `POST /auth/reset-password`
* **Description:** Reset password using token from email
* **Authentication:** Not required
* **Rate Limit:** 5 requests per 15 minutes

**Request Body:**

```json
{
  "token": "reset_token_from_email",
  "new_password": "newSecurePassword123"
}
```

**Response:** `200 OK`

```json
{
  "message": "Password reset successfully"
}
```

**Notes:**

* Token expires after 1 hour
* New password must be at least 8 characters

## 🔐 Authentication Flow

### 1. Registration Flow

```
User Registration → Account Created → Access Token + Refresh Cookie
```

### 2. Login Flow

```
User Login → Credentials Verified → Access Token + Refresh Cookie
```

### 3. Token Refresh Flow

```
Access Token Expired → Use Refresh Cookie → New Access Token
```

### 4. Password Reset Flow

```
Request Reset → Email Sent → User Clicks Link → Reset Password
```

## 🛡️ Security Features

* **JWT Tokens** - Secure, stateless authentication
* **HTTP-Only Cookies** - XSS protection for refresh tokens
* **Rate Limiting** - Prevents brute force attacks
* **Password Hashing** - bcrypt encryption
* **Token Expiration** - Automatic security refresh

## 📋 Error Handling

### Common Error Responses

**400 Bad Request - Validation Error**

```json
{
  "error": "ValidationError",
  "message": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

**401 Unauthorized - Invalid Credentials**

```json
{
  "error": "Unauthorized",
  "message": "Invalid email or password"
}
```

**409 Conflict - Email Already Exists**

```json
{
  "error": "Conflict",
  "message": "Email already registered"
}
```

## 🔍 Request Validation

### Registration Validation

* **name:** 2-50 characters, required
* **email:** Valid email format, required, unique
* **password:** Minimum 8 characters, required
* **role:** Must be 'user' or 'admin', required

### Login Validation

* **email:** Valid email format, required
* **password:** Required

### Password Reset Validation

* **token:** Required, must be valid
* **new\_password:** Minimum 8 characters, required

## 📊 Response Models

### User Model

```json
{
  "_id": "string",
  "name": "string",
  "email": "string",
  "role": "user | admin",
  "totalVisitCount": "number",
  "createdAt": "date-time",
  "updatedAt": "date-time"
}
```

### Token Response

```json
{
  "accessToken": "string"
}
```

## 🔗 Related Documentation

* [OpenAPI Specification](../../api-specs/openapi.yaml) - Complete endpoint details
* [Authentication Guide](../reference/authentication.md) - JWT implementation
* [Security Features](../reference/security.md) - Security best practices
* [User Models](../reference/models.md) - Data schema details
* [Error Handling](../reference/errors.md) - Comprehensive error guide

## 📝 Implementation Notes

* **Refresh tokens** are automatically managed via cookies
* **Access tokens** should be included in Authorization header
* **Rate limiting** applies per IP address
* **Password requirements** enforce security standards
* **Email verification** is handled via reset tokens
