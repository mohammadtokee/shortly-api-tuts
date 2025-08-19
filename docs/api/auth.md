## Auth

Base path: `/auth`

### Register

`POST /auth/register`

Body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "role": "user"
}
```

Responses:

- `200 OK`

```json
{
  "user": {
    "_id": "...",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "passwordResetToken": null,
    "role": "user"
  },
  "accessToken": "<jwt>"
}
```

- `400 BadRequest` if trying to register `admin` with non-whitelisted email
- `400 ValidationError` for invalid fields
- `500 ServerError`

Notes:

- Sets `refreshToken` cookie.

### Login

`POST /auth/login`

Body:

```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```

Responses:

- `200 OK`

```json
{
  "user": {
    "_id": "...",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "user"
  },
  "accessToken": "<jwt>"
}
```

- `400 ValidationError` (invalid email/password)
- `500 ServerError`

Notes:

- Sets `refreshToken` cookie.

### Logout

`DELETE /auth/logout`

Headers: `Authorization: Bearer <accessToken>`

Responses:

- `204 No Content`
- `401 AccessTokenError | AccessTokenExpired`

### Refresh Token

`GET /auth/refresh-token`

Reads `refreshToken` from cookie.

Responses:

- `200 OK` `{ "accessToken": "<jwt>" }`
- `401 RefreshTokenExpired | RefreshTokenError`

### Forgot Password

`POST /auth/forgot-password`

Body:

```json
{ "email": "jane@example.com" }
```

Responses:

- `204 No Content`
- `400 ValidationError`
- `500 ServerError`

### Reset Password

`POST /auth/reset-password?token=<token>`

Body:

```json
{ "password": "newPassword123" }
```

Responses:

- `204 No Content`
- `401 ResetTokenExpired | ResetTokenError`
- `404 TokenNotFound`
- `500 ServerError`
