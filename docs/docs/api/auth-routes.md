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

**Notes:**

* Token provided via query parameter
* Password must meet security requirements
* Sends confirmation email

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
* **Secure Cookies** - HTTPS-only in production
* **Token Expiration** - Automatic security refresh
* **Rate Limiting** - Prevents brute force attacks
* **Password Hashing** - bcrypt encryption

## 📋 Error Handling

### Common Error Responses

**400 Bad Request - Validation Error**

```json
{
  "code": "BadRequest",
  "message": "Validation failed"
}
```

**400 Bad Request - Admin Role Unauthorized**

```json
{
  "code": "BadRequest",
  "message": "You are not allowed to create an admin account"
}
```

**401 Unauthorized - Invalid Credentials**

```json
{
  "code": "Unauthorized",
  "message": "Invalid email or password"
}
```

**401 Unauthorized - Token Issues**

```json
{
  "code": "RefreshTokenExpired",
  "message": "Refresh token expired"
}
```

**404 Not Found - User Not Found**

```json
{
  "code": "NotFound",
  "message": "User not found"
}
```

**409 Conflict - Email Already Exists**

```json
{
  "code": "Conflict",
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

* **password:** Minimum 8 characters, required

## 📊 Response Models

### User Model

```json
{
  "_id": "string",
  "name": "string",
  "email": "string",
  "role": "user | admin",
  "passwordResetToken": "string | null",
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

## 🔧 Implementation Details

### JWT Configuration

```typescript
// JWT token configuration
const accessTokenConfig = {
  secret: process.env.JWT_ACCESS_SECRET,
  expiresIn: '1h'  // 1 hour
};

const refreshTokenConfig = {
  secret: process.env.JWT_REFRESH_SECRET,
  expiresIn: '7d'  // 7 days
};
```

### Cookie Configuration

```typescript
// Cookie configuration
res.cookie('refreshToken', refreshToken, {
  maxAge: config.COOKIE_MAX_AGE,        // 7 days
  httpOnly: config.NODE_ENV === 'production',
  secure: true,                          // HTTPS only
  sameSite: 'strict'                     // CSRF protection
});
```

## 🔗 Related Documentation

* [OpenAPI Specification](../../api-specs/openapi.yaml) - Complete endpoint details
* [Authentication Guide](../reference/authentication.md) - JWT implementation
* [Security Features](../reference/security.md) - Security best practices
* [Data Models](../reference/models.md) - User schema details
* [Error Handling](../reference/errors.md) - Comprehensive error guide

## 📝 Implementation Notes

* **Refresh tokens** are automatically managed via cookies
* **Access tokens** must be included in Authorization header
* **Rate limiting** applies per IP address
* **Password requirements** enforce security standards
* **Email verification** is handled via reset tokens
* **Admin role** requires whitelisted email addresses
* **Token expiration** is enforced at multiple levels
