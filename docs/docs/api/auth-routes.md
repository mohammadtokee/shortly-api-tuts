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

{% openapi-operation spec="shortly-api" path="/auth/register" method="post" %}
[OpenAPI shortly-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/30c83fbf0a620ae434394fb0afcf59574cdbbb2be5228d103d06fb2a4ec8f5ea.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250820%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250820T221048Z&X-Amz-Expires=172800&X-Amz-Signature=7375a0ad16c6562e772c39f849c153600f42aaeac4190c5fa8a2b6c9ac0c4209&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% hint style="info" %}
#### Notes

* Sets `refreshToken` cookie automatically
* Admin role requires whitelisted email addresses
{% endhint %}

### 2. User Login

* **Endpoint:** `POST /auth/login`
* **Description:** Authenticate user and receive access token
* **Authentication:** Not required
* **Rate Limit:** 5 requests per 15 minutes

{% openapi-operation spec="shortly-api" path="/auth/login" method="post" %}
[OpenAPI shortly-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/30c83fbf0a620ae434394fb0afcf59574cdbbb2be5228d103d06fb2a4ec8f5ea.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250820%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250820T221048Z&X-Amz-Expires=172800&X-Amz-Signature=7375a0ad16c6562e772c39f849c153600f42aaeac4190c5fa8a2b6c9ac0c4209&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% hint style="info" %}
#### **Headers Set:**

* `Set-Cookie: refreshToken=token_value; HttpOnly; Secure; SameSite=Strict`
{% endhint %}

### 3. User Logout

* **Endpoint:** `DELETE /auth/logout`
* **Description:** Logout user and invalidate refresh token
* **Authentication:** Required (Bearer token)
* **Rate Limit:** 5 requests per 15 minutes

{% openapi-operation spec="shortly-api" path="/auth/logout" method="delete" %}
[OpenAPI shortly-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/30c83fbf0a620ae434394fb0afcf59574cdbbb2be5228d103d06fb2a4ec8f5ea.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250820%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250820T221048Z&X-Amz-Expires=172800&X-Amz-Signature=7375a0ad16c6562e772c39f849c153600f42aaeac4190c5fa8a2b6c9ac0c4209&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% hint style="info" %}
#### Notes

* Invalidates the refresh token cookie
* Requires valid access token
{% endhint %}

### 4. Refresh Access Token

* **Endpoint:** `GET /auth/refresh-token`
* **Description:** Get new access token using refresh token
* **Authentication:** Not required (uses cookie)
* **Rate Limit:** 5 requests per 15 minutes

{% openapi-operation spec="shortly-api" path="/auth/refresh-token" method="get" %}
[OpenAPI shortly-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/30c83fbf0a620ae434394fb0afcf59574cdbbb2be5228d103d06fb2a4ec8f5ea.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250820%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250820T221048Z&X-Amz-Expires=172800&X-Amz-Signature=7375a0ad16c6562e772c39f849c153600f42aaeac4190c5fa8a2b6c9ac0c4209&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% hint style="info" %}
#### Notes

* Reads refresh token from HTTP-only cookie
* Automatically handles token refresh
{% endhint %}

### 5. Forgot Password

* **Endpoint:** `POST /auth/forgot-password`
* **Description:** Send password reset email
* **Authentication:** Not required
* **Rate Limit:** 5 requests per 15 minutes

{% openapi-operation spec="shortly-api" path="/auth/forgot-password" method="post" %}
[OpenAPI shortly-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/30c83fbf0a620ae434394fb0afcf59574cdbbb2be5228d103d06fb2a4ec8f5ea.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250820%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250820T221048Z&X-Amz-Expires=172800&X-Amz-Signature=7375a0ad16c6562e772c39f849c153600f42aaeac4190c5fa8a2b6c9ac0c4209&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

### 6. Reset Password

* **Endpoint:** `POST /auth/reset-password`
* **Description:** Reset password using token from email
* **Authentication:** Not required
* **Rate Limit:** 5 requests per 15 minutes

{% openapi-operation spec="shortly-api" path="/auth/reset-password" method="post" %}
[OpenAPI shortly-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/30c83fbf0a620ae434394fb0afcf59574cdbbb2be5228d103d06fb2a4ec8f5ea.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250820%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250820T221048Z&X-Amz-Expires=172800&X-Amz-Signature=7375a0ad16c6562e772c39f849c153600f42aaeac4190c5fa8a2b6c9ac0c4209&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

{% hint style="info" %}
#### Notes

* Token expires after 1 hour
{% endhint %}

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
* [Authentication Guide](broken-reference) - JWT implementation
* [Security Features](broken-reference) - Security best practices
* [User Models](broken-reference) - Data schema details
* [Error Handling](broken-reference) - Comprehensive error guide

## 📝 Implementation Notes

* **Refresh tokens** are automatically managed via cookies
* **Access tokens** should be included in Authorization header
* **Rate limiting** applies per IP address
* **Password requirements** enforce security standards
* **Email verification** is handled via reset tokens
