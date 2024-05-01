import Navbar from "./Navbar/navbar";
import Timer from "./Timer/timer";

export default function Home() {
    return (
        <div>
            <Navbar></Navbar>
            <div className="extend">
                <Timer></Timer>
            </div>
        </div>
    );
}
