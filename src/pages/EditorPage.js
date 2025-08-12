import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import ACTIONS from '../Actions';
import {
    useLocation,
    useNavigate,
    Navigate,
    useParams,
} from 'react-router-dom';

const EditorPage = () => {
    const [socket, setSocket] = useState(null);
    const [clients, setClients] = useState([]);

    const location = useLocation();
    const { roomId } = useParams();
    const reactNavigator = useNavigate();

    useEffect(() => {
        const init = async () => {
            setSocket(await initSocket());
        };
        init();

        return () => {
            if (socket) {
                socket.disconnect();
                socket.off(ACTIONS.JOINED);
                socket.off(ACTIONS.DISCONNECTED);
            }
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on('connect_error', (err) => handleErrors(err));
        socket.on('connect_failed', (err) => handleErrors(err));

        function handleErrors(e) {
            console.log('socket error', e);
            toast.error('Socket connection failed, try again later.');
            reactNavigator('/');
        }

        socket.emit(ACTIONS.JOIN, {
            roomId,
            username: location.state?.username,
        });

        socket.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
            if (username !== location.state?.username) {
                toast.success(`${username} joined the room.`);
            }
            setClients(clients);
        });

        socket.on(ACTIONS.DISCONNECTED, ({ socketId, username, clients }) => {
            toast.success(`${username} left the room.`);
            setClients(clients);
        });
    }, [socket]);

    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID copied to clipboard.');
        } catch (err) {
            toast.error('Could not copy Room ID');
            console.error(err);
        }
    }

    function leaveRoom() {
        reactNavigator('/');
    }

    if (!location.state?.username) {
        return <Navigate to="/" />;
    }

    return (
        <div className="mainWrap">
            <div className="aside">
                <div className="asideInner">
                    <div className="logo">
                        <img
                            src="/code-sync.png"
                            alt="logo"
                            className="logoImage"
                        />
                    </div>
                    <h3>Connected</h3>
                    <div className="clientsList">
                        {clients.map((client) => (
                            <Client
                                key={client.socketId}
                                username={client.username}
                            />
                        ))}
                    </div>
                </div>
                <button className="btn copyBtn" onClick={copyRoomId}>Copy ROOM ID</button>
                <button className="btn leaveBtn" onClick={leaveRoom}>Leave</button>
            </div>
            <div className="editorWrap">
                {socket && <Editor socket={socket} roomId={roomId} />}
            </div>
        </div>
    );
};

export default EditorPage;