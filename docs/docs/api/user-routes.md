---
icon: user
---

# User Routes

## Overview

User routes handle profile management, account updates, and user account operations. These endpoints allow authenticated users to manage their personal information and account settings.

## 🔑 Available Endpoints

## 1. Get Current User Profile

* **Endpoint:** `GET /users/current`
* **Description:** Retrieve the authenticated user's profile information
* **Authentication:** Required (Bearer token)
* **Rate Limit:** 50 requests per 15 minutes

{% openapi-operation spec="shortly-api" path="/users/current" method="get" %}
[OpenAPI shortly-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/cf964ce372f8754823f4a7abbf815324f3aa54f6870bcfa4682464a6f2d69062.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250821%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250821T162510Z&X-Amz-Expires=172800&X-Amz-Signature=5aedaa1bfbaf52e25dfdd2745d83cb5e4f4e7da8691973abe6ddd518e204516b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

**Notes:**

* Returns current user's profile data
* Excludes sensitive fields like password and tokens
* Includes visit count analytics

## 2. Update Current User Profile

* **Endpoint:** `PUT /users/current`
* **Description:** Update the authenticated user's profile information
* **Authentication:** Required (Bearer token)
* **Rate Limit:** 50 requests per 15 minutes

{% openapi-operation spec="shortly-api" path="/users/current" method="patch" %}
[OpenAPI shortly-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/cf964ce372f8754823f4a7abbf815324f3aa54f6870bcfa4682464a6f2d69062.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250821%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250821T162510Z&X-Amz-Expires=172800&X-Amz-Signature=5aedaa1bfbaf52e25dfdd2745d83cb5e4f4e7da8691973abe6ddd518e204516b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

**Notes:**

* All fields are optional - only update what you need
* Password change requires only new password
* Email changes are validated for uniqueness
* Role cannot be changed via this endpoint

## 3. Delete Current User Account

* **Endpoint:** `DELETE /users/current`
* **Description:** Delete the authenticated user's account and all associated links
* **Authentication:** Required (Bearer token)
* **Rate Limit:** 50 requests per 15 minutes

{% openapi-operation spec="shortly-api" path="/users/current" method="delete" %}
[OpenAPI shortly-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/cf964ce372f8754823f4a7abbf815324f3aa54f6870bcfa4682464a6f2d69062.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250821%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250821T162510Z&X-Amz-Expires=172800&X-Amz-Signature=5aedaa1bfbaf52e25dfdd2745d83cb5e4f4e7da8691973abe6ddd518e204516b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

**Notes:**

* **Irreversible action** - account cannot be recovered
* All user's links are automatically deleted
* Visit count analytics are permanently lost
* Requires valid authentication token

## 🔍 Request Validation

### Profile Update Validation

* **name:** 2-50 characters, optional
* **email:** Valid email format, optional, unique
* **new\_password:** Minimum 8 characters, optional

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

{% openapi-schemas spec="shortly-api" schemas="User" grouped="false" %}
[OpenAPI shortly-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/cf964ce372f8754823f4a7abbf815324f3aa54f6870bcfa4682464a6f2d69062.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250821%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250821T162510Z&X-Amz-Expires=172800&X-Amz-Signature=5aedaa1bfbaf52e25dfdd2745d83cb5e4f4e7da8691973abe6ddd518e204516b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-schemas %}

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