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

export async function updateTime(time_id: number, fields: {minutes: string, seconds: string, milliseconds: string, comment: string} ) {
    const paddedMinutes = padWithZeros(fields.minutes, 2);
    const paddedSeconds = padWithZeros(fields.seconds, 2);
    const paddedMilliseconds = padWithZeros(fields.milliseconds, 2);

    // update time
    let options = awsSignRequests({
        credentials: {
            access_key: process.env.ACCESS_KEY_ID,
            secret_key: process.env.SECRETKEY
        },
        method: "POST",
        url: (process.env.API_URL + "/update-time"),
        service_info: {
            service: "execute-api",
            region: "us-east-2"
        },
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            time_id: time_id,
            time: (paddedMinutes + paddedSeconds + paddedMilliseconds),
            comment: fields.comment
        }
    });

    console.log("Sending to update-time");
    await fetch((process.env.API_URL + "/update-time"), options);
}

function padWithZeros(value: string, length: number): string {
    // Ensure the value is a string
    let paddedValue = String(value);

    // Add zeros to the front until the length is reached
    while (paddedValue.length < length) {
        paddedValue = '0' + paddedValue;
    }

    return paddedValue;
}