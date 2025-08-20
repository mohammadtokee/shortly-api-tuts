---
icon: shield-check
---

# Authentication Guide

## Overview

The Shortly API uses JWT (JSON Web Token) authentication with a dual-token system for secure and seamless user experience.

## 🔐 Authentication System

### Token Types

- **Access Token** - Short-lived JWT for API requests
- **Refresh Token** - Long-lived token stored in HTTP-only cookies

### Security Features

- **JWT Tokens** - Stateless, secure authentication
- **HTTP-Only Cookies** - XSS protection for refresh tokens
- **Secure Cookies** - HTTPS-only in production
- **Token Expiration** - Automatic security refresh

## 🔑 Authentication Flow

### 1. User Registration
```
POST /auth/register → Account Created → Access Token + Refresh Cookie
```

### 2. User Login
```
POST /auth/login → Credentials Verified → Access Token + Refresh Cookie
```

### 3. Token Refresh
```
Access Token Expired → Use Refresh Cookie → New Access Token
```

### 4. Password Reset
```
Request Reset → Email Sent → User Clicks Link → Reset Password
```

## 📝 Implementation Details

### Access Token
- **Header:** `Authorization: Bearer <access_token>`
- **Lifetime:** 1 hour
- **Usage:** All authenticated API requests

### Refresh Token
- **Storage:** HTTP-only cookie
- **Lifetime:** 7 days
- **Usage:** Automatic token refresh

### Cookie Configuration
```typescript
res.cookie('refreshToken', refreshToken, {
  maxAge: config.COOKIE_MAX_AGE,        // 7 days
  httpOnly: config.NODE_ENV === 'production',
  secure: true,
});
```

## 🛡️ Security Best Practices

### For API Consumers
1. **Store access tokens securely** - Don't expose in client-side code
2. **Handle token expiration** - Implement automatic refresh logic
3. **Use HTTPS** - Always in production environments
4. **Validate tokens** - Check signature and expiration

### For Developers
1. **Implement refresh logic** - Handle 401 responses automatically
2. **Secure storage** - Use secure storage for tokens
3. **Error handling** - Gracefully handle authentication failures
4. **Rate limiting** - Respect API rate limits

## 📋 Error Handling

### Common Authentication Errors

**401 Unauthorized**
```json
{
  "code": "Unauthorized",
  "message": "Invalid or expired token"
}
```

**401 RefreshTokenExpired**
```json
{
  "code": "RefreshTokenExpired",
  "message": "Refresh token expired"
}
```

**401 RefreshTokenError**
```json
{
  "code": "RefreshTokenError",
  "message": "Invalid refresh token"
}
```

## 🔄 Token Refresh Implementation

### Automatic Refresh
```javascript
// Example: Handle token expiration
if (response.status === 401) {
  // Token expired, try to refresh
  const newToken = await refreshAccessToken();
  if (newToken) {
    // Retry original request with new token
    return retryRequest(newToken);
  }
}
```

### Manual Refresh
```http
GET /auth/refresh-token
Cookie: refreshToken=<your_refresh_token>
```

## 📊 Rate Limiting

- **Authentication endpoints:** 5 requests per 15 minutes
- **Protected endpoints:** Varies by route type
- **Public endpoints:** 1000 requests per 15 minutes

## 🔗 Related Documentation

- [Authentication Routes](../api/auth-routes.md) - Endpoint details
- [OpenAPI Specification](../../api-specs/openapi.yaml) - Complete API definition
- [Security Features](security.md) - Security implementation
- [Error Handling](errors.md) - Comprehensive error guide

## 📝 Implementation Notes

- **Refresh tokens** are automatically managed via cookies
- **Access tokens** must be included in Authorization header
- **Rate limiting** applies per IP address for public endpoints
- **Password requirements** enforce security standards
- **Email verification** is handled via reset tokens
