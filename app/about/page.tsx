import Navbar from "../Navbar/navbar";
import "./page.css";

export default function About() {
    return(
        <div>
            <Navbar></Navbar>
            <p className="extend">This is an app created to track fainting episodes caused by POTS.</p>
        </div>
    );
}