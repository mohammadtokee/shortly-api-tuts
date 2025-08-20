---
icon: home
---

# Base Route

## Overview

The base route provides fundamental API information, configuration details, and serves as the entry point for understanding the Shortly API structure and requirements.

## 📚 OpenAPI Reference

For complete endpoint details, request/response schemas, and examples, refer to the [OpenAPI Specification](../../api-specs/openapi.yaml) under the **Base** tag.

## 🏠 Base Endpoint

### API Information

* **Endpoint:** `GET /`
* **Description:** Get API information and status
* **Authentication:** Not required
* **Rate Limit:** 1000 requests per 15 minutes

**Response:** `200 OK`

```json
{
  "message": "Welcome to Shortly API",
  "version": "1.0.0",
  "status": "running",
  "timestamp": "2024-01-15T10:00:00.000Z",
  "documentation": "https://api.shortly.codewithsadee.com/docs"
}
```

## 🔧 API Configuration

### Base URLs

* **Development:** `http://localhost:3000`
* **Production:** `https://api.shortly.codewithsadee.com`

### Environment Variables

```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/shortly

# JWT Configuration
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Client Configuration
CLIENT_ORIGIN=http://localhost:3000
```

## 🔐 Authentication Requirements

### JWT Token Format

```http
Authorization: Bearer <access_token>
```

### Token Types

* **Access Token** - Short-lived (1 hour) for API requests
* **Refresh Token** - Long-lived (7 days) stored in HTTP-only cookies

### Authentication Flow

1. **Register/Login** - Receive access token and refresh cookie
2. **API Requests** - Include access token in Authorization header
3. **Token Expiry** - Use refresh token to get new access token
4. **Automatic Refresh** - Handle token expiration gracefully

## 📝 Response Format

### Success Response Structure

```json
{
  "data": "Response data here",
  "message": "Success message"
}
```

### Error Response Structure

```json
{
  "code": "ErrorType",
  "message": "Human-readable error message"
}
```

### Standard Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `data` | Any | Response data (success only) |
| `message` | String | Human-readable message |
| `code` | String | Error code (error only) |

## 🚦 Rate Limiting

### Rate Limit Configuration

* **Window Size:** 15 minutes (900 seconds)
* **Reset Time:** Every 15 minutes on the hour
* **Storage:** In-memory with Redis support

### Endpoint Limits

| Category | Limit | Window |
|----------|-------|---------|
| **Public Endpoints** | 1000 requests | 15 minutes |
| **Authentication** | 5 requests | 15 minutes |
| **User Management** | 50 requests | 15 minutes |
| **Link Management** | 100 requests | 15 minutes |

### Rate Limit Headers

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
X-RateLimit-Window: 900
```

## 🛡️ Security Features

### CORS Configuration

```typescript
// CORS whitelist
const CORS_WHITELIST = [
  'https://shortly.codewithsadee.com',
  'https://codewithsadee.gitbook.io'
];

// CORS options
const corsOptions = {
  origin: (requestOrigin, callback) => {
    if (requestOrigin && CORS_WHITELIST.includes(requestOrigin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
```

### Security Headers

```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
```

### HTTPS Enforcement

* **Production:** HTTPS required for all connections
* **Development:** HTTP allowed for local development
* **HSTS:** HTTP Strict Transport Security headers
* **Certificate Management:** Automatic SSL certificate handling

## 📊 API Status

### Health Check

* **Endpoint:** `GET /health`
* **Response:** API status and uptime information
* **Monitoring:** Health metrics and performance data

### Status Codes

* **200 OK** - API is running normally
* **503 Service Unavailable** - API is down or maintenance mode

## 🔍 Error Handling

### HTTP Status Codes

| Status | Description | Usage |
|--------|-------------|-------|
| **200** | OK | Successful requests with data |
| **201** | Created | Resource creation (not used) |
| **204** | No Content | Successful requests without data |
| **400** | Bad Request | Validation errors |
| **401** | Unauthorized | Authentication required |
| **403** | Forbidden | Access denied |
| **404** | Not Found | Resource not found |
| **409** | Conflict | Resource already exists |
| **429** | Too Many Requests | Rate limit exceeded |
| **500** | Internal Server Error | Server errors |

### Error Response Examples

**400 Bad Request**
```json
{
  "code": "BadRequest",
  "message": "Validation failed"
}
```

**401 Unauthorized**
```json
{
  "code": "Unauthorized",
  "message": "Invalid or expired token"
}
```

**429 Too Many Requests**
```json
{
  "code": "TooManyRequests",
  "message": "Rate limit exceeded. Try again in 15 minutes."
}
```

## 📈 Monitoring & Logging

### Logging Configuration

* **Log Level:** Configurable per environment
* **Format:** Structured JSON logging
* **Output:** Console and file logging
* **Rotation:** Automatic log file rotation

### Metrics Tracked

* **Request Count** - Total API requests
* **Response Times** - API performance metrics
* **Error Rates** - Error frequency and types
* **Rate Limit Violations** - Abuse prevention metrics

## 🔧 Development Tools

### OpenAPI Integration

* **Swagger UI** - Interactive API testing
* **Code Generation** - Client library generation
* **Documentation** - Automated API docs
* **Validation** - Request/response validation

### Testing Support

* **Example Data** - Ready-to-use test data
* **Error Scenarios** - Comprehensive error examples
* **Authentication Flows** - Complete auth examples
* **Rate Limit Testing** - Limit testing scenarios

## 📖 Related Documentation

* [OpenAPI Specification](../../api-specs/openapi.yaml) - Complete API definition
* [Authentication Routes](auth-routes.md) - JWT implementation
* [Security Features](../reference/security.md) - Security best practices
* [Rate Limiting](../reference/rate-limits.md) - API limits and policies
* [Error Handling](../reference/errors.md) - Error management

## 📝 Implementation Notes

* **Base route** provides API overview and status
* **CORS protection** is enforced in production
* **Rate limiting** applies to all endpoints
* **Security headers** are automatically applied
* **Health monitoring** tracks API performance
* **Error handling** is consistent across all endpoints
* **Documentation** is always up-to-date

## 🚀 Getting Started

1. **Check API status** - Verify the API is running
2. **Review configuration** - Understand environment setup
3. **Set up authentication** - Get your API credentials
4. **Test endpoints** - Use the provided examples
5. **Monitor usage** - Track your API consumption

## 🔗 External Resources

* [OpenAPI Specification](https://swagger.io/specification/)
* [JWT Authentication](https://jwt.io/)
* [REST API Best Practices](https://restfulapi.net/)
* [HTTP Status Codes](https://httpstatuses.com/)
* [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

***

**Ready to start?** Check the [API status](#api-status) and then explore the [authentication routes](auth-routes.md) to get your API credentials.
