---
icon: lock
---

# Security Features

## Overview

The Shortly API implements comprehensive security measures to protect user data, prevent unauthorized access, and ensure secure communication.

## 🛡️ Security Architecture

### Multi-Layer Security

- **Transport Security** 🔒 - HTTPS enforcement
- **Authentication Security** 🔐 - JWT with secure cookies
- **Authorization Security** 👥 - Role-based access control
- **Input Security** 🧹 - Validation and sanitization
- **Rate Limiting** ⏱️ - Abuse prevention

## 🔐 Authentication Security

### JWT Implementation

- **Algorithm:** HS256 (HMAC SHA-256)
- **Secret Rotation:** Configurable secret management
- **Token Expiration:** Short-lived access tokens
- **Refresh Mechanism:** Secure cookie-based refresh

### Cookie Security

```typescript
// Secure cookie configuration
res.cookie('refreshToken', refreshToken, {
  maxAge: config.COOKIE_MAX_AGE,        // 7 days
  httpOnly: config.NODE_ENV === 'production', // XSS protection
  secure: true,                          // HTTPS only
  sameSite: 'strict'                     // CSRF protection
});
```

## 👥 Authorization Security

### Role-Based Access Control

- **User Role** - Standard user permissions
- **Admin Role** - Elevated permissions (whitelisted emails only)
- **Resource Ownership** - Users can only access their own resources

### Permission Matrix

| Resource | User | Admin |
|----------|------|-------|
| Own Links | ✅ Full Access | ✅ Full Access |
| Other Links | ❌ No Access | ✅ Full Access |
| User Profiles | ✅ Own Only | ✅ All Users |
| System Settings | ❌ No Access | ✅ Full Access |

## 🌐 Transport Security

### HTTPS Enforcement

- **Production:** HTTPS required for all connections
- **Development:** HTTP allowed for local development
- **HSTS:** HTTP Strict Transport Security headers
- **Certificate Management:** Automatic SSL certificate handling

### CORS Configuration

```typescript
// CORS whitelist configuration
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

## 🧹 Input Security

### Data Validation

- **Schema Validation** - Mongoose schema validation
- **Input Sanitization** - XSS prevention
- **Type Checking** - TypeScript compile-time validation
- **Length Limits** - Prevent buffer overflow attacks

### SQL Injection Prevention

- **MongoDB ODM** - Object Document Mapper prevents injection
- **Parameterized Queries** - Built-in query sanitization
- **Input Escaping** - Automatic special character handling

## ⏱️ Rate Limiting Security

### Abuse Prevention

- **Per-Route Limits** - Different limits for different endpoints
- **IP-Based Tracking** - Track requests by source IP
- **Window-Based Reset** - Automatic limit reset every 15 minutes
- **Graceful Degradation** - Informative error messages

## 🔒 Data Security

### Password Security

- **Hashing Algorithm:** bcrypt with salt
- **Salt Rounds:** 12 rounds (configurable)
- **Password Requirements:** Minimum 8 characters
- **Reset Tokens:** Time-limited, single-use tokens

### Data Encryption

- **At Rest:** Database-level encryption
- **In Transit:** TLS 1.2+ encryption
- **Sensitive Fields:** Password fields excluded from queries
- **Token Storage:** Secure token storage with expiration

## 🚨 Security Headers

### HTTP Security Headers

```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
```

### Header Descriptions

- **X-Content-Type-Options** - Prevents MIME type sniffing
- **X-Frame-Options** - Prevents clickjacking attacks
- **X-XSS-Protection** - Enables XSS filtering
- **HSTS** - Enforces HTTPS connections
- **CSP** - Controls resource loading
- **Referrer-Policy** - Controls referrer information

## 📊 Security Monitoring

### Logging and Auditing

- **Authentication Events** - Login, logout, token refresh
- **Authorization Events** - Access attempts, permission checks
- **Rate Limit Events** - Limit exceeded, blocked requests
- **Error Events** - Security-related errors and warnings

### Security Metrics

- **Failed Login Attempts** - Track potential brute force attacks
- **Rate Limit Violations** - Monitor abuse patterns
- **Token Usage** - Track authentication patterns
- **Error Rates** - Monitor for security issues

## 🚨 Incident Response

### Security Breach Response

1. **Immediate Action** - Block compromised accounts
2. **Investigation** - Analyze logs and determine scope
3. **Containment** - Prevent further access
4. **Recovery** - Restore secure state
5. **Post-Incident** - Review and improve security

### Security Contact

- **Security Issues:** Report via GitHub issues
- **Urgent Issues:** Contact maintainers directly
- **Responsible Disclosure:** Follow security best practices