# 📝 Task Management App (Vue 3 + Pinia + TailwindCSS)

A responsive task management application built with **Vue 3**, **Pinia**, **Vue Router**, and **TailwindCSS**. It features mock authentication (login/register), role-based access control (admin/user), and drag-and-drop task reordering.

---

## ✨ Features

- ✅ User login & registration (mocked)
- 🔐 Role-based routing (Admin & User)
- 📋 Create, edit, complete, and delete tasks
- 📦 Draggable task list
- 👨‍👩‍👧‍👦 Admin can view all users and their tasks
- 🎨 Clean UI using TailwindCSS
- 🧪 LocalStorage
- 🧪 Mock API (no backend required)

---

## 🛠 Tech Stack

- **Vue 3** (Composition API)
- **Pinia** (State management)
- **Vue Router**
- **TailwindCSS**
- **@vueuse/core** (Local storage composables)
- **TypeScript**

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/vue-task-app.git
cd vue-task-app
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run the app

```bash
pnpm run dev
```
Visit http://localhost:5173

<br />

## 🧪 Mock Credentials
The app uses mock users from @/mocks/users.ts.

| Role  | Email                                     | Password |
| ----- | ----------------------------------------- | -------- |
| Admin | [test1@gmail.com](mailto:test1@gmail.com) | test123  |
| User  | [test2@gmail.com](mailto:test2@gmail.com) | test123  |
| User  | [test3@gmail.com](mailto:test2@gmail.com) | test123  |

You can also register a new user from the login page.

<br />

## 📄 Note & Caveats
🚧 This is a frontend-only application.

Authentication is mocked using static data and stored in localStorage. No actual backend is involved.

Sensitive information (like passwords) is stored in plaintext for demonstration only — this is not secure for production.

Tasks and user data are stored in memory or local storage only and will reset on refresh or rebuild.

A backend integration (Node.js, Firebase, or others) is planned for future updates.

🛠 This project is intended for UI/UX prototyping and frontend architecture demonstration.

