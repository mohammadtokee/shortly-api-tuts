## Shortly API Documentation

Welcome to the Shortly API documentation! This repository contains comprehensive documentation organized into two main sections:

## 📚 Documentation Sections

### 1. [Project Documentation](docs/README.md) 📖
Complete project documentation including:
- **Getting Started** - Installation and setup guides
- **API Reference** - Detailed endpoint documentation
- **Reference Materials** - Technical implementation details
- **Development Guides** - Best practices and workflows

### 2. [API Specifications](api-specs/README.md) 🚀
OpenAPI specifications and testing tools:
- **OpenAPI 3.0.3 Specification** - Machine-readable API definition
- **Testing Tools** - Swagger UI, Postman, Insomnia integration
- **Interactive Testing** - Test API endpoints directly
- **Schema Definitions** - Complete request/response schemas

## 🎯 Quick Start

### For Developers
1. Start with [Project Documentation](docs/README.md)
2. Follow the [Installation Guide](docs/getting-started/installation.md)
3. Configure your [Environment](docs/getting-started/environment.md)

### For API Integration
1. Use the [OpenAPI Specification](api-specs/openapi.yaml)
2. Test with [Swagger UI](https://editor.swagger.io/)
3. Import into [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/)

## 🔗 Base URLs

- **Development:** `http://localhost:3000`
- **Production:** `https://api.shortly.codewithsadee.com`

## 🚀 Features

- JWT auth with access/refresh tokens (refresh in httpOnly cookie)
- Role-based authorization (`user`, `admin`)
- Rate limiting per route type
- Password reset via email token
- Link creation, listing with pagination, update, delete
- Public redirection with visit counters

## 📖 Documentation Structure

```
docs/
├── README.md              # This file - main overview
├── docs/                  # Project documentation
│   ├── README.md         # Documentation guide
│   ├── getting-started/  # Setup and installation
│   ├── api/             # API endpoint docs
│   └── reference/       # Technical reference
└── api-specs/           # API specifications
    ├── README.md        # API specs guide
    └── openapi.yaml    # OpenAPI 3.0.3 specification
```

## 🧪 Testing the API

The OpenAPI specification allows you to:
- **View all endpoints** with detailed descriptions
- **Test requests** with sample data
- **See response schemas** and examples
- **Understand authentication** requirements
- **Validate your integration** before implementation

## 🔧 Getting Help

- **Documentation Issues:** Check the relevant section guides
- **API Problems:** Review error handling and rate limits
- **Setup Issues:** Follow the installation guide step-by-step
- **Integration Questions:** Use the OpenAPI spec for accurate endpoint details

---

**Start exploring:** Choose your path above based on what you need to accomplish!
