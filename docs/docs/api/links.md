## Links

Base path: `/links`

All routes require:

- Header: `Authorization: Bearer <accessToken>`
- Role: `user` or `admin`

### Create short link

`POST /links/generate`

Body:

```json
{
  "title": "My site",
  "destination": "https://example.com",
  "backHalf": "optional-custom"
}
```

Responses:

- `200 OK`

```json
{
  "link": {
    "_id": "...",
    "title": "My site",
    "destination": "https://example.com",
    "backHalf": "abc12",
    "shortLink": "<CLIENT_ORIGIN>/abc12",
    "creator": "...",
    "totalVisitCount": 0,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

- `400 ValidationError`
- `500 ServerError`

### List my links

`GET /links/my-links`

Query: see [Pagination](../reference/pagination.md)

Response: pagination envelope with `links` array.

### Update link

`PATCH /links/:linkId`

Body (any of):

```json
{
  "title": "New title",
  "destination": "https://new.com",
  "backHalf": "new-half"
}
```

Responses:

- `204 No Content`
- `400 ValidationError`
- `403 AccessDenied`
- `404 NotFound`
- `500 ServerError`

### Delete link

`DELETE /links/:linkId`

Responses:

- `204 No Content`
- `403 AccessDenied`
- `404 NotFound`
- `500 ServerError`
