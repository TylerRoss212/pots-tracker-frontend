"use client"
import { useEffect, useState, useRef } from "react";
import { deleteTime, updateTime } from "./time_functions";

import "./time_table.css";

export default function TimeTable({ times }: { times: any }) {
    const [editingTimeId, setEditingTimeId] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    let popupWrapper: HTMLElement | null;

    const dateOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZone: 'UTC'
    }

    useEffect(() => {
        popupWrapper = document.getElementById("popup-wrapper");
    });

    // Declare refs for minutes, seconds, milliseconds, and comment
    const minutesRef = useRef<HTMLSpanElement>(null);
    const secondsRef = useRef<HTMLSpanElement>(null);
    const millisecondsRef = useRef<HTMLSpanElement>(null);
    const commentRef = useRef<HTMLTableCellElement>(null);

    async function handleSave() {
        // Fetch edited values for minutes, seconds, milliseconds, and comment
        const minutes = minutesRef.current?.innerText;
        const seconds = secondsRef.current?.innerText;
        const milliseconds = millisecondsRef.current?.innerText;
        const comment = commentRef.current?.innerText;

        // If any of the values are missing, do not proceed
        if (!minutes || !seconds || !milliseconds || !comment || !editingTimeId) {
            console.error("One or more elements or editing time ID are missing references.");
            return;
        }

        // Perform update with the obtained data
        await updateTime(editingTimeId, { minutes, seconds, milliseconds, comment });

        // Reset editing state
        setEditingTimeId(null);
        setIsEditing(false);
        location.reload();
    }

    function allowEdit(timeId: number) {
        setEditingTimeId(timeId);
        setIsEditing(true);
    }

    function handleDelete() {
        popupWrapper?.classList.remove("hidden");
    }

    function cancelDelete() {
        popupWrapper?.classList.add("hidden");
    }

    async function confirmDelete(id: number) {
        await deleteTime(id);
        location.reload();
    }

    function handleCancel() {
        setEditingTimeId(null);
        setIsEditing(false);
        location.reload();
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Comment</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {times.map((time: { time_id: number; email: string; date_time: string; time: string; comment: string; }) => (
                    <tr key={time.time_id}>
                        <td>
                            {/* @ts-ignore */}
                            {Intl.DateTimeFormat('en-US', dateOptions).format(new Date(time.date_time))}
                        </td>
                        <td>
                            <TimeFormat time={time.time} isEditing={isEditing && editingTimeId === time.time_id} minutesRef={minutesRef} secondsRef={secondsRef} millisecondsRef={millisecondsRef}></TimeFormat>
                        </td>
                        {/* Assign ref only when editing */}
                        <td contentEditable={isEditing && editingTimeId === time.time_id} ref={isEditing && editingTimeId === time.time_id ? commentRef : null}>{time.comment}</td>
                        {
                            editingTimeId === time.time_id ? (
                                <td>
                                    <button onClick={handleSave}>SAVE</button>
                                    <button onClick={handleCancel}>CANCEL</button>
                                    <button onClick={handleDelete}>DELETE</button>
                                    <div id="popup-wrapper" className="popup-wrapper hidden">
                                        <div className="wrapper">
                                            <div className="popup">
                                                <div className="popup-confirmation">Are you sure you want to delete this time?</div>
                                                <div className="popup-date">
                                                    {/* @ts-ignore */}
                                                    {Intl.DateTimeFormat('en-US', dateOptions).format(new Date(time.date_time))}
                                                </div>
                                                <TimeFormat time={time.time} isEditing={false} minutesRef={minutesRef} secondsRef={secondsRef} millisecondsRef={millisecondsRef}></TimeFormat>
                                                <div className="bottom-buttons">
                                                    <button type="button" className="popup-button" onClick={cancelDelete}>CANCEL</button>
                                                    <button type="submit" className="popup-button" onClick={() => { confirmDelete(time.time_id) }}>DELETE</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            ) : (
                                <td>
                                    <button onClick={() => allowEdit(time.time_id)}>EDIT</button>
                                </td>
                            )
                        }
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function TimeFormat({ time, isEditing, minutesRef, secondsRef, millisecondsRef }: { time: string, isEditing: boolean, minutesRef: React.RefObject<HTMLSpanElement>, secondsRef: React.RefObject<HTMLSpanElement>, millisecondsRef: React.RefObject<HTMLSpanElement> }) {
    let minutes = time.substring(0, 2);
    let seconds = time.substring(2, 4);
    let millisecons = time.substring(4, 6);

    function validateNumberInput(event: any) {
        let text = event.target.innerText.trim();

        text = text.replace(/[^\d]/g, '');
        text = text.slice(0, 2);

        const selection = window.getSelection();
        const range = selection!.getRangeAt(0);
        const clonedRange = range.cloneRange();
        clonedRange.selectNodeContents(event.target);
        clonedRange.setEnd(range.endContainer, range.endOffset);

        const cursorPosition = clonedRange.toString().length;

        event.target.innerText = text;

        const newRange = createRange(event.target, cursorPosition);
        selection?.removeAllRanges();
        selection?.addRange(newRange);
        newRange.collapse();
    }

    return (
        <div>
            {/* Assign ref only when editing */}
            <span className="time-field" contentEditable={isEditing} onInput={validateNumberInput} ref={isEditing ? minutesRef : null}>{minutes}</span>
            <span>:</span>
            <span className="time-field" contentEditable={isEditing} onInput={validateNumberInput} ref={isEditing ? secondsRef : null}>{seconds}</span>
            <span>:</span>
            <span className="time-field" contentEditable={isEditing} onInput={validateNumberInput} ref={isEditing ? millisecondsRef : null}>{millisecons}</span>
        </div>
    );
}

const createRange = (node: Node, targetPosition: number) => {
    let range = document.createRange();
    range.selectNode(node);
    range.setStart(node, 0);

    let pos = 0;
    const stack = [node];
    while (stack.length > 0) {
        const current = stack.pop();

        if (current!.nodeType === Node.TEXT_NODE) {
            const len = current!.textContent!.length;
            if (pos + len >= targetPosition) {
                range.setEnd(current!, targetPosition - pos);
                return range;
            }
            pos += len;
        } else if (current!.childNodes && current!.childNodes.length > 0) {
            for (let i = current!.childNodes.length - 1; i >= 0; i--) {
                stack.push(current!.childNodes[i]);
            }
        }
    }

    range.setEnd(node, node.childNodes.length);
    return range;
};
