---
icon: file-code
---

# API Specifications Guide

## Overview

The Shortly API provides comprehensive OpenAPI 3.0.3 specifications that enable developers to understand, test, and integrate with the API efficiently. This guide explains how to use these specifications effectively.

## 📚 OpenAPI Specification

### Specification File

- **File:** `openapi.yaml`
- **Version:** OpenAPI 3.0.3
- **Format:** YAML
- **Size:** Comprehensive API definition

### What's Included

- **Complete endpoint definitions** with all routes
- **Request/response schemas** for all operations
- **Authentication requirements** and security schemes
- **Error responses** and status codes
- **Example data** for testing and development
- **Rate limiting** information and policies

## 🚀 Getting Started

### 1. View the Specification

```bash
# View the raw YAML file
cat openapi.yaml

# Or open in your preferred text editor
code openapi.yaml
```

### 2. Use Online Tools

#### Swagger Editor
1. Visit [Swagger Editor](https://editor.swagger.io/)
2. Copy and paste the contents of `openapi.yaml`
3. View the interactive documentation

#### Swagger UI
1. Visit [Swagger UI](https://swagger.io/tools/swagger-ui/)
2. Load the specification file
3. Test endpoints directly from the browser

### 3. Import into Development Tools

#### Postman
1. Open Postman
2. Click "Import" → "File"
3. Select `openapi.yaml`
4. All endpoints will be imported automatically

#### Insomnia
1. Open Insomnia
2. Click "Create" → "Import from File"
3. Select `openapi.yaml`
4. Generate a complete API collection

## 🔧 Development Integration

### Code Generation

#### OpenAPI Generator

```bash
# Install OpenAPI Generator
npm install @openapitools/openapi-generator-cli -g

# Generate TypeScript client
openapi-generator generate -i openapi.yaml -g typescript-fetch -o ./generated-client

# Generate Python client
openapi-generator generate -i openapi.yaml -g python -o ./generated-client

# Generate Java client
openapi-generator generate -i openapi.yaml -g java -o ./generated-client
```

#### Swagger Codegen

```bash
# Install Swagger Codegen
npm install swagger-codegen -g

# Generate client libraries
swagger-codegen generate -i openapi.yaml -l typescript-fetch -o ./client
```

### IDE Integration

#### VS Code
- Install "OpenAPI (Swagger) Editor" extension
- Open `openapi.yaml` for syntax highlighting and validation
- Use IntelliSense for schema completion

#### IntelliJ IDEA
- Install "OpenAPI Specifications" plugin
- Open `openapi.yaml` for full IDE support
- Generate client code directly from the IDE

## 📊 Specification Structure

### Tags and Organization

The API is organized into logical groups:

- **Base** - API fundamentals and configuration
- **Authentication** - User registration, login, and token management
- **Users** - Profile management and account operations
- **Links** - Short link creation, management, and analytics
- **Redirect** - Public link redirection

### Schema Definitions

#### User Schema
```yaml
User:
  type: object
  properties:
    _id:
      type: string
      description: Unique user identifier
    name:
      type: string
      description: User's full name
    email:
      type: string
      description: User's email address
    role:
      type: string
      enum: [user, admin]
      description: User role
```

#### Link Schema
```yaml
Link:
  type: object
  properties:
    _id:
      type: string
      description: Unique link identifier
    title:
      type: string
      description: Link title
    destination:
      type: string
      description: Target URL
    backHalf:
      type: string
      description: Short link identifier
```

## 🧪 Testing with Specifications

### Interactive Testing

#### Swagger UI
1. Load the specification in Swagger UI
2. Click on any endpoint
3. Click "Try it out"
4. Fill in required parameters
5. Execute the request
6. View the response

#### Postman
1. Import the specification
2. Select an endpoint
3. Fill in request parameters
4. Send the request
5. View response and status

### Automated Testing

#### Generate Test Cases

```typescript
// Example: Generate test cases from OpenAPI spec
import { OpenAPIV3 } from 'openapi-types';

const spec: OpenAPIV3.Document = await loadSpecification();

// Generate tests for each endpoint
Object.entries(spec.paths).forEach(([path, pathItem]) => {
  Object.entries(pathItem).forEach(([method, operation]) => {
    if (method !== 'parameters') {
      generateTest(path, method, operation);
    }
  });
});
```

## 🔐 Authentication Testing

### JWT Token Setup

1. **Register a user** using `POST /auth/register`
2. **Login** using `POST /auth/login`
3. **Copy the access token** from the response
4. **Set Authorization header** in your requests:
   ```
   Authorization: Bearer <your_access_token>
   ```

### Testing Protected Endpoints

```bash
# Example: Get user's links
curl -X GET "http://localhost:3000/links" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

## 📈 Rate Limiting

### Understanding Limits

The specification includes rate limiting information:

- **Authentication endpoints:** 5 requests per 15 minutes
- **User management:** 50 requests per 15 minutes
- **Link management:** 100 requests per 15 minutes
- **Public redirects:** 1000 requests per 15 minutes

### Testing Rate Limits

```bash
# Test rate limiting by making multiple requests
for i in {1..6}; do
  curl -X POST "http://localhost:3000/auth/login" \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"password"}'
  echo "Request $i completed"
done
```

## 🛠️ Customization

### Modifying the Specification

#### Add Custom Endpoints

```yaml
# Add new endpoint to openapi.yaml
paths:
  /custom-endpoint:
    get:
      tags:
        - Custom
      summary: Custom endpoint
      description: Description of custom endpoint
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: object
```

#### Extend Schemas

```yaml
# Extend existing schemas
components:
  schemas:
    ExtendedUser:
      allOf:
        - $ref: '#/components/schemas/User'
        - type: object
          properties:
            customField:
              type: string
              description: Custom user field
```

## 📋 Validation

### Specification Validation

#### Online Validators

1. **Swagger Editor** - Built-in validation
2. **OpenAPI Validator** - Online validation service
3. **Redoc** - Alternative documentation generator

#### Local Validation

```bash
# Install OpenAPI validator
npm install -g @apidevtools/swagger-cli

# Validate specification
swagger-cli validate openapi.yaml

# Check for linting issues
swagger-cli lint openapi.yaml
```

## 🔗 Integration Examples

### Frontend Integration

#### React with OpenAPI

```typescript
// Generate TypeScript types from OpenAPI spec
import { User, Link } from './generated-types';

// Use generated types in components
const UserProfile: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};
```

#### Vue.js Integration

```typescript
// Generate Vue.js client
import { ApiClient } from './generated-client';

