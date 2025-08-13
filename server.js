const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const ACTIONS = require('./src/Actions');

const server = http.createServer(app);
const io = new Server(server);

app.use(cors());

const userSocketMap = {};
const roomCodeMap = {};

function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );
}

io.on('connection', (socket) => {
    console.log('socket connected:', socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);

        const clients = getAllConnectedClients(roomId);
        io.to(roomId).emit(ACTIONS.JOINED, {
            clients,
            username,
            socketId: socket.id,
        });
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        roomCodeMap[roomId] = code;
        socket.broadcast.to(roomId).emit(ACTIONS.CODE_CHANGE, {
            code,
        });
    });

    socket.on(ACTIONS.SYNC_CODE, ({ roomId }) => {
        if (roomCodeMap[roomId]) {
            io.to(socket.id).emit(ACTIONS.CODE_CHANGE, {
                code: roomCodeMap[roomId],
            });
        }
    });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        const username = userSocketMap[socket.id];
        
        rooms.forEach((roomId) => {
            if (roomId !== socket.id) {
                const clients = getAllConnectedClients(roomId);
                const updatedClients = clients.filter(
                    (client) => client.socketId !== socket.id
                );
                socket.to(roomId).emit(ACTIONS.DISCONNECTED, {
                    socketId: socket.id,
                    username: username,
                    clients: updatedClients,
                });
                if (updatedClients.length === 0) {
                    delete roomCodeMap[roomId];
                    console.log(`Cleaned up empty room: ${roomId}`);
                }
            }
        });
        delete userSocketMap[socket.id];
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});