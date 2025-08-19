## Shortly API

A URL shortening REST API built with Express.js, TypeScript, and MongoDB. This GitBook documents setup, authentication, and all endpoints.

- Base URL (development): `http://localhost:3000`
- Base URL (production): `https://api.shortly.codewithsadee.com`
- Client URL: value of `CLIENT_ORIGIN`

### Features

- JWT auth with access/refresh tokens (refresh in httpOnly cookie)
- Role-based authorization (`user`, `admin`)
- Rate limiting per route type
- Password reset via email token
- Link creation, listing with pagination, update, delete
- Public redirection with visit counters

### Quick links

- [Getting Started](getting-started/installation.md)
- [Environment Variables](getting-started/environment.md)
- [API Reference](api/root.md)
