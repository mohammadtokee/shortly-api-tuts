---
icon: pager
---

# Pagination

## Overview

The Shortly API implements a flexible pagination system using offset-based pagination with search and sorting capabilities for efficient data retrieval.

## 🔢 Pagination Strategy

### Offset-Based Pagination

* **Offset** - Number of items to skip (0-based)
* **Limit** - Number of items per page (1-100)
* **Total** - Total number of items available
* **Navigation** - Next and previous page links

### Pagination Parameters

```typescript
interface RequestQuery {
  search?: string;        // Search term for filtering
  sortby?: string;        // Sort field and order
  offset?: number;        // Items to skip (default: 0)
  limit?: number;         // Items per page (default: 100)
}
```

## 📊 Pagination Response Structure

### Standard Response Format

```json
{
  "total": 150,           // Total number of items
  "offset": 0,            // Current offset
  "limit": 100,           // Items per page
  "next": "/links?offset=100&limit=100&sortby=createdAt_desc",  // Next page link
  "prev": null,           // Previous page link (null if first page)
  "links": [...]          // Array of items
}
```

### Response Fields

| Field    | Type   | Description                             |
| -------- | ------ | --------------------------------------- |
| `total`  | Number | Total items matching the query          |
| `offset` | Number | Current offset position                 |
| `limit`  | Number | Items per page                          |
| `next`   | String | URL for next page (null if no next)     |
| `prev`   | String | URL for previous page (null if no prev) |
| `items`  | Array  | Array of items for current page         |

## 🔍 Search and Filtering

### Search Implementation

```typescript
// Search in link titles using regex
const searchRegex = new RegExp(`\\b${search}\\b`, 'gi');

const links = await Link.find()
  .where('title', searchRegex)  // Apply search filter
  .lean()
  .exec();
```

### Search Features

* **Case-insensitive** - Search works regardless of case
* **Word boundaries** - Matches complete words only
* **Partial matching** - Finds links containing search terms
* **Real-time** - Search applied on every request

## 📋 Sorting Options

### Sort Field Format

```typescript
// Format: field_order
const sortby = 'createdAt_desc';  // Sort by creation date, descending
const [sortField, sortOrder] = sortby.split('_');
```

### Available Sort Fields

| Field         | Description   | Example                               |
| ------------- | ------------- | ------------------------------------- |
| `title`       | Link title    | `title_asc`, `title_desc`             |
| `destination` | Target URL    | `destination_asc`, `destination_desc` |
| `createdAt`   | Creation date | `createdAt_asc`, `createdAt_desc`     |

### Sort Order Values

* **`asc`** - Ascending order (A-Z, 0-9, oldest first)
* **`desc`** - Descending order (Z-A, 9-0, newest first)

## 🔗 Navigation Links

### Link Generation

```typescript
// Generate next page link
const nextLink = generateNextLink({
  baseUrl: req.baseUrl,
  search,
  sortby,
  offset: Number(offset),
  limit: Number(limit),
  total,
});

// Generate previous page link
const prevLink = generatePrevLink({
  baseUrl: req.baseUrl,
  search,
  sortby,
  offset: Number(offset),
  limit: Number(limit),
});
```

### Link Structure

* **Base URL** - API endpoint path
* **Query Parameters** - Preserved across navigation
* **Dynamic Values** - Calculated based on current state
* **Null Handling** - Returns null when no navigation available

## 📱 Pagination Examples

### Example 1: First Page

```http
GET /links?offset=0&limit=100&sortby=createdAt_desc
```

**Response:**

```json
{
  "total": 250,
  "offset": 0,
  "limit": 100,
  "next": "/links?offset=100&limit=100&sortby=createdAt_desc",
  "prev": null,
  "links": [...]
}
```

### Example 2: Middle Page

```http
GET /links?offset=100&limit=100&sortby=createdAt_desc
```

**Response:**

```json
{
  "total": 250,
  "offset": 100,
  "limit": 100,
  "next": "/links?offset=200&limit=100&sortby=createdAt_desc",
  "prev": "/links?offset=0&limit=100&sortby=createdAt_desc",
  "links": [...]
}
```

### Example 3: Last Page

```http
GET /links?offset=200&limit=100&sortby=createdAt_desc
```

**Response:**

```json
{
  "total": 250,
  "offset": 200,
  "limit": 100,
  "next": null,
  "prev": "/links?offset=100&limit=100&sortby=createdAt_desc",
  "links": [...]
}
```

## 🔍 Search Examples

### Example 1: Search with Pagination

```http
GET /links?search=website&offset=0&limit=50&sortby=title_asc
```

**Response:**

```json
{
  "total": 25,
  "offset": 0,
  "limit": 50,
  "next": null,
  "prev": null,
  "links": [...]
}
```

### Example 2: Search with Sorting

```http
GET /links?search=blog&offset=0&limit=20&sortby=createdAt_desc
```

## ⚙️ Configuration Options

### Default Values

```typescript
const defaultQuery = {
  search: '',           // No search filter
  sortby: 'createdAt_desc',  // Newest first
  offset: 0,            // Start from beginning
  limit: 100            // 100 items per page
};
```

### Limits and Constraints

* **Minimum limit:** 1 item per page
* **Maximum limit:** 100 items per page
* **Minimum offset:** 0 (no negative values)
* **Search length:** No maximum (handled by regex)

## 🚀 Performance Considerations

### Database Optimization

* **Indexes** - Proper indexing on sort fields
* **Lean queries** - Use `.lean()` for read-only operations
* **Selective fields** - Only fetch required fields
* **Efficient sorting** - Use indexed fields for sorting

### Memory Management

* **Result limiting** - Prevent excessive memory usage
* **Streaming** - Consider streaming for large datasets
* **Caching** - Cache frequently accessed pages