import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import ACTIONS from '../Actions';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

const Editor = ({ socket, roomId }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        if (!socket) return;

        editorRef.current = Codemirror.fromTextArea(
            document.getElementById('realtimeEditor'),
            {
                mode: { name: 'javascript', json: true },
                theme: 'dracula',
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
            }
        );

        editorRef.current.on('change', (instance, changes) => {
            const { origin } = changes;
            const code = instance.getValue();
            if (origin !== 'setValue') {
                socket.emit(ACTIONS.CODE_CHANGE, {
                    roomId,
                    code,
                });
            }
        });

        socket.on(ACTIONS.CODE_CHANGE, ({ code }) => {
            if (code !== null) {
                editorRef.current.setValue(code);
            }
        });

        return () => {
            socket.off(ACTIONS.CODE_CHANGE);
            if (editorRef.current) {
                editorRef.current.toTextArea();
                editorRef.current = null;
            }
        };
    }, [socket]);

    return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;