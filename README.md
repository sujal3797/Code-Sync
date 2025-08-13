Code-Sync: Real-Time Collaborative Code Editor 🚀
Code-Sync is a full-stack web application that enables multiple users to write and edit code together in a shared room, with changes reflected in real-time for all participants. It's built from the ground up to demonstrate a deep understanding of WebSockets, state synchronization, and modern web development practices.

✨ Key Features
Real-Time Collaboration: Code changes are instantly synced across all clients in the room using WebSockets.

Live User Cursors & Presence: See who's currently in the room with live avatar updates.

Room-Based Sessions: Create unique, shareable room IDs for private coding sessions.

Code Sync on Join: New users immediately see the latest code when they join a room with an ongoing session.

Syntax Highlighting: A feature-rich editor powered by CodeMirror with support for JavaScript syntax.

User Join/Leave Notifications: Get live toast notifications when a user joins or leaves the room.

🛠️ Technologies Used
This project leverages a modern, full-stack JavaScript ecosystem.

Front-End:

React.js: For building a dynamic and responsive user interface.

React Router: For client-side routing and navigation.

Socket.IO Client: To manage the WebSocket connection with the server.

CodeMirror: For the embedded, feature-rich code editor.

React Hot Toast: For clean and simple user notifications.

React Avatar: For generating user avatars from usernames.

Back-End:

Node.js: As the JavaScript runtime environment.

Express.js: As the web server framework for handling connections.

Socket.IO: To manage the server-side WebSocket logic, including room management and event broadcasting.

⚙️ Setup and Installation
To run this project locally, follow these steps:

Clone the repository:

git clone https://github.com/sujal3797/Code-Sync.git
cd Code-Sync

Install dependencies for both server and client:
This project contains both the server and client, so you'll need to install dependencies for both.

npm install

Create a .env file for the client:
In the root directory, create a file named .env and add the following line. This tells your React app where to find the back-end server.

REACT_APP_BACKEND_URL=http://localhost:5000

Start the server:
This command starts the Node.js back-end server.

npm run server:dev

Start the client:
In a new terminal window, run this command to start the React development server.

npm start

Open the application:
Open your browser and navigate to http://localhost:3000.

📸 Screenshots
Home Page (Joining a Room):

Editor View (Multiple Users):

👨‍💻 Author
Sujal Gupta

GitHub: @sujal3797

LinkedIn: Sujal Gupta
