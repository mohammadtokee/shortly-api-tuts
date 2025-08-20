---
icon: alert-triangle
---

# Error Handling

## Overview

The Shortly API implements comprehensive error handling with consistent response formats, detailed error messages, and proper HTTP status codes.

## 🚨 Error Response Structure

### Standard Error Format

```json
{
  "code": "ErrorType",
  "message": "Human-readable error message"
}
```

### Error Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `code` | String | Machine-readable error identifier |
| `message` | String | Human-readable error description |

## 📋 HTTP Status Codes

### Success Responses

- **200 OK** - Request successful
- **201 Created** - Resource created (not used in this API)
- **204 No Content** - Request successful, no content returned

### Client Error Responses

- **400 Bad Request** - Invalid request data
- **401 Unauthorized** - Authentication required or failed
- **403 Forbidden** - Access denied
- **404 Not Found** - Resource not found
- **409 Conflict** - Resource already exists
- **429 Too Many Requests** - Rate limit exceeded

### Server Error Responses

- **500 Internal Server Error** - Unexpected server error

## 🔐 Authentication Errors

### 401 Unauthorized

**Invalid or Expired Token**
```json
{
  "code": "Unauthorized",
  "message": "Invalid or expired token"
}
```

**Refresh Token Expired**
```json
{
  "code": "RefreshTokenExpired",
  "message": "Refresh token expired"
}
```

**Invalid Refresh Token**
```json
{
  "code": "RefreshTokenError",
  "message": "Invalid refresh token"
}
```

**Reset Token Expired**
```json
{
  "code": "ResetTokenExpired",
  "message": "Your password reset token has been expired"
}
```

**Invalid Reset Token**
```json
{
  "code": "ResetTokenError",
  "message": "Invalid reset password token"
}
```

### 403 Forbidden

**Access Denied**
```json
{
  "code": "AccessDenied",
  "message": "Access denied"
}
```

**Link Modification Denied**
```json
{
  "code": "AccessDenied",
  "message": "You don't have permission to modify this link"
}
```

**Link Deletion Denied**
```json
{
  "code": "AccessDenied",
  "message": "You don't have permission to delete this link"
}
```

## 📝 Validation Errors

### 400 Bad Request

**General Validation Error**
```json
{
  "code": "BadRequest",
  "message": "Validation failed"
}
```

**Admin Role Unauthorized**
```json
{
  "code": "BadRequest",
  "message": "You are not allowed to create an admin account"
}
```

## 🔍 Not Found Errors

### 404 Not Found

**Link Not Found**
```json
{
  "code": "NotFound",
  "message": "Link not found"
}
```

**Link Unavailable**
```json
{
  "code": "NotFound",
  "message": "This link is not available"
}
```

**Token Not Found**
```json
{
  "code": "TokenNotFound",
  "message": "This token is already used"
}
```

## ⚠️ Conflict Errors

### 409 Conflict

**Email Already Exists**
```json
{
  "code": "Conflict",
  "message": "Email already registered"
}
```

**BackHalf Already Exists**
```json
{
  "code": "Conflict",
  "message": "Back-half already exists"
}
```

## ⏱️ Rate Limit Errors

### 429 Too Many Requests

**Rate Limit Exceeded**
```json
{
  "code": "TooManyRequests",
  "message": "Rate limit exceeded. Try again in 15 minutes."
}
```

## 🖥️ Server Errors

### 500 Internal Server Error

**General Server Error**
```json
{
  "code": "ServerError",
  "message": "Internal server error"
}
```

**Specific Operation Errors**
```json
{
  "code": "ServerError",
  "message": "Error during generating link"
}
```

## 🔧 Error Handling Implementation

### Controller Error Handling

```typescript
try {
  // API operation logic
  const result = await performOperation();
  res.status(200).json(result);
} catch (error) {
  // Log error for debugging
  logger.error('Error during operation', error);
  
  // Return appropriate error response
  res.status(500).json({
    code: 'ServerError',
    message: 'Internal server error'
  });
}
```

### Middleware Error Handling

```typescript
// Error handling middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Unhandled error:', error);
  
  res.status(500).json({
    code: 'ServerError',
    message: 'Internal server error'
  });
});
```

## 📊 Error Logging

### Logging Strategy

- **Error Details** - Full error stack traces
- **Request Context** - User ID, endpoint, request data
- **Timestamp** - When the error occurred
- **Environment** - Development vs production logging

### Log Levels

- **Error** - Application errors and exceptions
- **Warn** - Warning conditions
- **Info** - General information
- **Debug** - Detailed debugging information

## 🛡️ Security Considerations

### Error Information Disclosure

- **Production** - Generic error messages
- **Development** - Detailed error information
- **Sensitive Data** - Never expose in error responses
- **Stack Traces** - Only in development mode

### Error Rate Monitoring

- **High Error Rates** - Monitor for potential attacks
- **Pattern Analysis** - Identify common error sources
- **Alerting** - Notify administrators of issues
- **Metrics** - Track error frequency and types

## 🔄 Error Recovery

### Automatic Recovery

- **Rate Limits** - Automatically reset every 15 minutes
- **Token Expiration** - Automatic refresh mechanism
- **Database Issues** - Connection retry logic
- **Network Issues** - Request retry with backoff

### Manual Recovery

- **Authentication** - Re-authenticate with valid credentials
- **Rate Limits** - Wait for limit reset or reduce request frequency
- **Validation Errors** - Correct request data and retry
- **Server Errors** - Contact support if persistent

## 📱 Client Error Handling

### Best Practices

1. **Handle All Status Codes** - Don't assume success
2. **Parse Error Messages** - Display user-friendly messages
3. **Implement Retry Logic** - For transient errors
4. **Log Errors** - For debugging and monitoring
5. **Graceful Degradation** - Continue operation when possible

### Example Implementation

```javascript
async function apiCall(endpoint, options) {
  try {
    const response = await fetch(endpoint, options);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`${error.code}: ${error.message}`);
    }
    
    return await response.json();
  } catch (error) {
    // Handle different error types
    if (error.message.includes('Unauthorized')) {
      // Redirect to login
      redirectToLogin();
    } else if (error.message.includes('TooManyRequests')) {
      // Show rate limit message
      showRateLimitMessage();
    } else {
      // Show generic error
      showErrorMessage(error.message);
    }
    
    throw error;
  }
}
```

## 🔗 Related Documentation

- [Authentication Guide](authentication.md) - Auth error details
- [Rate Limits](rate-limits.md) - Rate limit errors
- [Security Features](security.md) - Security error handling
- [OpenAPI Specification](../../api-specs/openapi.yaml) - Complete API definition

## 📝 Implementation Notes

- **Consistent Format** - All errors follow the same structure
- **HTTP Compliance** - Proper status codes for each error type
- **User-Friendly** - Clear, actionable error messages
- **Developer-Friendly** - Detailed logging for debugging
- **Security-Conscious** - No sensitive information in responses
- **Internationalization** - Error messages can be localized
