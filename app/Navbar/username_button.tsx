"use client"

import { useEffect } from "react";

export default function UsernameButton({ username }: { username: any }) {
    let dropdown: HTMLElement | null;
    let usernameBtn: HTMLElement | null;

    useEffect(() => {
        dropdown = document.getElementById("dropdown-menu-wrapper");
        usernameBtn = document.getElementById("username_button");
    });

    // handle clicking out of the dropdown menu
    function clickOut(event: any) {
        if (!dropdown?.contains(event.target) && event.target != usernameBtn) {
            dropdown?.classList.remove("open-dropdown");
            document.removeEventListener("click", clickOut);
        }
    }

    function toggleDropdown() {
        // if not already dropdown
        if (!dropdown?.classList.contains("open-dropdown")) {
            // display dropdown
            dropdown?.classList.add("open-dropdown");
            // add click out listener
            document.addEventListener("click", clickOut);
        } else {
            // hide dropdown
            dropdown?.classList.remove("open-dropdown");
            // remove click out listener
            document.removeEventListener("click", clickOut);
        }

        
    }

    return <button id="username_button" className="Link" onClick={toggleDropdown}>{username}</button>
}