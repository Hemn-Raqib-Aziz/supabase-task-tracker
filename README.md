# 📋 supabase-task-tracker

<div align="center">

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/Hemn-Raqib-Aziz/supabase-task-tracker)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

</div>

---

## 📸 Visual Showcase

<div align="center">

### 🔐 Authentication Flow

| 📝 Signup Form | ✅ Email Confirmation | 📧 Magic Link Email |
|----------------|----------------------|---------------------|
| ![localhost_5173_forgot-password (1)](https://github.com/user-attachments/assets/a69123b9-ab43-45b2-bc21-e1f5031f0f6c)
 | ![1 1 Signup](https://github.com/user-attachments/assets/9b83ebc3-2824-4a86-bfb5-501ea075b57a)
 | ![1 email-verification](https://github.com/user-attachments/assets/f6bf6f34-80aa-4761-b90a-cdac07b32430)
| *User registration with email & password* | *Success notification after signup* | *Confirmation email with magic link* |

| 🔑 Signin Form | 🔄 Forgot Password Request | ⚠️ Email Alert | 📧 Email Received | 🔐 Password Reset Form |
|----------------|---------------------------|----------------|-------------------|------------------------|
| ![2 Signin](<img width="1715" height="989" alt="2 Signin" src="https://github.com/user-attachments/assets/9cfa7a34-e2c5-4bc9-98b9-4de12e8478fd" />
) | ![3 request-password1](<img width="1715" height="989" alt="3 request-password1" src="https://github.com/user-attachments/assets/8d7073c0-96a5-4acd-9ea1-53ec4bf22cfd" />
) | ![3 request-password2](<img width="1715" height="989" alt="3 request-password2" src="https://github.com/user-attachments/assets/986751f1-d60e-4d4f-acbf-571e02cbf2ff" />
) | ![3 email-magic-link3](<img width="652" height="242" alt="3 email-magic-link3" src="https://github.com/user-attachments/assets/660fdee9-3197-4354-8392-34cb7a37c5f9" />
) | ![localhost_5173_forgot-password](<img width="1715" height="989" alt="localhost_5173_forgot-password" src="https://github.com/user-attachments/assets/0a98111a-f1dc-4ed4-9681-8ae16fe834b8" />
) |
| *User login interface* | *Email request for password reset* | *Alert user to check reset email* | *The email sent to reset password* | *New password setup form* |

### 📋 Task Management Interface

| 📋 Task Manager Dashboard | ✏️ Task Update Form |
|---------------------------|---------------------|
| ![4 Task- Manager](<img width="1689" height="1478" alt="4 Task- Manager" src="https://github.com/user-attachments/assets/22cffcff-4d4b-4ef0-98f9-ef188b172739" />
) | ![5 updating-tasks](<img width="1613" height="901" alt="5 updating-tasks" src="https://github.com/user-attachments/assets/b7e26116-bd8e-445b-93f8-ee6a66d887b1" />
) |
| *Complete task management interface* | *Edit task form with image upload* |

</div>

---

## 🌟 Overview

**supabase-task-tracker** is a modern, full-stack React application built with Vite and TypeScript. It leverages **Supabase** as a backend-as-a-service platform, integrating authentication, database, and storage features to provide a seamless task management experience.

### ✨ This project demonstrates:

- 🔐 User authentication (signup, signin)
- 🔄 Password reset flows (request reset & update password)
- 📝 Task CRUD operations (create, read, update, delete)
- 🖼️ Image upload and management for tasks using Supabase Storage
- ⚡ Real-time updates with Supabase subscriptions
- 🗃️ State management using Redux Toolkit
- 🎨 Clean, responsive UI with Tailwind CSS

---

## 🛠️ Prerequisites

| Requirement | Description |
|-------------|-------------|
| 🗄️ **Supabase Account** | A **Supabase account** with an active project |
| 🔧 **Environment Variables** | Environment variables configured in `.env` for Vite |

### 📋 Required Environment Variables

```env
VITE_REACT_APP_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_KEY=your_supabase_anon_key_here
```

- `VITE_REACT_APP_SUPABASE_URL` — Your Supabase project URL
- `VITE_SUPABASE_KEY` — Your Supabase API anon/public key

---

## 🗃️ Database Setup

### 📊 Tables

Create two tables in your Supabase project: **users** and **tasks** with the following schema.

#### 📋 `tasks` Table

| Column | Type | Properties | Default |
|--------|------|------------|---------|
| 🆔 `id` | `int8` | Primary Key | |
| 📝 `title` | `text` | | |
| 📄 `description` | `text` | | |
| 📅 `created_at` | `timestamptz` | | `now()` |
| 🔄 `updated_at` | `timestamptz` | | `now()` |
| 📧 `email` | `text` | | |
| 🖼️ `image_url` | `text` | | |

#### 👥 `users` Table

| Column | Type | Properties | Default |
|--------|------|------------|---------|
| 🆔 `id` | `int8` | Primary Key | |
| 📧 `email` | `text` | Unique | |
| 📅 `created_at` | `timestamptz` | | `now()` |
| 🔄 `updated_at` | `timestamptz` | | `now()` |

---

## 🔒 Policies

Set up Row-Level Security (RLS) policies for your tables to enable secure access. Examples:

| Policy Type | Description |
|-------------|-------------|
| 📝 **INSERT** | Allow authenticated users to insert tasks with their email |
| 👁️ **SELECT** | Allow users to read their own tasks (matching email) |
| ✏️ **UPDATE** | Restrict task modifications to owners only |
| 🗑️ **DELETE** | Restrict task deletions to owners only |

> **Note:** Adjust policies according to your security requirements.

---

## 🗂️ Storage Bucket

Create a storage bucket named **`task-images`** in Supabase Storage to store uploaded images associated with tasks.

---

## 🚀 Application Features

### 1. 🔐 Authentication

- **📝 Sign Up:** Users can register using email and password. After signing up, users receive a confirmation email from Supabase.
- **🔑 Sign In:** Registered users can login with their email and password.
- **💾 Session Handling:** Authentication session state is managed via Supabase's client and Redux Toolkit for smooth user experience.
  
### 2. 🔄 Password Reset

- **📧 Request Password Reset:** Users can submit their email to receive a password reset link via email.
- **🔐 Forgot Password (Reset Form):** When visiting the reset link (with a valid Supabase recovery token), users can set a new password.
- Validation and UI feedback are provided for errors and successful operations.

### 3. 📋 Task Management

- **➕ Create Task:** Authenticated users can add tasks with title, description, and an image.
- **🖼️ Image Upload:** Images are uploaded to the Supabase `task-images` storage bucket with public URLs generated for display.
- **📖 Read Tasks:** All tasks associated with the logged-in user's email are fetched and displayed.
- **✏️ Update Task:** Users can edit their own tasks (title, description, image).
- **🗑️ Delete Task:** Users can delete their own tasks.
- **⚡ Real-Time Updates:** Using Supabase's real-time subscriptions, the task list updates automatically when new tasks are added by any user.

### 4. ✅ Rules & Validation

- **🔍 Field Validation:** Title, description, and image are required for task creation.
- **👤 User Ownership:** Editing and deleting tasks is restricted to the user who created them (validated via email match).
- **❌ Error Handling:** Client-side and server-side errors are managed in Redux slices and displayed in the UI.
- **⏳ Loading States:** Appropriate loading indicators during async actions like signup, signin, image upload, and task CRUD operations.

---

## 📁 Folder Structure Overview

```
Supabase-task-tracker/
├── 📁 public/
├── 📁 src/
│   ├── 🔐 auth/                    # Authentication components and logic
│   ├── 🧩 components/              # Reusable UI components (Forms, Task cards)
│   ├── ⚙️ config/                  # Supabase client configuration
│   ├── 🪝 hooks/                   # Custom React hooks
│   ├── 📄 Pages/                   # Route pages (Index, ForgotPassword, RequestReset)
│   ├── 🗃️ redux/                   # Redux Toolkit slices and store config
│   │   ├── 🔧 slices/              # Feature slices: Auth, Tasks, Password Change
│   │   └── 📡 subscription/        # Supabase realtime subscriptions logic
│   ├── 📝 types/                   # TypeScript type declarations
│   ├── 📱 App.tsx                  # Main app component with routing and session management
│   ├── 🎨 index.css                # Global styles (TailwindCSS)
│   └── 🚀 main.tsx                 # React DOM render entrypoint
├── 🔒 .env                         # Environment variables (not committed)
├── 📦 package.json                 # Dependencies and scripts
├── ⚡ vite.config.ts               # Vite configuration
└── 📖 README.md                    # This file
```

---

## 🔧 Environment Setup

### 1. 📥 Clone the repository:

```bash
git clone https://github.com/Hemn-Raqib-Aziz/supabase-task-tracker.git
cd supabase-task-tracker
```

### 2. 📦 Install dependencies:

```bash
npm install
```

### 3. 🔐 Create a `.env` file in the root directory and add:

```env
VITE_REACT_APP_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_KEY=your_supabase_anon_key_here
```

### 4. 🚀 Run the development server:

```bash
npm run start
```

---

## 📝 Usage Notes

| ⚠️ Important | Description |
|--------------|-------------|
| 🔒 **Security** | Ensure your Supabase project has enabled Row-Level Security with appropriate policies |
| 🗄️ **Database** | Create the `tasks` and `users` tables and `task-images` bucket as described |
| 🗃️ **State Management** | This app uses Redux Toolkit to manage application state and asynchronous actions |
| 🔐 **Authorization** | All user actions are authenticated and authorized by matching the user's email with the `tasks.email` field |

---

## 🛠️ Technologies Used

<div align="center">

| Technology | Version | Purpose |
|------------|---------|---------|
| ⚛️ **React** | 19 with TypeScript | Frontend Framework |
| 🗃️ **Redux Toolkit** | Latest | State Management |
| 🛣️ **React Router Dom** | v7 | Routing |
| 🗄️ **Supabase** | Latest | Auth, Postgres DB, Storage, Realtime |
| ⚡ **Vite** | Latest | Build Tool |
| 🎨 **Tailwind CSS** | Latest | Styling |
| 🧪 **Jest** | Latest | Testing |

</div>

---

## 🤝 Contribution

<div align="center">

**Contributions, issues, and feature requests are welcome!** 

Feel free to fork and create pull requests.

[![Fork](https://img.shields.io/badge/Fork-Repository-blue?style=for-the-badge&logo=github)](https://github.com/Hemn-Raqib-Aziz/supabase-task-tracker/fork)
[![Issues](https://img.shields.io/badge/Report-Issues-red?style=for-the-badge&logo=github)](https://github.com/Hemn-Raqib-Aziz/supabase-task-tracker/issues)
[![Pull Requests](https://img.shields.io/badge/Submit-PR-green?style=for-the-badge&logo=github)](https://github.com/Hemn-Raqib-Aziz/supabase-task-tracker/pulls)

</div>

---

<div align="center">

**Hemn Raqib Aziz**

[![GitHub](https://img.shields.io/badge/GitHub-Profile-black?style=for-the-badge&logo=github)](https://github.com/Hemn-Raqib-Aziz)

</div>

