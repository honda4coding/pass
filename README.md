# 🚀 Pass - The Ultimate Mock Interview Platform (Frontend)

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-13.4-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="Sass" />
  <img src="https://img.shields.io/badge/Zustand-Bear-orange?style=for-the-badge" alt="Zustand" />
</p>

## 📖 Overview

**Pass** is a robust and scalable mock interview platform designed to connect aspiring candidates with industry experts. It allows users to browse expert profiles, book time slots, pay securely via PayPal, and receive automated Zoom links for their mock interviews. 

This repository contains the **Frontend** application, built with modern web technologies emphasizing performance, clean UI/UX, and global state management.

---

## ✨ Key Features

- **🧑‍🏫 Expert Exploration:** Browse a rich directory of interviewers with real-time filtering by skills, roles, and experience levels.
- **📅 Smart Booking System:** An intuitive calendar that automatically disables unavailable dates and converts 12-hour AM/PM formats seamlessly to ISO 8601 for the backend.
- **💳 Secure Payments:** Integrated with the **PayPal React SDK** for seamless, instant mock-interview payments immediately upon booking.
- **🔐 Authentication & Authorization:** Role-based access control (Interviewer vs. Interviewee) powered by JWT tokens.
- **⚡ Global State Management:** Utilizing **Zustand** for lightweight and blazing-fast state management without boilerplate.

---

## 🛠️ Tech Stack Architecture

- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Language:** TypeScript for end-to-end type safety.
- **Styling:** SCSS / CSS Modules for modular, scoped, and maintainable styling.
- **State Management:** Zustand
- **HTTP Client:** Axios with interceptors for token injection.
- **Date Manipulation:** Day.js & MUI DatePicker.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/honda4coding/pass.git
   cd pass/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 🌍 Deployment (Vercel)

This application is optimized for deployment on [Vercel](https://vercel.com).
Simply connect your repository to Vercel and add the following Environment Variable in your Vercel Project Settings:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Your production backend URL (e.g., `https://pass-backend.vercel.app/api/v1`) |

---

