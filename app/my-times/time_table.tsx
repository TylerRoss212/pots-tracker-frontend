"use client"
import { useState } from "react";
import "./time_table.css";

export default function TimeTable({ times }: { times: any }) {
    const [editingTimeId, setEditingTimeId] = useState<number | null>(null);

    function allowEdit(timeId: number) {
        setEditingTimeId(timeId);
    }

    function handleSave() {
        setEditingTimeId(null);
    }

    function handleDelete() {
        setEditingTimeId(null);
    }

    function handleCancel() {
        setEditingTimeId(null);
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
                        <td>{new Date(time.date_time).toLocaleString()}</td>
                        <td>
                        <TimeFormat time={time.time}></TimeFormat>
                        </td>
                        <td>{time.comment}</td>
                        {
                            editingTimeId === time.time_id ? (
                                <td>
                                    <button onClick={handleSave}>SAVE</button>
                                    <button onClick={handleCancel}>CANCEL</button>
                                    <button onClick={handleDelete}>DELETE</button>
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

function TimeFormat({ time }: { time: string }) {
    let minutes = time.substring(0, 2);
    let seconds = time.substring(2, 4);
    let millisecons = time.substring(4, 6);
    return (
        <div>
            <span>{minutes}</span>
            <span>:</span>
            <span>{seconds}</span>
            <span>:</span>
            <span>{millisecons}</span>
        </div>
    );
}