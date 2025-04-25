# 📋 Firebase To-Do List Web App

A sleek, responsive To-Do List web application built with **HTML, CSS, JavaScript**, and powered by **Firebase Firestore** for real-time task storage and retrieval.

This version allows you to **add, edit, complete, delete**, and **filter** tasks, all saved securely in the cloud. Tasks are synced and persist even after refreshing or closing the browser.

---

## 🚀 Features

- ✅ Add new tasks with validation  
- ✏️ Edit tasks (disabled if completed)  
- ✔️ Mark tasks as completed/incomplete  
- 🗑️ Delete tasks with animation  
- 🔍 Filter tasks by All / Completed / Incomplete  
- 🔄 Data stored in **Firebase Firestore**  
- 🔐 Character limit enforcement with real-time counter  
- 🎨 Responsive UI with animations and custom error messages  

---

## ⚙️ Tech Stack

- **Frontend:** HTML, CSS (Flexbox, Gradients, Font Awesome), JavaScript (ES6+)
- **Backend:** Firebase Firestore (NoSQL cloud database)
- **Libraries:** Firebase JS SDK, Font Awesome

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/AbdulrahmanAlsayedSallam/To-Do-List-App-.git
cd To-Do-List-App-
```

### 2. Add your Firebase config

Replace the placeholders in `config.js` with your Firebase project credentials:

```js
// config.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

> ⚠️ Never share your Firebase credentials publicly unless using proper rules and security.

### 3. Open the app

Open `index.html` in a browser, or use a live server to preview the app.

---

## 📁 File Structure

```
todo list/
│
├── index.html         # Main app structure
├── styles.css         # UI and animations
├── script.js          # Firebase-connected logic
├── config.js          # Firebase setup
└── README.md
```

---

---

## 📄 License

This project is open source and available under the MIT License.
