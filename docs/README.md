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

<table data-card-size="large" data-view="cards" data-full-width="false"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><h4>Project Documentation 📖</h4></td><td><p>Complete project documentation including:</p><ul><li><strong>Getting Started</strong> - Installation and setup guides</li><li><strong>API Reference</strong> - Detailed endpoint documentation</li><li><strong>Reference Materials</strong> - Technical implementation details</li><li><strong>Development Guides</strong> - Best practices and workflows</li></ul></td><td><a href="docs/">docs</a></td></tr><tr><td><h4>API Specifications 🚀</h4></td><td><p>OpenAPI specifications and testing tools:</p><ul><li><strong>OpenAPI 3.0.3 Specification</strong> - Machine-readable API definition</li><li><strong>Testing Tools</strong> - Swagger UI, Postman, Insomnia integration</li><li><strong>Interactive Testing</strong> - Test API endpoints directly</li><li><strong>Schema Definitions</strong> - Complete request/response schemas</li></ul></td><td><a href="api-specs/">api-specs</a></td></tr></tbody></table>

### 🎯 Quick Start

<table data-card-size="large" data-view="cards"><thead><tr><th></th><th></th></tr></thead><tbody><tr><td><h4>For Developers</h4></td><td><ol><li>Start with <a href="docs/">Project Documentation</a></li></ol><ol start="2"><li>Follow the <a href="docs/getting-started/installation.md">Installation Guide</a></li></ol><ol start="3"><li>Configure your <a href="docs/getting-started/environment.md">Environment</a></li></ol></td></tr><tr><td><h4>For API Integration</h4></td><td><ol><li>Use the <a href="api-specs/openapi.yaml">OpenAPI Specification</a></li></ol><ol start="2"><li>Test with <a href="https://editor.swagger.io/">Swagger UI</a></li></ol><ol start="3"><li>Import into <a href="https://www.postman.com/">Postman</a> or <a href="https://insomnia.rest/">Insomnia</a></li></ol></td></tr></tbody></table>

### 🔗 Base URLs

{% tabs %}
{% tab title="Development" %}
```url
http://localhost:3000
```
{% endtab %}

{% tab title="Production" %}
```url
https://api.shortly.codewithsadee.com
```
{% endtab %}
{% endtabs %}

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
