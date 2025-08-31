# AfyaPulse

AfyaPulse: AI-powered health symptom checker for Kenya.

## Tech Stack
- **Backend:** Node.js, Express, MongoDB
- **Frontend:** React, TailwindCSS
- **AI Tool:** Hugging Face Inference API (free tier)
- **Messaging:** InstaSend (SMS/WhatsApp)
- **Payment:** M-Pesa STK push (sandbox/demo)

## Features
1. User registration/login
2. Symptom input and AI analysis
3. Payment via M-Pesa to unlock detailed report
4. Notification via InstaSend when report is ready
5. Admin dashboard for usage and payments

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB (local or Atlas)

### Backend Setup
```
cd backend
npm install
npm start
```
- Configure MongoDB URI and API keys in `.env` (see `.env.example`).

### Frontend Setup
```
cd frontend
npm install
npm start
```

### Connecting MongoDB
- Update the `MONGODB_URI` in backend `.env` file.

## AI Integration (Hugging Face)
- Uses Hugging Face Inference API to analyze symptoms and suggest possible conditions.
- Free tier is used; you can set your Hugging Face API key in backend `.env`.

## Notifications (InstaSend)
- InstaSend API is used to send SMS/WhatsApp notifications when a report is ready.
- Set your InstaSend API credentials in backend `.env`.

## Payments (M-Pesa STK Push)
- M-Pesa STK push is integrated for payments (sandbox/demo mode if no credentials).
- Set your M-Pesa sandbox credentials in backend `.env` or use simulation mode.

## Example Usage Workflow
1. User registers/logs in.
2. User enters symptoms.
3. AI analyzes and returns basic possible conditions.
4. User pays via M-Pesa to unlock detailed report.
5. User receives notification via InstaSend when report is ready.
6. Admin can view usage and payments in dashboard.

## Running Locally
- For both backend and frontend, use:
```
npm install
npm start
```
- Ensure MongoDB is running and all API keys are set in `.env` files.

---
For more details, see the respective `/backend` and `/frontend` folders.
