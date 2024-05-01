import "./page.css";
import { auth, signIn } from "@/auth";
import Navbar from "../Navbar/navbar";
import TimeTable from "./time_table";
const awsSignRequests = require("aws-sign-requests");

export default async function MyTimes() {
    let session = await auth();

    // if not signed in redirect (should not execute)
    if (session?.user == undefined) {
        signIn();
    }

    let email = session?.user?.email;

    // fetch times
    let options = awsSignRequests({
        credentials: {
            access_key: process.env.ACCESS_KEY_ID,
            secret_key: process.env.SECRETKEY
        },
        method: "POST",
        url: (process.env.API_URL + "/get-times-from-email"),
        service_info: {
            service: "execute-api",
            region: "us-east-2"
        },
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            email: email
        }
    });

    console.log("Sending to get-times-from-email");
    let response = await fetch((process.env.API_URL + "/get-times-from-email"), options);
    let times = await response.json();

    return (
        <div>
            <Navbar></Navbar>
            <div className="time-table-wrapper extra-extend">
                <TimeTable times={times}></TimeTable>
            </div>
        </div>
    );
}