const api = new ApiClient({
  baseURL: 'http://localhost:3000',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Use in components
const { data: links } = await api.getLinks();
```

### Backend Integration

#### Node.js/Express

```typescript
// Validate requests against OpenAPI spec
import { validateRequest } from 'openapi-validator';

app.post('/links', validateRequest(spec), async (req, res) => {
  // Request is validated against OpenAPI spec
  const { title, destination } = req.body;
  // ... implementation
});
```

## 📚 Related Documentation

- [API Reference](../docs/api/README.md) - Complete API documentation
- [Authentication Guide](../docs/reference/authentication.md) - Security implementation
- [Data Models](../docs/reference/models.md) - Schema details
- [Error Handling](../docs/reference/errors.md) - Error responses

## 🚀 Best Practices

### Development Workflow

1. **Start with the specification** - Understand the API structure
2. **Generate client code** - Use tools to create type-safe clients
3. **Test endpoints** - Use interactive tools for manual testing
4. **Implement integration** - Use generated code in your application
5. **Monitor and iterate** - Update based on usage patterns

### Specification Maintenance

- **Keep it updated** - Reflect all API changes
- **Version control** - Track specification changes
- **Automate generation** - Generate clients automatically
- **Validate regularly** - Ensure specification quality

## 📝 Notes

- **OpenAPI 3.0.3** is the latest stable version
- **YAML format** is human-readable and widely supported
- **Code generation** supports many programming languages
- **Interactive testing** is available through multiple tools
- **Specification validation** ensures API quality

---

**Ready to integrate?** Start by exploring the [OpenAPI Specification](openapi.yaml) and then use the tools and examples above to build your integration.
