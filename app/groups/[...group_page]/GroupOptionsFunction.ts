"use server"
const awsSignRequests = require("aws-sign-requests");

export async function AddUser({ email, groupId }: { email: string | undefined | null, groupId: number }) {
    console.log("EMAIL: ", email);
    console.log("GROUP: ", groupId);
    // add user to group
    let options = awsSignRequests({
        credentials: {
            access_key: process.env.ACCESS_KEY_ID,
            secret_key: process.env.SECRETKEY
        },
        method: "PUT",
        url: (process.env.API_URL + "/add-email-to-group"),
        service_info: {
            service: "execute-api",
            region: "us-east-2"
        },
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            email: email,
            group_id: groupId
        }
    });

    console.log("Sending to add-email-to-group");
    await fetch((process.env.API_URL + "/add-email-to-group"), options);
}

export async function LeaveGroup({ email, groupId }: { email: string | undefined | null, groupId: number }) {
    // delete user from group
    let options = awsSignRequests({
        credentials: {
            access_key: process.env.ACCESS_KEY_ID,
            secret_key: process.env.SECRETKEY
        },
        method: "DELETE",
        url: (process.env.API_URL + "/delete-user-from-group"),
        service_info: {
            service: "execute-api",
            region: "us-east-2"
        },
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            email: email,
            group_id: groupId
        }
    });

    console.log("Sending to delete-user-from-group");
    await fetch((process.env.API_URL + "/delete-user-from-group"), options);
}