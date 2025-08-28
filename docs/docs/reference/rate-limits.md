---
icon: timer
---

# Rate Limits

## Overview

The Shortly API implements comprehensive rate limiting to prevent abuse, ensure fair usage, and maintain service quality for all users.

## 🚦 Rate Limiting Strategy

### Per-Route Rate Limits

- **Authentication Routes** 🔐 - 5 requests per 15 minutes
- **User Management** 👤 - 50 requests per 15 minutes  
- **Link Management** 🔗 - 100 requests per 15 minutes
- **Public Redirects** 🔄 - 1000 requests per 15 minutes

### Rate Limit Windows

- **Window Size:** 15 minutes (900 seconds)
- **Reset Time:** Every 15 minutes on the hour
- **Storage:** In-memory with Redis support

## 📊 Rate Limit Headers

### Response Headers

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
X-RateLimit-Window: 900
```

### Header Descriptions

- **X-RateLimit-Limit** - Maximum requests allowed in window
- **X-RateLimit-Remaining** - Remaining requests in current window
- **X-RateLimit-Reset** - Unix timestamp when limit resets
- **X-RateLimit-Window** - Window size in seconds

## ⚠️ Rate Limit Exceeded

### HTTP Response

```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 900
```

### Error Response Body

```json
{
  "code": "TooManyRequests",
  "message": "Rate limit exceeded. Try again in 15 minutes.",
  "retryAfter": 900
}
```

## 🔧 Implementation Details

### Storage Options

- **Memory Store** - Default, in-memory storage
- **Redis Store** - Persistent, distributed storage
- **Custom Store** - Implement your own storage backend

## 📈 Rate Limit Monitoring

### Metrics Tracked

- **Request Count** - Total requests per IP/route
- **Limit Exceeded** - Number of blocked requests
- **Peak Usage** - Highest request rates
- **Geographic Distribution** - Requests by location

## 🛡️ Best Practices

### For API Consumers

1. **Implement Exponential Backoff** - Retry with increasing delays
2. **Cache Responses** - Reduce unnecessary requests
3. **Batch Operations** - Combine multiple requests when possible
4. **Monitor Usage** - Track your rate limit consumption

### For Developers

1. **Handle 429 Responses** - Implement proper retry logic
2. **Respect Retry-After** - Wait for the specified time
3. **Optimize Requests** - Minimize API calls
4. **Plan for Scaling** - Design for rate limit constraints

## 🔄 Rate Limit Recovery

### Automatic Recovery

- **Window Reset** - Limits automatically reset every 15 minutes
- **No Manual Action** - No need to contact support
- **Immediate Access** - Full access restored after reset

### Manual Recovery

- **Wait for Reset** - Wait until the next 15-minute window
- **Reduce Frequency** - Lower your request rate
- **Contact Support** - For persistent issues (rare)

## 📋 Rate Limit Examples

### Example 1: Normal Usage

```http
GET /links HTTP/1.1
Authorization: Bearer <token>

HTTP/1.1 200 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1640995200
```

### Example 2: Rate Limit Exceeded

```http
GET /links HTTP/1.1
Authorization: Bearer <token>

HTTP/1.1 429 Too Many Requests
Retry-After: 900
Content-Type: application/json

{
  "code": "TooManyRequests",
  "message": "Rate limit exceeded. Try again in 15 minutes."
}
```