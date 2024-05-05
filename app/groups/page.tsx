import { auth } from "@/auth";
import Navbar from "../Navbar/navbar";
const awsSignRequests = require("aws-sign-requests");
import "./page.css";
import Link from "next/link";
import CreateGroup from "./create_group";

export default async function Groups() {
    let session = await auth();

    // fetch groups

    let email = session?.user?.email;

    // fetch groups
    let options = awsSignRequests({
        credentials: {
            access_key: process.env.ACCESS_KEY_ID,
            secret_key: process.env.SECRETKEY
        },
        method: "POST",
        url: (process.env.API_URL + "/get-groups-from-email"),
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

    console.log("Sending to get-groups-from-email");
    let response = await fetch((process.env.API_URL + "/get-groups-from-email"), options);
    let groups = await response.json();
    let newGroups: any[] = [];
    for (let i in groups) {
        newGroups.push(groups[i][0])
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="extra-extend center column">
                <h1 className="subtitle">Groups</h1>
                <div className="center">
                    {
                        (newGroups.length != 0) ? (
                            <table>
                                <tbody>
                                    {newGroups.map((group: { group_id: number; name: string; }) => (
                                        <tr key={group.group_id}>
                                            <td className="cell">
                                                <Link href={{ pathname: '/groups/group', query: {name: group.name, groupId: group.group_id}}} className="button">{group.name}</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div>No Groups</div>
                        )
                    }
                </div>
            </div>
            <div>
                <CreateGroup></CreateGroup>
            </div>
        </div>
    );
}