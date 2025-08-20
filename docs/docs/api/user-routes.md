---
icon: user
---

# User Routes

## Overview

User routes handle profile management, account updates, and user account operations. These endpoints allow authenticated users to manage their personal information and account settings.

## 📚 OpenAPI Reference

For complete endpoint details, request/response schemas, and examples, refer to the [OpenAPI Specification](../../api-specs/openapi.yaml) under the **Users** tag.

## 🔑 Available Endpoints

### 1. Get Current User Profile

* **Endpoint:** `GET /users/me`
* **Description:** Retrieve the authenticated user's profile information
* **Authentication:** Required (Bearer token)
* **Rate Limit:** 50 requests per 15 minutes

**Headers Required:**

```http
Authorization: Bearer <access_token>
```

**Response:** `200 OK`

```json
{
  "user": {
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "totalVisitCount": 150,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Notes:**

* Returns current user's profile data
* Excludes sensitive fields like password and tokens
* Includes visit count analytics

### 2. Update Current User Profile

* **Endpoint:** `PUT /users/me`
* **Description:** Update the authenticated user's profile information
* **Authentication:** Required (Bearer token)
* **Rate Limit:** 50 requests per 15 minutes

**Headers Required:**

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body (all fields optional):**

```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "new_password": "newSecurePassword123"
}
```

**Response:** `204 No Content`

**Notes:**

* All fields are optional - only update what you need
* Password change requires only new password
* Email changes are validated for uniqueness
* Role cannot be changed via this endpoint

### 3. Delete Current User Account

* **Endpoint:** `DELETE /users/me`
* **Description:** Delete the authenticated user's account and all associated links
* **Authentication:** Required (Bearer token)
* **Rate Limit:** 50 requests per 15 minutes

**Headers Required:**

```http
Authorization: Bearer <access_token>
```

**Response:** `204 No Content`

**Notes:**

* **Irreversible action** - account cannot be recovered
* All user's links are automatically deleted
* Visit count analytics are permanently lost
* Requires valid authentication token

## 🔍 Request Validation

### Profile Update Validation

* **name:** 2-50 characters, optional
* **email:** Valid email format, optional, unique
* **new_password:** Minimum 8 characters, optional

### Email Validation Rules

* Must be valid email format
* Must be unique across all users
* Case-insensitive comparison
* Automatic trimming and normalization

### Password Validation Rules

* Minimum 8 characters
* No maximum length limit
* Automatically hashed with bcrypt
* Salt rounds: 12 (configurable)

## 📊 Response Models

### User Response

```json
{
  "user": {
    "_id": "string",
    "name": "string",
    "email": "string",
    "role": "user | admin",
    "totalVisitCount": "number",
    "createdAt": "date-time",
    "updatedAt": "date-time"
  }
}
```

### User Model Fields

* **\_id:** Unique user identifier (MongoDB ObjectId)
* **name:** User's full name (2-50 characters)
* **email:** User's email address (unique)
* **role:** User role (user or admin)
* **totalVisitCount:** Total visits across all user's links
* **createdAt:** Account creation timestamp
* **updatedAt:** Last update timestamp

## 🛡️ Security Features

* **Authentication Required** - All endpoints require valid access token
* **Self-Access Only** - Users can only access their own profile
* **Password Security** - Passwords are securely hashed
* **Input Validation** - All data is validated and sanitized
* **Rate Limiting** - Prevents abuse and spam
* **Data Protection** - Sensitive fields excluded from responses

## 📋 Error Handling

### Common Error Responses

**400 Bad Request - Validation Error**

```json
{
  "code": "BadRequest",
  "message": "Validation failed"
}
```

**401 Unauthorized - Invalid Token**

```json
{
  "code": "Unauthorized",
  "message": "Invalid or expired token"
}
```

**409 Conflict - Email Already Exists**

```json
{
  "code": "Conflict",
  "message": "Email already registered"
}
```

**500 Internal Server Error**

```json
{
  "code": "ServerError",
  "message": "Internal server error"
}
```

## 🔄 User Management Workflows

### 1. Profile Retrieval

```
Authenticate User → Fetch User Data → Filter Sensitive Fields → Return Profile
```

### 2. Profile Update

```
Validate Input → Check Email Uniqueness → Hash Password → Update Profile → Return 204
```

### 3. Account Deletion

```
Authenticate User → Delete All User Links → Delete User Account → Return 204
```

## 📈 Analytics Features

### Visit Tracking

* **Aggregated counting** - Total visits across all user's links
* **Real-time updates** - Increments with each link visit
* **Performance metrics** - Track user engagement

### User Insights

* **Link performance** - Monitor link success rates
* **Usage patterns** - Understand user behavior
* **Growth metrics** - Track account development

## 🔐 Security Considerations

### Password Security

* **Hashing algorithm:** bcrypt with salt
* **Salt rounds:** 12 (configurable)
* **No plain text storage** - Passwords are never stored in clear text
* **Automatic hashing** - Applied on every password update

### Data Protection

* **Sensitive field exclusion** - Password and tokens never returned
* **Input sanitization** - All data validated before storage
* **SQL injection prevention** - MongoDB ODM protection
* **XSS prevention** - Input sanitization and validation

## 🔗 Related Documentation

* [OpenAPI Specification](../../api-specs/openapi.yaml) - Complete endpoint details
* [Authentication Guide](../reference/authentication.md) - JWT implementation
* [Data Models](../reference/models.md) - User schema details
* [Security Features](../reference/security.md) - Security best practices
* [Error Handling](../reference/errors.md) - Comprehensive error guide

## 📝 Implementation Notes

* **Password hashing** uses industry-standard bcrypt algorithm
* **Email validation** includes format and uniqueness checks
* **Profile updates** are atomic operations
* **Account deletion** includes cascading link removal
* **Visit counting** aggregates across all user's links
* **Rate limiting** applies per authenticated user
* **Input validation** occurs at multiple levels
