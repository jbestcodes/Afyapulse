# AfyaPulse

AfyaPulse is an AI-powered health symptom checker for Kenya. It helps users analyze symptoms, get possible conditions, receive first aid suggestions, and pay via M-Pesa to unlock detailed reports.

## Tech Stack

- **Backend:** Node.js, Express, MongoDB
- **Frontend:** React, TailwindCSS
- **AI:** Hugging Face Inference API (zero-shot classification)
- **Messaging:** InstaSend (for SMS/WhatsApp notifications)
- **Payments:** M-Pesa Daraja STK Push (sandbox/demo)

## Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone https://github.com/jbestcodes/Afyapulse.git
   cd Afyapulse
   ```

2. **Backend Setup:**
   ```sh
   cd backend
   npm install
   # Copy .env.example to .env and fill in your MongoDB, Hugging Face, and M-Pesa credentials
   npm start
   ```

3. **Frontend Setup:**
   ```sh
   cd ../frontend
   npm install
   npm start
   ```

4. **MongoDB:**  
   Use MongoDB Atlas or a local MongoDB instance. Set your connection string in `backend/.env`.

## AI Integration

- Uses Hugging Face's `facebook/bart-large-mnli` model for zero-shot classification of symptoms.
- Returns possible conditions and first aid suggestions.

## Notifications

- Uses InstaSend API for sending SMS/WhatsApp notifications when a report is ready.

## Payments

- Integrates M-Pesa Daraja STK Push (sandbox) for payments.
- Requires Safaricom Daraja sandbox credentials (Consumer Key, Secret, Shortcode, Passkey).

## Example Usage Workflow

1. User registers or logs in.
2. User enters symptoms and receives possible conditions + first aid advice.
3. User pays via M-Pesa to unlock a detailed report.
4. User receives notification when the report is ready.

## Running Locally

```sh
# In /backend
npm install
npm start

# In /frontend
npm install
npm start
```


