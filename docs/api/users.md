## Users

Base path: `/users`

All routes require:

- Header: `Authorization: Bearer <accessToken>`
- Role: `user` or `admin`

### Get current user

`GET /users/current`

Response:

```json
{
  "user": {
    /* user fields except __v */
  }
}
```

### Update current user

`PATCH /users/current`

Body (any of):

```json
{
  "name": "New Name",
  "email": "new@example.com",
  "current_password": "old",
  "new_password": "newStrongPass123"
}
```

Responses:

- `204 No Content`
- `400 ValidationError`
- `500 ServerError`

Notes:

- If changing password, `current_password` must match; `new_password` min length 8.
- Cannot change `role`.

### Delete current user

`DELETE /users/current`

Response:

- `204 No Content`

Side effects: deletes all links created by the user before deleting the user.
