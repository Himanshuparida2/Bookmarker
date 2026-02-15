# 🔖 SmartBookmarks — Modern Bookmark Manager

A fast, clean, and real-time bookmark manager built with **Next.js + Supabase**.
Save, organize, and access your favorite links from anywhere — with multi-tab synchronization and Google authentication.

---

## 🚀 Live Features

* 🔐 Google Authentication (OAuth)
* ☁️ Cloud-stored bookmarks using Supabase
* ⚡ Real-time multi-tab sync (BroadcastChannel)
* 🔎 Instant search across bookmarks
* 🗑️ Add / delete bookmarks
* 🎨 Modern responsive UI
* 🌐 Favicon preview for each link
* ⏱️ Relative time display (e.g., “2 hours ago”)

---

## 🧱 Tech Stack

**Frontend**

* Next.js (App Router)
* React
* Tailwind CSS
* shadcn/ui + Radix UI
* React Hook Form + Zod

**Backend / Services**

* Supabase (PostgreSQL + Auth)
* Google OAuth

**State & Sync**

* React Context API
* BroadcastChannel API (cross-tab sync)
* LocalStorage (persistence)

---

## 📸 Overview

SmartBookmarks lets users maintain a personal collection of links that stay synchronized across browser tabs and sessions.

---

## 🛠️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/smartbookmarks.git
cd smartbookmarks
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Configure environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_key
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

---

### 4️⃣ Run locally

```bash
npm run dev
```

Visit:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🧪 Build for production

```bash
npm run build
npm start
```

---

## 🧠 Project Journey & Challenges

This project was not straightforward — it evolved significantly during development.

### 🔄 Database Choice Pivot

Initially, the backend was designed around **AWS DynamoDB**.
However, after carefully reviewing the project requirements, it became clear that a different solution would better fit the needs.

The project was migrated to **Supabase**, which provided:

* Structured relational storage (PostgreSQL)
* Built-in authentication
* Easier client integration
* Real-time capabilities
* Simpler deployment workflow

This migration required rewriting database logic and adapting data models.

---

### 🧩 Multi-Tab Synchronization Challenge

One of the hardest problems was keeping bookmarks synchronized across multiple browser tabs.

Early attempts led to issues such as:

* Tabs showing outdated data
* Race conditions between updates
* Inconsistent UI states

The final solution combined:

* React state management
* LocalStorage persistence
* BroadcastChannel API for instant cross-tab messaging

This approach ensures that changes in one tab immediately appear in others without refresh.

---

### 🔐 Authentication

Google OAuth integration was relatively smooth, as prior experience with OAuth flows helped streamline the setup.

---

### ⚠️ Lessons Learned

This project highlighted several real-world development insights:

* Choosing the right database early matters
* Sync problems are harder than they appear
* State management across tabs requires explicit communication
* Cloud services reduce backend complexity but introduce configuration challenges
* Reading requirements carefully can prevent major rewrites

---

## 📂 Project Structure (Simplified)

```
src/
 ├── app/                 # Next.js routes
 ├── components/          # UI components
 ├── hooks/               # Custom hooks & context
 ├── backend/             # Database functions
 ├── Broadcast/           # Cross-tab sync utilities
 └── styles/
```

---

## 🧩 Future Improvements

Potential enhancements:

* 📁 Folder / tag organization
* ⭐ Favorites / pinning
* 🔄 True cross-device real-time sync
* 📤 Import / export bookmarks
* 🧠 AI-based categorization
* 📱 Progressive Web App (PWA)

---

## 🤝 Contributing

Contributions, issues, and suggestions are welcome.

---

## 👤 Author

**Himanshu Sekhar Parida**
B.Tech CSE | Full-Stack Developer | Cloud Enthusiast

---

⭐ If you found this project interesting, consider giving it a star!
