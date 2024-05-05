"use client"
import { useSession } from "next-auth/react";
import { AddUser, LeaveGroup } from "./GroupOptionsFunction";
import "./page.css"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function GroupOptions({ groupId }: { groupId: number }) {
    let router = useRouter();
    let session = useSession();

    let leavePopupWrapper: HTMLElement | null;
    let addUserPopupWrapper: HTMLElement | null;
    let emailInput: HTMLInputElement | null;

    useEffect(() => {
        leavePopupWrapper = document.getElementById("leave-popup-wrapper");
        addUserPopupWrapper = document.getElementById("add-user-popup-wrapper");
        emailInput = document.getElementById("email-address") as HTMLInputElement;
    });

    async function showAddUserPopup() {
        addUserPopupWrapper?.classList.remove("hidden");
    }

    async function showLeaveGroupPopup() {
        leavePopupWrapper?.classList.remove("hidden");
    }

    async function handleAddUserSubmit() {
        event?.preventDefault();
        let email = emailInput?.value;
        await AddUser({ email, groupId });
        location.reload();
    }

    function cancelAddUser() {
        addUserPopupWrapper?.classList.add("hidden");
    }

    async function handleLeaveGroupSubmit(event: any) {
        event?.preventDefault();
        let email = session?.data?.user?.email
        await LeaveGroup({ email, groupId });
        router.push("/groups");

    }

    function cancelLeave() {
        leavePopupWrapper?.classList.add("hidden");
    }

    return (
        <div >
            <button className="button-right" onClick={showAddUserPopup}>
                Add User
            </button>
            <div id="add-user-popup-wrapper" className="hidden popup-wrapper">
                <div className="wrapper center">
                    <form className="popup" onSubmit={handleAddUserSubmit}>
                        <h1 className="popup-title">Add User</h1>
                        <input id="email-address" className="name" type="email" maxLength={255} placeholder="Gmail Address" />
                        <div className="bottom-buttons">
                            <button type="button" className="popup-button" onClick={cancelAddUser}>CANCEL</button>
                            <button type="submit" className="popup-button">ADD</button>
                        </div>
                    </form>
                </div>
            </div>
            <button className="button-left" onClick={showLeaveGroupPopup}>
                Leave Group
            </button>
            <div id="leave-popup-wrapper" className="hidden popup-wrapper">
                <div className="wrapper center">
                    <form className="popup" onSubmit={handleLeaveGroupSubmit}>
                        <h1 className="popup-title">Are you sure you want to leave the group?</h1>
                        <div className="bottom-buttons">
                            <button type="button" className="popup-button" onClick={cancelLeave}>CANCEL</button>
                            <button type="submit" className="popup-button">Leave</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
