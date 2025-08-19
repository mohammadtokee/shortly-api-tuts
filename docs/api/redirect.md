## Redirect

Public endpoint. No auth required.

### Redirect by backHalf

`GET /:backHalf`

Behavior:

- If `backHalf` exists, increments link and user visit counters and redirects to `destination`.
- If `destination` does not start with `https://`, it is prefixed automatically.

Responses:

- `302 Redirect`
- `404 NotFound` if backHalf not found
- `500 ServerError`
