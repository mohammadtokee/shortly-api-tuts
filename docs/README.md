---
icon: house-window
cover: .gitbook/assets/introduction-banner.png
coverY: 0
layout:
  width: default
  cover:
    visible: true
    size: hero
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
---

# Introduction

### Shortly API Documentation

Welcome to the Shortly API documentation! This repository contains comprehensive documentation organized into two main sections:

### 📚 Documentation Sections

<table data-card-size="large" data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td>Project Documentation 📖</td><td><p>Complete project documentation including:</p><ul><li><strong>Getting Started</strong> - Installation and setup guides</li><li><strong>API Reference</strong> - Detailed endpoint documentation</li><li><strong>Reference Materials</strong> - Technical implementation details</li><li><strong>Development Guides</strong> - Best practices and workflows</li></ul></td><td><a href="docs/">docs</a></td></tr><tr><td>API Specifications 🚀</td><td><p>OpenAPI specifications and testing tools:</p><ul><li><strong>OpenAPI 3.0.3 Specification</strong> - Machine-readable API definition</li><li><strong>Testing Tools</strong> - Swagger UI, Postman, Insomnia integration</li><li><strong>Interactive Testing</strong> - Test API endpoints directly</li><li><strong>Schema Definitions</strong> - Complete request/response schemas</li></ul></td><td><a href="api-specs/">api-specs</a></td></tr></tbody></table>

### 🎯 Quick Start

#### For Developers

1. Start with [Project Documentation](docs/)
2. Follow the [Installation Guide](docs/getting-started/installation.md)
3. Configure your [Environment](docs/getting-started/environment.md)

#### For API Integration

1. Use the [OpenAPI Specification](api-specs/openapi.yaml)
2. Test with [Swagger UI](https://editor.swagger.io/)
3. Import into [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/)

### 🔗 Base URLs

* **Development:** `http://localhost:3000`
* **Production:** `https://api.shortly.codewithsadee.com`

### 🚀 Features

* **JWT Authentication** 🔐 - Access/refresh tokens with secure cookie handling
* **Role-based Authorization** 👥 - User and admin permissions
* **Rate Limiting** ⏱️ - Per-route protection against abuse
* **Password Reset** 📧 - Secure email-based password recovery
* **Link Management** 🔗 - Create, update, delete, and monitor short links
* **Analytics** 📊 - Real-time visit tracking and user statistics
* **Public Redirection** 🔄 - Fast and secure link redirection

### 📖 Documentation Structure

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

### 🧪 Testing the API

The OpenAPI specification allows you to:

* **View all endpoints** with detailed descriptions
* **Test requests** with sample data
* **See response schemas** and examples
* **Understand authentication** requirements
* **Validate your integration** before implementation

### 🔧 Getting Help

* **Documentation Issues:** Check the relevant section guides
* **API Problems:** Review error handling and rate limits
* **Setup Issues:** Follow the installation guide step-by-step
* **Integration Questions:** Use the OpenAPI spec for accurate endpoint details

***

**Start exploring:** Choose your path above based on what you need to accomplish!
