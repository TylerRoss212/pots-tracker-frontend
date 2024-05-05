"use server"
const awsSignRequests = require("aws-sign-requests");

export async function HandleCreateGroup({ email, name}: { email: string, name: string }) {
    let options = awsSignRequests({
        credentials: {
            access_key: process.env.ACCESS_KEY_ID,
            secret_key: process.env.SECRETKEY
        },
        method: "PUT",
        url: (process.env.API_URL + "/create-group"),
        service_info: {
            service: "execute-api",
            region: "us-east-2"
        },
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            email: email,
            name: name
        }
    });

    console.log("Sending to create-group");
    await fetch((process.env.API_URL + "/create-group"), options).then(res => console.log("Result from create-group: " + JSON.stringify(res)));
}