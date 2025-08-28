---
icon: lock
---

# Authentication Routes

## Overview

Authentication routes handle user registration, login, logout, and token management. These endpoints provide secure access control for the Shortly API.

## 🔑 Available Endpoints

## 1. User Registration

* **Endpoint:** `POST /auth/register`
* **Description:** Create a new user account
* **Authentication:** Not required
* **Rate Limit:** 5 requests per 15 minutes

{% openapi-operation spec="shortly-api" path="/auth/register" method="post" %}
[OpenAPI shortly-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/cf964ce372f8754823f4a7abbf815324f3aa54f6870bcfa4682464a6f2d69062.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250821%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250821T162012Z&X-Amz-Expires=172800&X-Amz-Signature=f7f547ba8929b2710feb21edbdfa92adeaf33adafc01a9a291dd057fdf9ab20b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

**Notes:**

* Sets `refreshToken` cookie automatically
* Admin role requires whitelisted email addresses
* Returns user data and access token

## 2. User Login

* **Endpoint:** `POST /auth/login`
* **Description:** Authenticate user and receive access token
* **Authentication:** Not required
* **Rate Limit:** 5 requests per 15 minutes

{% openapi-operation spec="shortly-api" path="/auth/login" method="post" %}
[OpenAPI shortly-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/cf964ce372f8754823f4a7abbf815324f3aa54f6870bcfa4682464a6f2d69062.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250821%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250821T162012Z&X-Amz-Expires=172800&X-Amz-Signature=f7f547ba8929b2710feb21edbdfa92adeaf33adafc01a9a291dd057fdf9ab20b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

**Headers Set:**

* `Set-Cookie: refreshToken=token_value; HttpOnly; Secure; SameSite=Strict`

## 3. User Logout

* **Endpoint:** `DELETE /auth/logout`
* **Description:** Logout user and invalidate refresh token
* **Authentication:** Required (Bearer token)
* **Rate Limit:** 5 requests per 15 minutes

{% openapi-operation spec="shortly-api" path="/auth/logout" method="delete" %}
[OpenAPI shortly-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/cf964ce372f8754823f4a7abbf815324f3aa54f6870bcfa4682464a6f2d69062.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250821%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250821T162012Z&X-Amz-Expires=172800&X-Amz-Signature=f7f547ba8929b2710feb21edbdfa92adeaf33adafc01a9a291dd057fdf9ab20b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

**Notes:**

* Invalidates the refresh token cookie
* Requires valid access token
* Clears refresh token from database

## 4. Refresh Access Token

* **Endpoint:** `GET /auth/refresh-token`
* **Description:** Get new access token using refresh token
* **Authentication:** Not required (uses cookie)
* **Rate Limit:** 5 requests per 15 minutes

{% openapi-operation spec="shortly-api" path="/auth/refresh-token" method="get" %}
[OpenAPI shortly-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/cf964ce372f8754823f4a7abbf815324f3aa54f6870bcfa4682464a6f2d69062.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250821%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250821T162012Z&X-Amz-Expires=172800&X-Amz-Signature=f7f547ba8929b2710feb21edbdfa92adeaf33adafc01a9a291dd057fdf9ab20b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

**Notes:**

* Reads refresh token from HTTP-only cookie
* Automatically handles token refresh
* Returns new access token

## 5. Forgot Password

* **Endpoint:** `POST /auth/forgot-password`
* **Description:** Send password reset email
* **Authentication:** Not required
* **Rate Limit:** 5 requests per 15 minutes

{% openapi-operation spec="shortly-api" path="/auth/forgot-password" method="post" %}
[OpenAPI shortly-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/cf964ce372f8754823f4a7abbf815324f3aa54f6870bcfa4682464a6f2d69062.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250821%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250821T162013Z&X-Amz-Expires=172800&X-Amz-Signature=940a65b1d5af52348d8537f6b4165afd0573df191b8448de224fe181adb0ec05&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}

**Notes:**

* Sends password reset email
* Generates secure reset token
* Token expires after 1 hour

## 6. Reset Password

* **Endpoint:** `POST /auth/reset-password`
* **Description:** Reset password using token from email
* **Authentication:** Not required
* **Rate Limit:** 5 requests per 15 minutes

{% openapi-operation spec="shortly-api" path="/auth/reset-password" method="post" %}
[OpenAPI shortly-api](https://gitbook-x-prod-openapi.4401d86825a13bf607936cc3a9f3897a.r2.cloudflarestorage.com/raw/cf964ce372f8754823f4a7abbf815324f3aa54f6870bcfa4682464a6f2d69062.yaml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=dce48141f43c0191a2ad043a6888781c%2F20250821%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250821T162013Z&X-Amz-Expires=172800&X-Amz-Signature=940a65b1d5af52348d8537f6b4165afd0573df191b8448de224fe181adb0ec05&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
{% endopenapi-operation %}
