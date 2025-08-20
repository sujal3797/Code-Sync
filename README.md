# Code-Sync: Real-Time Collaborative Code Editor 🚀

**Code-Sync** is a full-stack web application that enables multiple users to write and edit code together in a shared room, with changes reflected in real-time for all participants. It's built from the ground up to demonstrate a deep understanding of **WebSockets**, state synchronization, and modern web development practices.

---

## 🔴 Live Demo

**[CLICK HERE TO TRY IT OUT!](https://code-sync-1.netlify.app/)** 👈

*(Replace the URL with your actual deployed Netlify link)*

---

## ✨ Key Features

-   **Real-Time Collaboration**: Code changes are instantly synced across all clients in the room using WebSockets.
-   **Live User Presence**: See who's currently in the room with live avatar updates.
-   **Room-Based Sessions**: Create unique, shareable room IDs for private coding sessions.
-   **Code Sync on Join**: New users immediately see the latest code when they join a room with an ongoing session.
-   **Syntax Highlighting**: A feature-rich editor powered by **CodeMirror** with support for JavaScript syntax.
-   **User Join/Leave Notifications**: Get live toast notifications when a user joins or leaves the room.

---

## 📸 Screenshots

### Home Page (Joining a Room):
<img width="1919" height="927" alt="image" src="https://github.com/user-attachments/assets/90b84c8a-8384-4ca8-b580-17172da345dc" />

### Editor View (Multiple Users):
<img width="1919" height="925" alt="image" src="https://github.com/user-attachments/assets/2127db74-c244-451f-842b-148f0ae83cf9" />

---

## 🛠️ Technologies Used

This project leverages a modern, full-stack JavaScript ecosystem.

### Front-End
-   **React.js** – For building a dynamic and responsive user interface.
-   **React Router** – For client-side routing and navigation.
-   **Socket.IO Client** – To manage the WebSocket connection with the server.
-   **CodeMirror** – For the embedded, feature-rich code editor.
-   **React Hot Toast** – For clean and simple user notifications.
-   **React Avatar** – For generating user avatars from usernames.

### Back-End
-   **Node.js** – JavaScript runtime environment.
-   **Express.js** – Web server framework for handling connections.
-   **Socket.IO** – For server-side WebSocket logic, room management, and event broadcasting.

---

## ⚙️ Setup and Installation

Follow these steps to run the project locally:

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/sujal3797/Code-Sync.git](https://github.com/sujal3797/Code-Sync.git)
    cd Code-Sync
    ```
2.  **Install all dependencies**
    ```bash
    yarn install
    ```
3.  **Create a `.env` file in the root directory**
    ```env
    REACT_APP_BACKEND_URL=http://localhost:5000
    ```
4.  **Start the server**
    ```bash
    yarn server:dev
    ```
5.  **Start the client**
    In a new terminal window:
    ```bash
    yarn start
    ```
6.  **Open the application**
    Visit: `http://localhost:3000`
