## Pagination

Used by `GET /links/my-links`.

Query params:

- `search` (string): full-word regex match on `title`.
- `sortby` (string): `<field>_<order>`, default `createdAt_desc`. Fields: `title`, `destination`, `createdAt`. Orders: `asc` or `desc`.
- `offset` (number): default 0.
- `limit` (number): default 100, 1..100.

Response shape:

```json
{
  "total": 25,
  "offset": 0,
  "limit": 10,
  "next": "https://api...",
  "prev": null,
  "links": [
    /* items */
  ]
}
```

`next`/`prev` are absolute URLs when available.
