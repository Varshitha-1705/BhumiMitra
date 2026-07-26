# 🌿 BhumiMitra

**BhumiMitra — AI-Powered Karnataka Land Records & Digital Land Management Platform**

BhumiMitra is a digital platform designed to simplify access to Karnataka land records and related services. It provides users with a centralized interface to explore land records, track mutation status, view survey information, upload and analyze land documents, and interact with AI-powered assistants through text and voice.

---
<p align="center">
  <img src="https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/AI-Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" />
</p>

---
## Table of Contents

* [Problem Statement](#problem-statement)
* [Our Solution](#our-solution)
* [System Architecture](#system-architecture)
* [AI & Document Processing Pipeline](#ai--document-processing-pipeline)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Database](#database)
* [Features](#features)
* [API Reference](#api-reference)
* [Getting Started](#getting-started)
* [Environment Variables](#environment-variables)
* [Authentication Flow](#authentication-flow)
* [Future Enhancements](#future-enhancements)

---

# Problem Statement

Managing and understanding land records can be difficult for users due to:

* Complex land record terminology such as RTC, Pahani, and Mutation
* Difficulty accessing land ownership and survey information
* Lack of a centralized platform for different land-related services
* Difficulty understanding scanned or physical land documents
* Language barriers for users who are more comfortable with regional Indian languages
* Limited accessibility for users who prefer voice-based interaction
* Manual processes involved in understanding and managing land records

As a result, users may spend significant time navigating multiple services and trying to understand complex land-related information.

---

# Our Solution

BhumiMitra brings multiple land-related services together into a single digital platform.

| Feature           | What Happens                                                             |
| ----------------- | ------------------------------------------------------------------------ |
| User Registration | Users create a secure BhumiMitra account                                 |
| User Login        | Users authenticate using email and password                              |
| RTC / Pahani      | Users can access and understand land record information                  |
| Mutation Status   | Users can track land ownership transfer and mutation-related information |
| Survey Maps       | Users can explore survey and land boundary information                   |
| AI Assistant      | Users can ask questions about Karnataka land records                     |
| OCR Documents     | Users can upload documents and extract relevant text                     |
| Voice Assistant   | Users can ask land-related questions using voice                         |
| My Documents      | Users can access their saved land documents                              |
| Land Updates      | Users can stay informed about relevant land-related updates              |

---

# System Architecture

```text
                         ┌──────────────────────┐
                         │        User          │
                         │  Web Browser / UI    │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   React + Vite       │
                         │      Frontend        │
                         └──────────┬───────────┘
                                    │
                              REST API Calls
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Express + TypeScript │
                         │       Backend        │
                         └──────────┬───────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
      ┌───────────────┐     ┌───────────────┐     ┌───────────────┐
      │  PostgreSQL   │     │   Gemini AI   │     │ OCR / Voice   │
      │   Database    │     │     API       │     │   Services    │
      └───────────────┘     └───────────────┘     └───────────────┘
```

---

# AI & Document Processing Pipeline

BhumiMitra integrates AI-powered capabilities to make land-related information easier to understand.

## Step 1: User Input

Users can interact with the platform through:

* Text-based queries
* Voice-based questions
* Uploaded land documents

---

## Step 2: Document Processing

For document-related workflows, uploaded documents can be processed to extract relevant information and make the content easier to understand.

The document workflow includes:

```text
Land Document
      │
      ▼
Document Upload
      │
      ▼
OCR / Text Extraction
      │
      ▼
Extracted Text
      │
      ▼
AI Processing
      │
      ▼
Structured / Simplified Information
```

---

## Step 3: AI Assistant

Users can ask questions related to Karnataka land records.

Example topics include:

* RTC
* Pahani
* Mutation
* Survey Numbers
* Land Ownership
* Survey Maps
* Land Registration
* Property Documents
* Karnataka Land Records
* Bhoomi Land Records

The AI assistant provides simplified responses to help users understand land-related concepts.

---

## Step 4: Voice Assistant

The Voice Assistant allows users to interact with BhumiMitra using speech.

The workflow is:

```text
User Speaks
     │
     ▼
Speech Recognition
     │
     ▼
User Question
     │
     ▼
Gemini AI
     │
     ▼
Response in Selected Language
     │
     ▼
Voice Output
```

Supported language options include:

* English
* Hindi
* Kannada
* Telugu
* Tamil

---

# Tech Stack

## Frontend

| Technology         | Purpose                                    |
| ------------------ | ------------------------------------------ |
| React              | Frontend UI framework                      |
| TypeScript         | Type-safe development                      |
| Vite               | Frontend build tool and development server |
| Tailwind CSS / CSS | UI styling                                 |
| React Router       | Client-side routing                        |
| Lucide React       | UI icons                                   |
| Fetch API          | Backend API communication                  |

---

## Backend

| Technology     | Purpose                          |
| -------------- | -------------------------------- |
| Node.js        | JavaScript runtime               |
| Express        | REST API framework               |
| TypeScript     | Type-safe backend development    |
| PostgreSQL     | Relational database              |
| pg             | PostgreSQL database connectivity |
| bcrypt         | Password hashing                 |
| JSON Web Token | Authentication                   |
| dotenv         | Environment variable management  |
| CORS           | Cross-origin resource sharing    |

---

## AI & Document Processing

| Technology         | Purpose                                           |
| ------------------ | ------------------------------------------------- |
| Google Gemini API  | AI-powered land record assistance                 |
| Gemini AI          | Voice question processing and response generation |
| OCR                | Text extraction from uploaded documents           |
| Speech Recognition | Voice-based user interaction                      |

---

# Project Structure

```text
BhumiMitra/
│
├── README.md
├── .gitignore
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── backend.ts
│   │   │
│   │   ├── components/
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── RTC.tsx
│   │   │   ├── Mutation.tsx
│   │   │   ├── Survey.tsx
│   │   │   ├── OCR.tsx
│   │   │   ├── Voice.tsx
│   │   │   ├── Assistant.tsx
│   │   │   ├── Documents.tsx
│   │   │   └── Updates.tsx
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── vite.config.ts
│
└── backend/
    │
    ├── src/
    │   │
    │   ├── config/
    │   │   └── db.ts
    │   │
    │   ├── routes/
    │   │   ├── authRoutes.ts
    │   │   ├── landRoutes.ts
    │   │   ├── mutationRoutes.ts
    │   │   ├── surveyRoutes.ts
    │   │   ├── ocrRoutes.ts
    │   │   └── voiceRoutes.ts
    │   │
    │   └── server.ts
    │
    ├── .env
    ├── .env.example
    ├── package.json
    └── tsconfig.json
```

> The exact project structure may vary depending on the final implementation and additional components added during development.

---

# Database

BhumiMitra uses **PostgreSQL** for storing application data.

The database manages information such as:

* User accounts
* User names
* Email addresses
* Phone numbers
* Hashed passwords
* Land-related records
* Mutation-related information
* Survey-related information
* Document metadata

Passwords are never stored as plain text. User passwords are hashed using `bcrypt` before being stored in the database.

---

# Features

## Authentication

### User Registration

Users can create a BhumiMitra account using:

* Name
* Email
* Phone Number
* Password

Passwords are securely hashed before database storage.

### User Login

Users can log in using their:

* Email
* Password

Successful login generates a JWT authentication token.

### JWT Authentication

The application uses JSON Web Tokens for authentication.

The frontend stores:

```text
bhumiMitraToken
```

and:

```text
bhumiMitraUser
```

in browser local storage for maintaining the logged-in user session.

---

# Land Record Services

## RTC / Pahani

Provides access to land record-related information.

Users can explore information related to:

* Record of Rights
* Tenancy
* Crops
* Land ownership
* Land-related details

---

## Mutation Status

Allows users to access mutation-related information and track ownership transfer processes.

---

## Survey Maps

Provides survey-related services for exploring:

* Survey numbers
* Land boundaries
* Survey maps
* Land locations

---

# AI Assistant

The AI Assistant allows users to ask questions related to Karnataka land records.

Example:

```text
What is RTC in Karnataka land records?
```

The AI assistant provides a simplified response to help users understand the concept.

The system is designed to support questions about:

* RTC
* Pahani
* Mutation
* Survey Numbers
* Land Ownership
* Property Documents
* Land Registration
* Karnataka Land Records

---

# OCR Documents

The OCR module allows users to upload land-related documents.

The document processing workflow is:

```text
Upload Document
       │
       ▼
OCR Processing
       │
       ▼
Text Extraction
       │
       ▼
Document Understanding
       │
       ▼
User-Friendly Information
```

This feature is designed to help users understand information contained in scanned land documents.

---

# Voice Assistant

BhumiMitra includes a voice-based assistant for easier accessibility.

Users can:

1. Select a language.
2. Ask a question using their voice.
3. Convert speech into a question.
4. Send the question to the backend.
5. Process the question using Gemini AI.
6. Receive a response in the selected language.

Supported languages:

```text
English
Hindi
Kannada
Telugu
Tamil
```

---

# My Documents

The My Documents section is designed to provide users with a centralized location for accessing their saved land-related documents.

Users can manage documents associated with their land records and document-processing workflows.

---

# Land Updates

The Land Updates section is designed to keep users informed about relevant land-related information and updates.

Possible update categories include:

* Government notifications
* Land record updates
* Registration updates
* Latest announcements
* Important notifications

---

# API Reference

## Authentication

| Method | Endpoint             | Auth   | Description                        |
| ------ | -------------------- | ------ | ---------------------------------- |
| POST   | `/api/auth/register` | Public | Register a new user                |
| POST   | `/api/auth/login`    | Public | Authenticate user and generate JWT |

---

## Backend Health

| Method | Endpoint      | Auth   | Description                 |
| ------ | ------------- | ------ | --------------------------- |
| GET    | `/api/health` | Public | Check backend server status |

Example response:

```json
{
  "success": true,
  "message": "BhumiMitra Backend is running successfully!"
}
```

---

## Land Records

| Method     | Endpoint        | Auth          | Description                    |
| ---------- | --------------- | ------------- | ------------------------------ |
| GET / POST | `/api/land/...` | As configured | Land record-related operations |

---

## Mutation

| Method     | Endpoint            | Auth          | Description                 |
| ---------- | ------------------- | ------------- | --------------------------- |
| GET / POST | `/api/mutation/...` | As configured | Mutation-related operations |

---

## Survey

| Method     | Endpoint          | Auth          | Description               |
| ---------- | ----------------- | ------------- | ------------------------- |
| GET / POST | `/api/survey/...` | As configured | Survey-related operations |

---

## OCR

| Method | Endpoint       | Auth          | Description                  |
| ------ | -------------- | ------------- | ---------------------------- |
| POST   | `/api/ocr/...` | As configured | Upload and process documents |

---

## Voice Assistant

| Method | Endpoint         | Auth          | Description                                       |
| ------ | ---------------- | ------------- | ------------------------------------------------- |
| POST   | `/api/voice/ask` | As configured | Process voice assistant questions using Gemini AI |

Example request:

```json
{
  "question": "What is RTC in Karnataka land records?",
  "language": "en-IN"
}
```

Example response:

```json
{
  "success": true,
  "answer": "RTC stands for Record of Rights, Tenancy and Crops. It is an important land record in Karnataka that contains information about land ownership, tenancy, and crops grown on the land."
}
```

---

# Getting Started

## Prerequisites

Make sure you have the following installed:

* Node.js 18+
* npm
* PostgreSQL
* Git
* Google Gemini API key

---

# 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/BhumiMitra.git
cd BhumiMitra
```

---

# 2. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
```

Start the backend development server:

```bash
npm run dev
```

The backend should run at:

```text
https://bhumimitra-backend.onrender.com
```

Test the backend:

```text
https://bhumimitra-backend.onrender.com/api/health
```

---

# 3. Frontend Setup

Open another terminal.

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=https://bhumimitra-backend.onrender.com
```

Start the frontend:

```bash
npm run dev
```

The frontend should run at:

```text
http://localhost:5173
```

---

# 4. Open the Application

Open your browser and visit:

```text
http://localhost:5173
```

---

# Environment Variables

## Backend `.env`

| Variable         | Default | Description                            |
| ---------------- | ------- | -------------------------------------- |
| `PORT`           | `5000`  | Backend server port                    |
| `DATABASE_URL`   | —       | PostgreSQL database connection string  |
| `GEMINI_API_KEY` | —       | Google Gemini API key                  |
| `JWT_SECRET`     | —       | Secret key used for JWT authentication |

---

## Frontend `.env`

| Variable       | Default                 | Description          |
| -------------- | ----------------------- | -------------------- |
| `VITE_API_URL` | `https://bhumimitra-backend.onrender.com` | Backend API base URL |

---

# Security

Environment variables containing sensitive credentials should never be committed to GitHub.

The following files should be ignored:

```text
.env
.env.*
```

Use `.env.example` files for documenting required environment variables.

Example:

```env
DATABASE_URL=
GEMINI_API_KEY=
JWT_SECRET=
```

Never expose API keys in frontend code.

---

# Authentication Flow

```text
User
 │
 ▼
Register
 │
 ▼
PostgreSQL
 │
 └── Password hashed using bcrypt
 │
 ▼
Login
 │
 ▼
Password Verification
 │
 ▼
JWT Token Generated
 │
 ▼
Token Stored by Frontend
 │
 ▼
Authenticated User
 │
 ▼
Dashboard
```

---

# Future Enhancements

Potential future improvements include:

* Integration with official Karnataka land record services
* Real-time RTC and Pahani data retrieval
* Advanced land document classification
* AI-powered document summarization
* Multilingual AI chat assistant
* Improved Kannada language support
* Voice-based navigation across the platform
* Secure cloud document storage
* Advanced user profile management
* Role-based access control
* Mobile application
* Push notifications for land updates
* Enhanced land map visualization
* Real-time mutation tracking
* Production-grade authentication and refresh tokens

---

# Deployment

The recommended production architecture is:

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Vercel           │
                    │ React Frontend   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Render           │
                    │ Express Backend  │
                    └──────┬─────┬─────┘
                           │     │
                 ┌─────────┘     └──────────┐
                 ▼                          ▼
        ┌──────────────────┐       ┌─────────────────┐
        │ PostgreSQL       │       │ Gemini API      │
        │ Cloud Database   │       │ AI Services     │
        └──────────────────┘       └─────────────────┘
```

Frontend environment variable:

```env
VITE_API_URL=https://your-backend-url.com
```

Backend environment variables should be configured securely through the hosting provider.

---

# Built by Varshitha 

**BhumiMitra — Your Land, Your Rights.**

Built as a digital solution to make Karnataka land records easier to access, understand, and manage.
