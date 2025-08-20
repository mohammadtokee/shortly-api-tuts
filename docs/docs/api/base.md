---
icon: house
---

# Base Route

## Overview

The Shortly API provides a robust URL shortening service with comprehensive authentication and link management capabilities. This page covers the fundamental aspects of the API and how to integrate with the OpenAPI specifications.

## 🔗 Base URLs

* **Development:** `http://localhost:3000`
* **Production:** `https://api.shortly.codewithsadee.com`

## 📚 OpenAPI Integration

The complete API specification is available in the [OpenAPI Specification](../../api-specs/openapi.yaml) file. This specification provides:

* **Machine-readable API definition** following OpenAPI 3.0.3 standard
* **Complete endpoint documentation** with request/response schemas
* **Authentication requirements** and security schemes
* **Error handling** and status codes
* **Data validation** rules and constraints

### GitBook Integration

To reference the OpenAPI specs in your GitBook:

1. **Import the OpenAPI file** into your GitBook project
2. **Link to specific endpoints** using the operation IDs
3. **Reference schemas** for request/response examples
4. **Use examples** for testing and documentation

## 🔐 Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```http
Authorization: Bearer <your-access-token>
```

Refresh tokens are automatically handled via HTTP-only cookies.

## 📊 Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "data": "Response data here",
  "message": "Success message"
}
```

### Error Response

```json
{
  "error": "ErrorType",
  "message": "Human-readable error message",
  "details": [
    {
      "field": "fieldName",
      "message": "Field-specific error message"
    }
  ]
}
```

## 🚦 Rate Limiting

The API implements rate limiting to prevent abuse:

* **Authentication endpoints:** 5 requests per 15 minutes
* **Link management:** 100 requests per 15 minutes
* **User profile:** 50 requests per 15 minutes
* **Public redirects:** 1000 requests per 15 minutes

## 📝 HTTP Status Codes

* `200` - Success
* `201` - Created
* `204` - No Content
* `400` - Bad Request
* `401` - Unauthorized
* `403` - Forbidden
* `404` - Not Found
* `409` - Conflict
* `500` - Internal Server Error

## 🔍 Request Headers

### Required Headers

* `Content-Type: application/json` - For POST/PUT requests
* `Authorization: Bearer <token>` - For authenticated endpoints

### Optional Headers

* `Accept: application/json` - Specify response format
* `User-Agent` - Client identification

## 📋 Pagination

Endpoints that return lists support pagination with these query parameters:

* `page` - Page number (1-based, default: 1)
* `limit` - Items per page (1-100, default: 10)
* `sortBy` - Sort field (createdAt, updatedAt, title, totalVisitCount)
* `sortOrder` - Sort direction (asc, desc)

### Pagination Response

```json
{
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

## 🛡️ Security Features

* **HTTPS Only** - All production endpoints require HTTPS
* **CORS Protection** - Configurable cross-origin resource sharing
* **Input Validation** - Request data sanitization and validation
* **SQL Injection Protection** - MongoDB with parameterized queries
* **XSS Protection** - HTTP-only cookies and input sanitization

## 📱 API Versioning

The current API version is **v1.0.0**. Future versions will maintain backward compatibility where possible.

## 🔧 Error Handling

### Validation Errors

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

### Authentication Errors

```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### Server Errors

```json
{
  "error": "InternalServerError",
  "message": "Something went wrong"
}
```

## 📖 Next Steps

* **Authentication Routes** - User registration, login, and token management
* **User Routes** - Profile management and account operations
* **Link Routes** - Short link creation, management, and analytics
* **Redirect Routes** - Public link redirection

## 🔗 Related Documentation

* [OpenAPI Specification](../../api-specs/openapi.yaml) - Complete API definition
* [Authentication Guide](broken-reference) - JWT implementation details
* [Security Features](broken-reference) - Security best practices
* [Error Handling](broken-reference) - Comprehensive error guide
