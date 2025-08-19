## Errors

Errors are returned as JSON. Common shapes:

- Validation errors (400):

```json
{
  "code": "ValidationError",
  "errors": {
    "field": {
      "type": "field",
      "msg": "message",
      "path": "field",
      "location": "body"
    }
  }
}
```

- Generic error (4xx/5xx):

```json
{
  "code": "ErrorCode",
  "message": "Human readable message"
}
```

### Error codes by area

- Auth: `AccessTokenError`, `AccessTokenExpired`, `RefreshTokenError`, `RefreshTokenExpired`
- Reset: `ResetTokenError`, `ResetTokenExpired`, `TokenNotFound`
- Links: `NotFound`, `AccessDenied`
- Common: `ServerError`
