import "./navbar.css";
import Link from "next/link";
import { auth, signIn, signOut } from "@/auth"
import UsernameButton from "./username_button";

export default async function Navbar() {
    const session = await auth();

    return (
        <div className="spread-across">
            <Link href="/" className="Link title">POTS Tracker</Link>
            <div className="right-side">
                <Link href="/about" className="Link padding-right">About</Link>
                {
                    session?.user? (
                        <div>
                            <UsernameButton username={session.user.name}></UsernameButton>
                            <Dropdown></Dropdown>
                        </div>
                    ) : (
                        <Link href="/api/auth/signin"><button>Sign In</button></Link>
                    )
                }
            </div>
        </div>
    );
}

function Dropdown() {
    return(
        <div id="dropdown-menu-wrapper" className="dropdown-menu-wrapper">
            <div className="dropdown-menu">
                <button className="dropdown-item Link">My Times</button>
                <button className="dropdown-item extra-bottom-padding Link">Groups</button>
                <form className="sign-out-line extra-bottom-padding max-width" action={async () => {
                    'use server';
                    await signOut();
                }}>
                    <button type="submit" className="dropdown-item Link">Sign Out</button>
                </form>
            </div>
        </div>
    );
}