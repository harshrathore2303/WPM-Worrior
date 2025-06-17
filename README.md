# WPM Warrior

A fast, responsive, and real-time typing speed test built with React.js. WPM Warrior helps users measure and improve their typing speed (WPM) and accuracy, while also storing their best score for personal tracking.

---

## 📜 Description

WPM Warrior is a web-based typing speed test that evaluates how fast and accurately you can type a randomly generated string of words. This project focuses on core frontend skills using React, JavaScript, and CSS while implementing algorithmic logic to dynamically generate word sets and calculate WPM.

**Why I built this:**
To strengthen my skills in:

* Real-time DOM manipulation using React
* Handling user input without external libraries
* Working with timers, string comparison, and local storage

**What I learned:**

* Accurate calculation of WPM and accuracy
* Handling keyboard events and preventing unwanted behavior
* Managing component state and side effects using React hooks

---

## 📑 Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Features](#features)
4. [Credits](#credits)
5. [License](#license)

---

## 🚀 Installation

```bash
git clone https://github.com/harshrathore2303/WPM-Worrior.git
cd WPM-Worrior
npm install
npm start
```

Visit `http://localhost:5173` in your browser to run the project locally.

---

## 🧑‍💻 Usage

1. On app load, a random set of words is generated.
2. Start typing in the input box.
3. Timer starts automatically with the first keystroke.
4. Your WPM and accuracy update live.
5. When the timer hits 0, your best WPM is saved in local storage.

> **Note:** Backspace, arrow keys, and copy-paste are disabled to ensure fair play.

---

## ✨ Features

* ⏱️ 60-second timer
* 🔤 Dynamic random text generation
* 🧠 Difficulty levels: Easy, Medium, Hard, Extremely Hard
* ✅ Real-time WPM and accuracy tracking
* 📈 Persistent best WPM using local storage
* 🚫 Anti-cheat: disables arrow keys, selection, and backspace
* 🎯 Character-level highlighting (correct, incorrect, pending)
* ⚛️ State management using Zustand for predictable UI updates
* 📦 Clean and minimal UI using DaisyUI and Tailwind

---

## 📌 Upcoming Updates

* 🏆 **Leaderboard** – Track and display top WPM scores across users.
* 🔐 **Authentication & Authorization** – User sign-up/login and personalized performance tracking.
* 🎮 **Live Typing Contest Mode** – Real-time typing competitions between multiple users.

---
## 🙌 Credits

This project was built by Harshit Singh Rathore as part of a personal learning initiative.

### Resources and Inspiration

* [MDN Web Docs](https://developer.mozilla.org/)
* [React Documentation](https://reactjs.org/)

---

## 📄 License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/). You are free to use, modify, and distribute this project.

---

## 🛡️ Badges

![React](https://img.shields.io/badge/React-18.x-blue)
![MIT License](https://img.shields.io/badge/license-MIT-green)
![Made with Love](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---