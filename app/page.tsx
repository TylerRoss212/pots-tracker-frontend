import Navbar from "./navbar";
import Timer from "./timer";
import "./page.css"

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
