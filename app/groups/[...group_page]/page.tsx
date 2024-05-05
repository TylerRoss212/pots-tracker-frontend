import Navbar from "@/app/Navbar/navbar";
const awsSignRequests = require("aws-sign-requests");
import "./page.css"
import { GroupOptions } from "./GroupOptions";

export default async function GroupPage({ searchParams }: { searchParams: any }) {

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

    // get times
    let options = awsSignRequests({
        credentials: {
            access_key: process.env.ACCESS_KEY_ID,
            secret_key: process.env.SECRETKEY
        },
        method: "POST",
        url: (process.env.API_URL + "/get-times-from-group-id"),
        service_info: {
            service: "execute-api",
            region: "us-east-2"
        },
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            group_id: searchParams.groupId
        }
    });

    console.log("Sending to get-times-from-group-id");
    let res = await fetch((process.env.API_URL + "/get-times-from-group-id"), options);
    let times = await res.json();

    return (
        <div>
            <Navbar></Navbar>
            <div className="center extra-extend">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Comment</th>
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
                                    <TimeFormat time={time.time}></TimeFormat>
                                </td>
                                <td >{time.comment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <GroupOptions groupId={searchParams.groupId}></GroupOptions>
        </div>
    );
}

function TimeFormat({ time }: { time: string }) {
    let minutes = time.substring(0, 2);
    let seconds = time.substring(2, 4);
    let millisecons = time.substring(4, 6);

    return (
        <div>
            {/* Assign ref only when editing */}
            <span className="time-field">{minutes}</span>
            <span>:</span>
            <span className="time-field">{seconds}</span>
            <span>:</span>
            <span className="time-field">{millisecons}</span>
        </div>
    );
}