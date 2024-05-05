"use client"

import { useEffect } from "react";
import "./create_group.css"
import { useSession } from "next-auth/react";
import { HandleCreateGroup } from "./handle_create_group";

export default function CreateGroup() {
    let session = useSession();

    let popupWrapper: HTMLElement | null;
    let nameInput: HTMLInputElement | null;

    useEffect(() => {
        popupWrapper = document.getElementById("popup-wrapper");
        nameInput = document.getElementById("name") as HTMLInputElement;
    });

    function showPopup() {
        popupWrapper?.classList.remove("hidden");
    }

    async function handleFormSubmit(event: any) {
        event?.preventDefault();
        let email = session!.data!.user!.email as string;
        let name = nameInput!.value;
        await HandleCreateGroup({ email, name });
        location.reload();
    }

    function cancelSave() {
        popupWrapper?.classList.add("hidden");
    }

    return (
        <div>
            <div className="button-wrapper center">
                <button onClick={showPopup}>Create Group</button>
            </div>
            <div id="popup-wrapper" className="hidden popup-wrapper">
                <div className="wrapper center">
                    <form className="popup" onSubmit={handleFormSubmit}>
                        <h1 className="popup-title">Create Group</h1>
                        <input id="name" className="name" type="text" maxLength={255} placeholder="Group name"/>
                        <div className="bottom-buttons">
                            <button type="button" className="popup-button" onClick={cancelSave}>CANCEL</button>
                            <button type="submit" className="popup-button">CREATE</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}