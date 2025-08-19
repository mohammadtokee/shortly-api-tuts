## Security

- CORS: Only origins in `CORS_WHITELIST` are allowed in production. In development, all origins are allowed (`src/lib/cors.ts`).
- Helmet: Standard security headers enabled.
- Cookies: `refreshToken` uses `secure: true` and `httpOnly: true` in production.
- Passwords: Stored as bcrypt hashes.
- JWTs: Signed with secrets from environment variables. Access tokens (30m), refresh tokens (7d), reset tokens (1h).
- Logging: Logtail is required; console logging in development.
