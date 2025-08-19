## Authentication

### Overview

- Access Token: Bearer JWT in `Authorization` header, expires in 30 minutes.
- Refresh Token: JWT stored in `refreshToken` cookie, expires in 7 days.
  - Cookie attributes: `secure: true`, `httpOnly: true` in production (false in development).

### Header format

```
Authorization: Bearer <accessToken>
```

### Error codes

- `AccessTokenError` (401): missing/invalid token.
- `AccessTokenExpired` (401): token expired.
- `AuthorizationError` (403): role not allowed or no account.

### Roles

- `user`, `admin`
- Protected routes use `authentication` and `authorization(["user","admin"])`.

### Token endpoints

- `GET /auth/refresh-token`: reads refresh token from cookie, returns `{ accessToken }`.
- `DELETE /auth/logout`: clears refresh cookie and invalidates server token, returns `204`.
