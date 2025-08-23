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

            // This part is for handling CodeMirror's initial rendering
            setTimeout(() => {
                if (editorRef.current) {
                    editorRef.current.refresh();
                }
            }, 200);

            // Emit code changes to other clients
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

            // Listen for code changes from other clients
            if (socketRef.current) {
                socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                    if (code !== null && editorRef.current) {
                        // Get current cursor position
                        const cursor = editorRef.current.getCursor();
                        // Set the value, which moves the cursor to the end
                        editorRef.current.setValue(code);
                        // Restore the cursor position
                        editorRef.current.setCursor(cursor);
                    }
                });
            }

            // Sync code when a new user joins
            if (socketRef.current) {
                socketRef.current.emit(ACTIONS.SYNC_CODE, {
                    roomId,
                });
            }
        };

        initEditor();

        // --- IMPORTANT: Cleanup Logic ---
        // Capture the current ref values in variables
        const currentSocket = socketRef.current;
        const currentEditor = editorRef.current;

        return () => {
            // Use the captured variables in the cleanup
            if (currentSocket) {
                currentSocket.off(ACTIONS.CODE_CHANGE);
            }
            if (currentEditor) {
                currentEditor.toTextArea();
            }
        };

        const runCode = () => {
            try {
                const code = editorRef.current.getValue();
                const logCapture = [];
                const consoleLog = console.log;
                console.log = (...args) => {
                    logCapture.push(
                    args
                        .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
                        .join(" ")
                    );
                    consoleLog.apply(console, args);
                };
                const result = eval(code);
                console.log = consoleLog;
                setOutput(logCapture.join("\n"));
            } catch (error) {
                console.error(error);
                setOutput(Error: ${error.message});
               }
          };

        return (
            <div className="code_editor_area">
            <textarea id="realtimeEditor"></textarea>
            <div className="parent_run_code_button">
                <button className="run_code_button" onClick={runCode}>
                Run Code
                </button>
            </div>

            <div className="output_area">
                {output && (
                <div
                    className="out"
                    style={{
                    marginTop: "0",
                    padding: "10px",
                    backgroundColor: "#333",
                    borderRadius: "5px",
                    overflow: "auto",
                    whiteSpace: "pre-wrap",
                    }}
                >
                    {output}
                </div>
                )}
            </div>
          </div>
         )
    }, [socketRef, roomId]); // Dependencies are correct

    return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;