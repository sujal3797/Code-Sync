import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import ACTIONS from '../Actions';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

const Editor = ({ socketRef, roomId }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        const initEditor = () => {
            const editorElement = document.getElementById('realtimeEditor');
            editorRef.current = Codemirror.fromTextArea(editorElement, {
                mode: { name: 'javascript', json: true },
                theme: 'dracula',
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
            });

            setTimeout(() => {
                if (editorRef.current) {
                    editorRef.current.refresh();
                }
            }, 200);

            editorRef.current.on('change', (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();
                if (origin !== 'setValue' && socketRef.current) {
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
            });

            if (socketRef.current) {
                socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                    if (code !== null && editorRef.current) {
                        editorRef.current.setValue(code);
                    }
                });
            }

            if (socketRef.current) {
                socketRef.current.emit(ACTIONS.SYNC_CODE, {
                    roomId,
                });
            }
        };

        initEditor();

        return () => {
            if (socketRef.current) {
                socketRef.current.off(ACTIONS.CODE_CHANGE);
            }
            if (editorRef.current) {
                editorRef.current.toTextArea();
                editorRef.current = null;
            }
        };
    }, []);

    return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;