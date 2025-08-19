# API Specifications 📚

This section contains the complete API specifications for the Shortly API, including OpenAPI documentation and testing tools.

## 🚀 OpenAPI Specification

The `openapi.yaml` file contains the complete API specification following the OpenAPI 3.0.3 standard. This specification provides:

- **Complete endpoint documentation** for all API routes
- **Request/response schemas** with detailed examples
- **Authentication requirements** and security schemes
- **Error handling** and status codes
- **Data validation** rules and constraints

## 🧪 Testing the API

### Option 1: Swagger UI (Recommended)

1. **Copy the OpenAPI spec URL:**
   ```
   https://raw.githubusercontent.com/yourusername/shortly-api-tuts/main/docs/api-specs/openapi.yaml
   ```

2. **Visit Swagger UI:**
   - Go to [Swagger Editor](https://editor.swagger.io/)
   - Or use [Swagger UI Demo](https://petstore.swagger.io/)
   - Paste the URL in the "Import URL" field

3. **Test endpoints directly:**
   - See all available endpoints
   - Try out requests with sample data
   - View response schemas
   - Test authentication flows

### Option 2: Postman

1. **Import the OpenAPI spec:**
   - Open Postman
   - Click "Import" → "Link"
   - Paste the OpenAPI spec URL
   - Postman will automatically create a collection

2. **Set up environment variables:**
   - Create an environment for your API
   - Set `baseUrl` to your server URL
   - Set `accessToken` for authenticated requests

3. **Test the API:**
   - All endpoints will be pre-configured
   - Use the collection runner for automated testing
   - Set up tests and assertions

### Option 3: Insomnia

1. **Import the spec:**
   - Open Insomnia
   - Create new project
   - Import from URL: paste the OpenAPI spec URL

2. **Configure environment:**
   - Set up environment variables
   - Configure authentication headers

3. **Test endpoints:**
   - Use the built-in request builder
   - Test with real data
   - View response details

## 🔑 Authentication Testing

### 1. Register a User
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "user"
  }'
```

### 2. Login to Get Token
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Use Token for Authenticated Requests
```bash
curl -X GET http://localhost:3000/links \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 📋 Available Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `DELETE /auth/logout` - User logout
- `GET /auth/refresh-token` - Refresh access token
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password

### Links
- `POST /links` - Create short link
- `GET /links` - Get user's links (paginated)
- `PUT /links/{linkId}` - Update link
- `DELETE /links/{linkId}` - Delete link

### Users
- `GET /users/me` - Get current user profile
- `PUT /users/me` - Update current user profile
- `DELETE /users/me` - Delete current user account

### Redirect
- `GET /{backHalf}` - Redirect to destination URL

## 🔍 Schema Examples

### User Registration
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "user"
}
```

### Create Link
```json
{
  "title": "My Website",
  "destination": "https://example.com",
  "backHalf": "my-site"
}
```

### Update User
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

## 🚦 Rate Limiting

The API implements rate limiting to prevent abuse:

- **Authentication endpoints:** 5 requests per 15 minutes
- **Link management:** 100 requests per 15 minutes
- **User profile:** 50 requests per 15 minutes
- **Public redirects:** 1000 requests per 15 minutes

## 📝 Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "ValidationError",
  "message": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## 🛠️ Development

### Local Testing
1. Start your server: `npm run dev`
2. Use the OpenAPI spec with localhost URLs
3. Test all endpoints locally before deployment

### Environment Variables
Make sure these are set for testing:
- `MONGODB_URI` - Database connection
- `JWT_SECRET` - JWT signing secret
- `JWT_REFRESH_SECRET` - Refresh token secret
- `SMTP_HOST` - Email server (for password reset)

## 📚 Additional Resources

- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)
- [Postman API Testing](https://www.postman.com/api-platform/)
- [Insomnia REST Client](https://insomnia.rest/)

---

**Happy Testing! 🎉**

Use the OpenAPI specification to explore, test, and integrate with the Shortly API.
