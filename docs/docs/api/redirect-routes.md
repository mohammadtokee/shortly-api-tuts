---
icon: up-right-from-square
---

# Redirect Routes

## Overview

Redirect routes handle the public redirection of short links to their destination URLs. This is the core functionality that makes URL shortening work - when users visit a short link, they are automatically redirected to the original destination.

## 📚 OpenAPI Reference

For complete endpoint details, request/response schemas, and examples, refer to the [OpenAPI Specification](../../api-specs/openapi.yaml) under the **Redirect** tag.

## 🔑 Available Endpoints

### 1. Redirect to Destination URL

* **Endpoint:** `GET /{backHalf}`
* **Description:** Public endpoint to redirect short links to their destination URLs
* **Authentication:** Not required (public endpoint)
* **Rate Limit:** 1000 requests per 15 minutes

**Path Parameters:**

* `backHalf` - Short link identifier (required)

**Example Request:**

```
GET /abc123
```

**Response:** `302 Found`

```http
HTTP/1.1 302 Found
Location: https://example.com
```

**Notes:**

* **Public endpoint** - no authentication required
* **Automatic redirect** - browsers follow the Location header
* **Visit tracking** - increments visit counter automatically
* **High rate limit** - designed for public access

## 🔍 Request Validation

### Path Parameter Validation

* **backHalf:** 1-50 characters, alphanumeric + underscore + hyphen
* **Pattern:** `^[a-zA-Z0-9_-]+$`
* **Examples:** `abc123`, `my-site`, `product_link`

### Validation Rules

* **Length:** 1-50 characters
* **Characters:** Letters (a-z, A-Z), numbers (0-9), underscore (\_), hyphen (-)
* **No spaces:** Spaces are not allowed
* **Case sensitive:** `ABC123` and `abc123` are different

## 📊 Response Models

### Successful Redirect

* **Status Code:** `302 Found`
* **Location Header:** Contains the destination URL
* **Body:** Empty (browsers follow the redirect)

### Error Response

* **Status Code:** `404 Not Found`
* **Content-Type:** `application/json`

```json
{
  "error": "NotFound",
  "message": "Link not found"
}
```

## 🛡️ Security Features

* **Public Access** - No authentication barriers
* **Rate Limiting** - Prevents abuse and spam
* **URL Validation** - Ensures safe redirects
* **Input Sanitization** - Prevents injection attacks
* **HTTPS Enforcement** - Secure redirects in production

## 📋 Error Handling

### Link Not Found

```json
{
  "error": "NotFound",
  "message": "Link not found"
}
```

**Common Causes:**

* Invalid backHalf format
* Link has been deleted
* Link never existed
* Database connection issues

## 🔄 Redirect Workflow

### 1. Request Processing

```
Receive Request → Validate backHalf → Lookup Link → Process Redirect
```

### 2. Link Lookup

```
Parse backHalf → Query Database → Check Link Status → Return Result
```

### 3. Redirect Execution

```
Valid Link → Increment Counter → Set Location Header → Return 302
```

### 4. Error Handling

```
Invalid Link → Return 404 → Log Error → Provide Helpful Message
```

## 📈 Analytics Integration

### Visit Tracking

* **Real-time counting** - Each redirect increments the counter
* **Automatic updates** - No additional API calls needed
* **User aggregation** - Counts roll up to user profiles
* **Performance metrics** - Track link popularity

### Analytics Data

* **Visit timestamps** - When redirects occur
* **Geographic data** - IP-based location (if enabled)
* **Referrer tracking** - Where traffic comes from
* **Device information** - User agent data

## 🌐 Browser Behavior

### Automatic Redirect

* **Browsers** automatically follow 302 redirects
* **JavaScript** can handle redirects programmatically
* **Mobile apps** can process redirect responses
* **API clients** can choose to follow or not

### Redirect Types

* **302 Found** - Temporary redirect (current implementation)
* **301 Moved Permanently** - Permanent redirect (future option)
* **307 Temporary Redirect** - Method-preserving redirect

## 🔗 Related Documentation

* [OpenAPI Specification](../../api-specs/openapi.yaml) - Complete endpoint details
* [Link Models](broken-reference) - Data schema and validation
* [Rate Limiting](broken-reference) - Rate limiting policies
* [Error Handling](broken-reference) - Comprehensive error guide
* [Security Features](broken-reference) - Security best practices

## 📝 Implementation Notes

### Performance Optimizations

* **Database indexing** on backHalf field for fast lookups
* **Caching layer** for frequently accessed links
* **Connection pooling** for database efficiency
* **Async processing** for visit counting

### Scalability Features

* **Load balancing** across multiple servers
* **Database sharding** for high-volume links
* **CDN integration** for global performance
* **Rate limiting** per IP address

### Monitoring & Logging

* **Access logs** - Track all redirect requests
* **Error monitoring** - Alert on failed redirects
* **Performance metrics** - Response time tracking
* **Usage analytics** - Traffic pattern analysis

## 🚀 Use Cases

### 1. Marketing Campaigns

* **Short URLs** for social media posts
* **Track engagement** with visit analytics
* **A/B testing** different destinations
* **Campaign performance** monitoring

### 2. Content Sharing

* **Blog posts** with trackable links
* **Email newsletters** with click tracking
* **Document sharing** with access analytics
* **Media links** with engagement metrics

### 3. Business Applications

* **Product links** with conversion tracking
* **Support articles** with usage analytics
* **Internal tools** with access monitoring
* **API documentation** with usage tracking

## 🔧 Configuration Options

### Rate Limiting

* **Public redirects:** 1000 requests per 15 minutes
* **Configurable limits** per environment
* **IP-based tracking** for abuse prevention
* **Whitelist support** for trusted sources

### Redirect Behavior

* **Status codes** - 302 (temporary) or 301 (permanent)
* **Cache headers** - Control browser caching
* **Security headers** - Additional protection layers
* **Analytics tracking** - Enable/disable features
