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

**Response:** `200 OK`

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

* `search` - Search term for link titles (default: "")
* `sortby` - Sort field and order (default: createdAt_desc)
* `offset` - Items to skip (0-based, default: 0)
* `limit` - Items per page (1-100, default: 100)

**Sort Options:**

* `title_asc` - Title A-Z
* `title_desc` - Title Z-A
* `destination_asc` - Destination A-Z
* `destination_desc` - Destination Z-A
* `createdAt_asc` - Oldest first
* `createdAt_desc` - Newest first

**Example Request:**

```
GET /links?search=website&offset=0&limit=50&sortby=createdAt_desc
```

**Response:** `200 OK`

```json
{
  "total": 150,
  "offset": 0,
  "limit": 50,
  "next": "/links?search=website&offset=50&limit=50&sortby=createdAt_desc",
  "prev": null,
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
  ]
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

**Response:** `204 No Content`

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
  "total": "number",
  "offset": "number",
  "limit": "number",
  "next": "string | null",
  "prev": "string | null",
  "links": ["Link"]
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
  "code": "BadRequest",
  "message": "Validation failed"
}
```

**401 Unauthorized - Invalid Token**

```json
{
  "code": "Unauthorized",
  "message": "Invalid or expired token"
}
```

**403 Forbidden - Access Denied**

```json
{
  "code": "AccessDenied",
  "message": "Access denied"
}
```

**404 Not Found - Link Not Found**

```json
{
  "code": "NotFound",
  "message": "Link not found"
}
```

**409 Conflict - BackHalf Already Exists**

```json
{
  "code": "Conflict",
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
Validate Input → Check Ownership → Update Link → Return 204 No Content
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
* [Data Models](../reference/models.md) - Data schema and validation
* [Pagination System](../reference/pagination.md) - Pagination implementation
* [Authentication Guide](../reference/authentication.md) - JWT implementation
* [Security Features](../reference/security.md) - Security best practices
* [Error Handling](../reference/errors.md) - Comprehensive error guide

## 📝 Implementation Notes

* **BackHalf generation** uses secure random strings
* **URL validation** ensures safe redirects
* **Ownership checks** prevent unauthorized access
* **Rate limiting** applies per authenticated user
* **Cascading updates** maintain data consistency
* **Input sanitization** prevents injection attacks
* **Visit counting** is atomic and real-time
