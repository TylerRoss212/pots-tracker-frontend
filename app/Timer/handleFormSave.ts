"use server"
const awsSignRequests = require("aws-sign-requests");

export async function handleFormSave({ email, dateTimeString, minuteString, secondString, millisecondString, comment }: { email: string, dateTimeString: string, minuteString: string, secondString: string, millisecondString: string, comment: string }) {
    // save to db
    let options = awsSignRequests({
        credentials: {
            access_key: process.env.AWS_ACCESS_KEY_ID,
            secret_key: process.env.AWS_SECRETKEY
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

    console.log("Sending to save-new-time: " + options);
    fetch((process.env.API_URL + "/save-new-time"), options).then(res => console.log("Result from save-new-time: " + res));
}
