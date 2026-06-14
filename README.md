# Imagify

### A creative AI-powered image generation platform built with the MERN stack, where users can transform their ideas into stunning visuals using text prompts.

#### Imagify allows authenticated users to generate, download, and manage AI-generated images while using a credit-based system for controlled access.

---

## Features
#### AI Image Generation
- Convert text prompts into high-quality images
- Powered by ClipDrop API
####  User Authentication
- Secure signup/login system
- Personalized user experience
#### Credit-Based System
- Each user gets 5 free credits
- Purchase additional credits via payment integration
#### Image Download
- Download generated images for personal or creative use
#### Smooth API Integration
- Fast and reliable image generation workflow

--- 

###  Tech Stack
#### Frontend
- React.js
- Tailwind CSS
- Axios
#### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

--- 

### Integrations & Tools
- ClipDrop API (Text-to-Image Generation)
- Payment Gateway (Credit System)
- Authentication System

---

### 📁 Project Structure
/client        → Frontend (React)
/server        → Backend (Express API)
/models        → Database schemas
/controllers   → Business logic
/routes        → API endpoints
/utils         → Helper functions

---

### Getting Started
### 1. Clone the repository
- git clone https://github.com/your-username/imagify.git
- cd imagify
### 2. Install dependencies
#### Frontend
- cd client
- npm install
#### Backend
- cd server
- npm install

---

## Environment Variables

#### Create a .env file inside the server folder:

- MONGO_URI=your_mongodb_uri
- JWT_SECRET=your_secret_key
- CLIPDROP_API_KEY=your_api_key
- PAYMENT_API_KEY=your_payment_key

--- 

### Run the App
- Backend
- npm run dev
- Frontend
- npm run dev
  
---

### Challenges Faced
- Managing API response handling for image generation
- Designing a secure credit-based payment system
- Handling large image data efficiently
- Integrating frontend with backend seamlessly

---

### Future Improvements
- Add image history gallery 
- Improve prompt customization 
- Add multiple AI styles/models 
- Optimize performance and loading times

---

### Contributing

### Contributions, issues, and suggestions are welcome!

# Contact

## Feel free to connect or collaborate!
