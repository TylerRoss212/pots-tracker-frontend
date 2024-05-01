"use server"
const awsSignRequests = require("aws-sign-requests");

export async function deleteTime(id: number) {
    // delete time
    let options = awsSignRequests({
        credentials: {
            access_key: process.env.ACCESS_KEY_ID,
            secret_key: process.env.SECRETKEY
        },
        method: "DELETE",
        url: (process.env.API_URL + "/delete-time"),
        service_info: {
            service: "execute-api",
            region: "us-east-2"
        },
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            time_id: id
        }
    });

    console.log("Sending to delete-time");
    await fetch((process.env.API_URL + "/delete-time"), options);
}