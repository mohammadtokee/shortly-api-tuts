## Rate Limits

Rate limiting is implemented with `express-rate-limit` and configured in `src/lib/expressRateLimit.ts`.

- Window: 1 hour (`WINDOW_MS`)
- Types:
  - `basic`: 100 requests/hour
  - `auth`: 10 requests/hour (login)
  - `passReset`: 3 requests/hour (password reset)

Standard headers are enabled (`RateLimit-*`). Legacy headers are disabled.
