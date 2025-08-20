---
icon: link-simple
---

# Link Routes

## Overview

Link routes handle the creation, management, and analytics of short links. These endpoints allow authenticated users to generate, update, and monitor their URL shortening services.

## 📚 OpenAPI Reference

For complete endpoint details, request/response schemas, and examples, refer to the [OpenAPI Specification](../../api-specs/openapi.yaml) under the **Links** tag.

## 🔑 Available Endpoints

### 1. Create Short Link

* **Endpoint:** `POST /links`
* **Description:** Generate a new short link for the given destination URL
* **Authentication:** Required (Bearer token)
* **Rate Limit:** 100 requests per 15 minutes

**Headers Required:**

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "title": "My Website",
  "destination": "https://example.com",
  "backHalf": "my-site"
}
```

**Response:** `201 Created`

```json
{
  "link": {
    "_id": "link_id_here",
    "title": "My Website",
    "destination": "https://example.com",
    "backHalf": "my-site",
    "shortLink": "https://shortly.com/my-site",
    "creator": "user_id_here",
    "totalVisitCount": 0,
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
}
```

**Notes:**

* `backHalf` is optional - auto-generated if not provided
* `title` and `destination` are required
* Auto-generates unique short link identifier

### 2. Get User's Links

* **Endpoint:** `GET /links`
* **Description:** Retrieve paginated list of links created by the authenticated user
* **Authentication:** Required (Bearer token)
* **Rate Limit:** 100 requests per 15 minutes

**Headers Required:**

```http
Authorization: Bearer <access_token>
```

**Query Parameters:**

* `page` - Page number (1-based, default: 1)
* `limit` - Items per page (1-100, default: 10)
* `sortBy` - Sort field (createdAt, updatedAt, title, totalVisitCount)
* `sortOrder` - Sort direction (asc, desc)

**Example Request:**

```
GET /links?page=1&limit=5&sortBy=totalVisitCount&sortOrder=desc
```

**Response:** `200 OK`

```json
{
  "links": [
    {
      "_id": "link_id_1",
      "title": "My Website",
      "destination": "https://example.com",
      "backHalf": "my-site",
      "shortLink": "https://shortly.com/my-site",
      "creator": "user_id_here",
      "totalVisitCount": 150,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 25,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### 3. Update Link

* **Endpoint:** `PUT /links/{linkId}`
* **Description:** Update an existing link (only by creator or admin)
* **Authentication:** Required (Bearer token)
* **Rate Limit:** 100 requests per 15 minutes

**Headers Required:**

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body (all fields optional):**

```json
{
  "title": "Updated Website Title",
  "destination": "https://new-example.com",
  "backHalf": "new-half"
}
```

**Response:** `200 OK`

```json
{
  "link": {
    "_id": "link_id_here",
    "title": "Updated Website Title",
    "destination": "https://new-example.com",
    "backHalf": "new-half",
    "shortLink": "https://shortly.com/new-half",
    "creator": "user_id_here",
    "totalVisitCount": 150,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

**Notes:**

* Only creator or admin can update links
* All fields are optional - only update what you need
* `backHalf` changes affect the short URL

### 4. Delete Link

* **Endpoint:** `DELETE /links/{linkId}`
* **Description:** Delete a link (only by creator or admin)
* **Authentication:** Required (Bearer token)
* **Rate Limit:** 100 requests per 15 minutes

**Headers Required:**

```http
Authorization: Bearer <access_token>
```

**Response:** `204 No Content`

**Notes:**

* Only creator or admin can delete links
* **Irreversible action** - link cannot be recovered
* Visit count analytics are lost

## 🔍 Request Validation

### Link Creation Validation

* **title:** 1-100 characters, required
* **destination:** Valid URL format, required
* **backHalf:** 1-50 characters, alphanumeric + underscore + hyphen, optional

### Link Update Validation

* **title:** 1-100 characters, optional
* **destination:** Valid URL format, optional
* **backHalf:** 1-50 characters, alphanumeric + underscore + hyphen, optional

### URL Validation Rules

* **destination** must be valid HTTP/HTTPS URL
* **backHalf** must be unique across all users
* **backHalf** cannot contain special characters except `_` and `-`

## 📊 Response Models

### Link Response

```json
{
  "link": {
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
}
```

### Paginated Links Response

```json
{
  "links": ["Link"],
  "pagination": {
    "currentPage": "number",
    "totalPages": "number",
    "totalItems": "number",
    "itemsPerPage": "number",
    "hasNextPage": "boolean",
    "hasPrevPage": "boolean"
  }
}
```

### Link Model Fields

* **\_id:** Unique link identifier (MongoDB ObjectId)
* **title:** Link title (1-100 characters)
* **destination:** Target URL (valid HTTP/HTTPS)
* **backHalf:** Short link identifier (unique)
* **shortLink:** Complete short URL
* **creator:** User ID who created the link
* **totalVisitCount:** Total number of visits
* **createdAt:** Link creation timestamp
* **updatedAt:** Last update timestamp

## 🛡️ Security Features

* **Authentication Required** - All endpoints require valid access token
* **Ownership Validation** - Users can only manage their own links
* **Admin Override** - Admins can manage any link
* **Rate Limiting** - Prevents abuse and spam
* **Input Validation** - All data is validated and sanitized
* **URL Sanitization** - Prevents malicious redirects

## 📋 Error Handling

### Common Error Responses

**400 Bad Request - Validation Error**

```json
{
  "error": "ValidationError",
  "message": "Validation failed",
  "details": [
    {
      "field": "destination",
      "message": "Invalid URL format"
    }
  ]
}
```

**401 Unauthorized - Invalid Token**

```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

**403 Forbidden - Access Denied**

```json
{
  "error": "Forbidden",
  "message": "Access denied"
}
```

**404 Not Found - Link Not Found**

```json
{
  "error": "NotFound",
  "message": "Link not found"
}
```

**409 Conflict - BackHalf Already Exists**

```json
{
  "error": "Conflict",
  "message": "Back-half already exists"
}
```

## 🔄 Link Management Workflows

### 1. Link Creation

```
Validate Input → Check BackHalf Uniqueness → Create Link → Return Link Data
```

### 2. Link Update

```
Validate Input → Check Ownership → Update Link → Return Updated Data
```

### 3. Link Deletion

```
Check Ownership → Delete Link → Return 204 No Content
```

### 4. Link Retrieval

```
Authenticate User → Fetch User's Links → Apply Pagination → Return Results
```

## 📈 Analytics Features

### Visit Tracking

* **Real-time counting** - Updates with each redirect
* **Aggregated data** - Total visits per link
* **User analytics** - Combined visit counts in user profile

### Performance Insights

* **Popular links** - Sort by visit count
* **Recent activity** - Sort by creation/update time
* **User engagement** - Track link performance

## 🔗 Related Documentation

* [OpenAPI Specification](../../api-specs/openapi.yaml) - Complete endpoint details
* [Link Models](broken-reference) - Data schema and validation
* [Pagination System](broken-reference) - Pagination implementation
* [Authentication Guide](broken-reference) - JWT implementation
* [Security Features](broken-reference) - Security best practices
* [Error Handling](broken-reference) - Comprehensive error guide

## 📝 Implementation Notes

* **BackHalf generation** uses secure random strings
* **URL validation** ensures safe redirects
* **Ownership checks** prevent unauthorized access
* **Rate limiting** applies per authenticated user
* **Cascading updates** maintain data consistency
* **Input sanitization** prevents injection attacks
* **Visit counting** is atomic and real-time
