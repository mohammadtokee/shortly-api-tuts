## Environment Variables

These are loaded from `.env` via `dotenv` and referenced in `src/config/index.ts`.

- `PORT` (number): HTTP port, e.g., `3000`.
- `NODE_ENV` (string): `development` or `production`.
- `MONGO_CONNECTION_URI` (string): MongoDB connection string.
- `WHITELISTED_EMAILS` (string): Comma-separated emails allowed to self-register as `admin`.
- `JWT_ACCESS_SECRET` (string): Secret for 30m access tokens.
- `JWT_REFRESH_SECRET` (string): Secret for 7d refresh tokens.
- `JWT_PASSWORD_RESET_SECRET` (string): Secret for 1h password reset tokens.
- `SMTP_AUTH_USERNAME` (string): SMTP username for email sending.
- `SMTP_AUTH_PASS` (string): SMTP password for email sending.
- `CLIENT_ORIGIN` (string): Client base URL (used in short links and reset links).
- `LOGTAIL_SOURCE_TOKEN` (string): Required for logging.
- `LOGTAIL_INGESTING_HOST` (string): Required for logging.

Constants (from code):

- `CORS_WHITELIST`: `https://shortly.codewithsadee.com`
- Rate limit window: 1 hour
- Cookie max age: 7 days
