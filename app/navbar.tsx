import "./navbar.css";
import Link from "next/link";

export default function Navbar() {

    return (
        <div className="spread-across">
            <Link href="/" className="Link title">POTS Tracker</Link>
            <div className="right-side">
                <Link href="/about" className="Link">About</Link>
                <button>Sign In</button>
            </div>
        </div>
    );
}