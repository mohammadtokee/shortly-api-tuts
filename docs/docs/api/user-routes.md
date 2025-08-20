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
  "current_password": "oldPassword123",
  "new_password": "newSecurePassword123"
}
```

**Response:** `200 OK`

```json
{
  "user": {
    "_id": "user_id_here",
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "role": "user",
    "totalVisitCount": 150,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

**Notes:**

* All fields are optional - only update what you need
* Password change requires current password verification
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
* Deletes all links created by the user
* Cascading deletion ensures data consistency

## 🔍 Request Validation

### Profile Update Validation

* **name:** 2-50 characters, optional
* **email:** Valid email format, optional, must be unique
* **current\_password:** Required only when changing password
* **new\_password:** Minimum 8 characters, required only when changing password

### Password Change Requirements

* **current\_password** must match existing password
* **new\_password** must be different from current password
* **new\_password** must meet security requirements

## 📊 Response Models

### User Profile Response

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
* **updatedAt:** Last profile update timestamp

## 🛡️ Security Features

* **Authentication Required** - All endpoints require valid access token
* **Ownership Validation** - Users can only access their own profile
* **Password Verification** - Current password required for changes
* **Rate Limiting** - Prevents abuse and brute force attacks
* **Input Validation** - All data is validated and sanitized

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

**401 Unauthorized - Invalid Token**

```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

**409 Conflict - Email Already Exists**

```json
{
  "error": "Conflict",
  "message": "Email already registered"
}
```

**500 Internal Server Error**

```json
{
  "error": "InternalServerError",
  "message": "Something went wrong"
}
```

## 🔄 Profile Update Workflows

### 1. Name Update

```
Current Profile → Update Name → Profile Updated → Return New Data
```

### 2. Email Update

```
Current Profile → Update Email → Validation → Profile Updated → Return New Data
```

### 3. Password Update

```
Current Profile → Verify Current Password → Update Password → Profile Updated → Return New Data
```

### 4. Account Deletion

```
Current Profile → Confirm Deletion → Delete Account & Links → 204 No Content
```

## 📈 Analytics Integration

The user profile includes analytics data:

* **totalVisitCount** - Aggregated visits across all user's links
* **Real-time updates** - Counts update with each link visit
* **Performance insights** - Track user engagement

## 🔗 Related Documentation

* [OpenAPI Specification](../../api-specs/openapi.yaml) - Complete endpoint details
* [User Models](broken-reference) - Data schema and validation
* [Authentication Guide](broken-reference) - JWT implementation
* [Security Features](broken-reference) - Security best practices
* [Error Handling](broken-reference) - Comprehensive error guide

## 📝 Implementation Notes

* **Profile updates** are atomic operations
* **Password changes** require current password verification
* **Email uniqueness** is enforced across all users
* **Role changes** require admin privileges (separate endpoint)
* **Account deletion** is irreversible and cascades to links
* **Rate limiting** applies per authenticated user
* **Input sanitization** prevents injection attacks
