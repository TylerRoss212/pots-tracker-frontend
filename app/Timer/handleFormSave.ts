"use server"
const awsSignRequests = require("aws-sign-requests");

export async function handleFormSave({ email, dateTimeString, minuteString, secondString, millisecondString, comment }: { email: string, dateTimeString: string, minuteString: string, secondString: string, millisecondString: string, comment: string }) {
    // save to db
    let options = awsSignRequests({
        credentials: {
            access_key: process.env.ACCESS_KEY_ID,
            secret_key: process.env.SECRETKEY
        },
        method: "PUT",
        url: (process.env.API_URL + "/save-new-time"),
        service_info: {
            service: "execute-api",
            region: "us-east-2"
        },
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            email: email,
            date_time: dateTimeString,
            time: (minuteString + secondString + millisecondString),
            comment: comment
        }
    });

    console.log("Sending to save-new-time");
    fetch((process.env.API_URL + "/save-new-time"), options).then(res => console.log("Result from save-new-time: " + JSON.stringify(res)));
}
