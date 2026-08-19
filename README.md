# [Client/Company Name] - Corporate Web Portal

## Overview
This is a custom, full-stack web application developed for [Company Name]. The platform is designed to handle client interactions, secure user authentication, and dynamic service quotes. The frontend is built as a single-page application (SPA) for maximum performance, communicating via RESTful APIs to a robust backend architecture.

## Tech Stack
*   **Frontend:** React.js, React Query, React Router, React Toastify
*   **Backend:** PHP, Laravel (REST API)
*   **Database:** MySQL
*   **Authentication:** JWT (JSON Web Tokens), Google OAuth integration
*   **Future Integration:** Prepared for migration to Supabase for backend-as-a-service (BaaS) infrastructure.

## Core Features
*   **User Authentication:** Secure login, registration, and Google single sign-on (SSO).
*   **Profile Management:** End-users can update personal details, manage addresses, and request account deletion.
*   **Quote System:** A dynamic quote generation system (`useSubmitQuote`) allowing clients to request customized service estimates directly through the UI.
*   **Password Recovery:** Secure OTP-based password reset flow.

## Local Setup & Installation

### Prerequisites
*   Node.js (v16+)
*   NPM or Yarn
*   PHP & Composer (for backend API)
*   MySQL

### Frontend Initialization
1. Clone this repository.
2. Navigate to the project directory: `cd [project-folder]`
3. Install dependencies: `npm install`
4. Copy `.env.example` to `.env` and configure your local environment variables (ensure `VITE_REACT_APP_API_URL` points to your local backend server).
5. Start the Vite development server: `npm run dev`

---
*Note: This is a proprietary, closed-source repository developed specifically for [Company Name].*
