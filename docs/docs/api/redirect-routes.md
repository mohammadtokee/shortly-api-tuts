---
icon: up-right-from-square
---

# Redirect Routes

## Overview

Redirect routes handle the public redirection of short links to their destination URLs. This endpoint is publicly accessible and includes visit tracking and analytics.

## 📚 OpenAPI Reference

For complete endpoint details, request/response schemas, and examples, refer to the [OpenAPI Specification](../../api-specs/openapi.yaml) under the **Redirect** tag.

## 🔑 Available Endpoints

## 1. Redirect to Destination

* **Endpoint:** `GET /{backHalf}`
* **Description:** Public endpoint to redirect short links to their destination URLs
* **Authentication:** Not required
* **Rate Limit:** 1000 requests per 15 minutes

**Path Parameters:**

* `backHalf` - Short link identifier (required)

**Path Parameter Validation:**

* Must contain only letters, numbers, underscores, and hyphens
* Pattern: `^[a-zA-Z0-9_-]+$`
* Examples: `abc123`, `my-site`, `blog_post`

{% openapi-operation spec="shortly-api" path="/{backHalf}" method="get" %}
[OpenAPI shortly-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/cf964ce372f8754823f4a7abbf815324f3aa54f6870bcfa4682464a6f2d69062.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250821%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250821T162012Z&X-Amz-Expires=172800&X-Amz-Signature=f7f547ba8929b2710feb21edbdfa92adeaf33adafc01a9a291dd057fdf9ab20b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

**Notes:**

* Automatically redirects to destination URL
* Increments visit counter for analytics
* No authentication required
* Handles invalid/missing links gracefully

## 🔍 Redirect Process

### 1. Link Lookup

```
Receive Request → Extract backHalf → Query Database → Find Link
```

### 2. Validation & Redirect

```
Validate Link → Check Availability → Increment Counter → Redirect
```

### 3. Error Handling

```
Link Not Found → Return 404 → JSON Error Response
```

## 📊 Visit Tracking

### Analytics Implementation

* **Real-time counting** - Visit counter increments immediately
* **Atomic updates** - Database operations are atomic
* **Performance optimized** - Minimal impact on redirect speed
* **Aggregated data** - Counts available in user analytics

### Visit Counter Update

```typescript
// Increment visit count atomically
await Link.updateOne(
  { _id: linkId },
  { $inc: { totalVisitCount: 1 } }
);

// Also update user's total visit count
await User.updateOne(
  { _id: creatorId },
  { $inc: { totalVisitCount: 1 } }
);
```

## 🛡️ Security Features

### Public Access

* **No authentication required** - Accessible to all users
* **Rate limiting** - Prevents abuse and spam
* **Input validation** - Sanitizes backHalf parameter
* **Error handling** - Graceful failure for invalid requests

### Abuse Prevention

* **IP-based rate limiting** - 1000 requests per 15 minutes per IP
* **Request validation** - Ensures valid backHalf format
* **Database protection** - Prevents injection attacks
* **Performance monitoring** - Tracks unusual usage patterns

## 📋 Error Handling

### Common Error Responses

**404 Not Found - Link Not Found**

```json
{
  "code": "NotFound",
  "message": "Link not found"
}
```

**404 Not Found - Link Unavailable**

```json
{
  "code": "NotFound",
  "message": "This link is not available"
}
```

**400 Bad Request - Invalid backHalf**

```json
{
  "code": "BadRequest",
  "message": "Invalid link identifier"
}
```

## 🔧 Implementation Details

### Route Handler

```typescript
// Redirect route implementation
app.get('/:backHalf', async (req, res) => {
  try {
    const { backHalf } = req.params;
    
    // Validate backHalf format
    if (!/^[a-zA-Z0-9_-]+$/.test(backHalf)) {
      return res.status(400).json({
        code: 'BadRequest',
        message: 'Invalid link identifier'
      });
    }
    
    // Find link in database
    const link = await Link.findOne({ backHalf });
    
    if (!link) {
      return res.status(404).json({
        code: 'NotFound',
        message: 'Link not found'
      });
    }
    
    // Increment visit counter
    await Promise.all([
      Link.updateOne(
        { _id: link._id },
        { $inc: { totalVisitCount: 1 } }
      ),
      User.updateOne(
        { _id: link.creator },
        { $inc: { totalVisitCount: 1 } }
      )
    ]);
    
    // Redirect to destination
    res.redirect(302, link.destination);
    
  } catch (error) {
    logger.error('Redirect error:', error);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error'
    });
  }
});
```

### Performance Optimizations

* **Database indexing** - Optimized queries on backHalf field
* **Atomic operations** - Single database calls for updates
* **Error caching** - Cache 404 responses for invalid links
* **Response optimization** - Minimal processing for redirects

## 📈 Analytics Integration

### Visit Data

* **Individual link counts** - Total visits per link
* **User aggregation** - Combined visits across user's links
* **Real-time updates** - Immediate counter increments
* **Performance metrics** - Redirect speed and success rates

### Data Flow

```
User Clicks Link → Redirect Request → Database Update → Analytics Update
```

## 🔗 Related Documentation

* [OpenAPI Specification](../../api-specs/openapi.yaml) - Complete endpoint details
* [Link Routes](link-routes.md) - Link management endpoints
* [Data Models](../reference/models.md) - Link schema details
* [Rate Limiting](../reference/rate-limits.md) - Public endpoint limits
* [Error Handling](../reference/errors.md) - Error management

## 📝 Implementation Notes

* **Public endpoint** - No authentication required
* **High performance** - Optimized for fast redirects
* **Visit tracking** - Automatic analytics updates
* **Error handling** - Graceful failure for invalid requests
* **Rate limiting** - Prevents abuse and spam
* **Database optimization** - Efficient queries and updates
* **Security measures** - Input validation and sanitization

## 🚀 Usage Examples

### Basic Redirect

```http
GET /abc123
```

**Response:**

```http
HTTP/1.1 302 Found
Location: https://example.com
```

### Invalid Link

```http
GET /invalid@link
```

**Response:**

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "code": "BadRequest",
  "message": "Invalid link identifier"
}
```

### Non-existent Link

```http
GET /nonexistent
```

**Response:**

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "code": "NotFound",
  "message": "Link not found"
}
```

## 🔍 Monitoring & Debugging

### Performance Metrics

* **Redirect speed** - Response time measurements
* **Success rates** - Successful vs failed redirects
* **Error patterns** - Common failure reasons
* **Usage patterns** - Peak usage times and volumes

### Debugging Tools

* **Request logging** - Track all redirect attempts
* **Error logging** - Detailed error information
* **Performance monitoring** - Response time tracking
* **Rate limit tracking** - Monitor abuse patterns
