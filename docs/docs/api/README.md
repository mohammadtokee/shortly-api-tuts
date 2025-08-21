---
icon: code
---

# API Overview

## Overview

The Shortly API provides a comprehensive set of endpoints for URL shortening, user management, and analytics. This section contains detailed documentation for all API routes, organized by functionality.

## 📚 OpenAPI Integration

All API endpoints are fully documented in the [OpenAPI Specification](../api-specs/openapi.yaml) file. This specification provides:

* **Complete endpoint definitions** with request/response schemas
* **Interactive examples** for testing and development
* **Machine-readable documentation** for code generation
* **Comprehensive error handling** and status codes

## 🗂️ Route Categories

### 1. [Base Route](base.md) 🏠

* API fundamentals and configuration
* Authentication requirements
* Response formats and error handling
* Rate limiting and security features

### 2. [Authentication Routes](auth-routes.md) 🔐

* User registration and login
* Token management and refresh
* Password reset functionality
* JWT authentication implementation

### 3. [User Routes](user-routes.md) 👤

* Profile management and updates
* Account settings and preferences
* User analytics and statistics
* Account deletion and cleanup

### 4. [Link Routes](link-routes.md) 🔗

* Short link creation and management
* Link updates and customization
* Pagination and sorting options
* Link analytics and performance

### 5. [Redirect Routes](redirect-routes.md) 🔄

* Public link redirection
* Visit tracking and analytics
* Performance optimization
* Public access handling

## 🔗 Quick Navigation

### For New Users

1. Start with [Base Route](base.md) for API fundamentals
2. Review [Authentication Routes](auth-routes.md) for setup
3. Explore [Link Routes](link-routes.md) for core functionality

### For Developers

1. Check [Base Route](base.md) for configuration details
2. Study [Authentication Routes](auth-routes.md) for security
3. Review [User Routes](user-routes.md) for profile management
4. Examine [Link Routes](link-routes.md) for business logic

### For API Integration

1. Use [OpenAPI Specification](../api-specs/openapi.yaml) for complete details
2. Reference [Base Route](base.md) for common patterns
3. Follow [Authentication Routes](auth-routes.md) for security setup
4. Implement [Link Routes](link-routes.md) for core features

## 📊 API Statistics

* **Total Endpoints:** 12
* **Authentication Required:** 9 endpoints
* **Public Endpoints:** 3 endpoints
* **Rate Limited:** All endpoints
* **Version:** v1.0.0

## 🔐 Authentication Overview

Most endpoints require JWT authentication:

```http
Authorization: Bearer <your-access-token>
```

**Public Endpoints:**

* `POST /auth/register` - User registration
* `POST /auth/login` - User authentication
* `GET /{backHalf}` - Link redirection

## 🚦 Rate Limiting

* **Authentication:** 5 requests per 15 minutes
* **User Management:** 50 requests per 15 minutes
* **Link Management:** 100 requests per 15 minutes
* **Public Redirects:** 1000 requests per 15 minutes

## 📝 Response Format

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
  "code": "ErrorType",
  "message": "Human-readable error message"
}
```

## 🔍 Data Models

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

### Link Model

```json
{
  "_id": "string",
  "title": "string",
  "destination": "string",
  "backHalf": "string",
  "shortLink": "string",
  "creator": "string",
  "totalVisitCount": "number",
  "createdAt": "date-time",
  "updatedAt": "date-time"
}
```

## 🛡️ Security Features

* **JWT Authentication** - Secure token-based access
* **Role-based Authorization** - User and admin permissions
* **Rate Limiting** - Abuse prevention and protection
* **Input Validation** - Data sanitization and security
* **HTTPS Enforcement** - Secure communication
* **CORS Protection** - Cross-origin resource sharing

## 📈 Analytics & Monitoring

* **Visit Tracking** - Real-time link analytics
* **User Engagement** - Performance metrics
* **Rate Limit Monitoring** - API usage tracking
* **Error Logging** - Comprehensive error tracking
* **Performance Metrics** - Response time monitoring

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

* [OpenAPI Specification](../api-specs/openapi.yaml) - Complete API definition
* [Getting Started](../getting-started/installation.md) - Setup and installation
* [Authentication Guide](../reference/authentication.md) - Security implementation
* [Data Models](../reference/models.md) - Schema definitions
* [Error Handling](../reference/errors.md) - Error management
* [Rate Limiting](../reference/rate-limits.md) - API limits and policies

## 🚀 Getting Started

1. **Review** [**Base Route**](base.md) for API fundamentals
2. **Set up authentication** using [Authentication Routes](auth-routes.md)
3. **Create your first link** with [Link Routes](link-routes.md)
4. **Manage your profile** via [User Routes](user-routes.md)
5. **Test redirection** with [Redirect Routes](redirect-routes.md)

## 🔗 External Resources

* [OpenAPI Specification](https://swagger.io/specification/)
* [JWT Authentication](https://jwt.io/)
* [REST API Best Practices](https://restfulapi.net/)
* [HTTP Status Codes](https://httpstatuses.com/)

***

**Ready to integrate?** Start with the [OpenAPI Specification](../api-specs/openapi.yaml) for complete endpoint details and examples.
