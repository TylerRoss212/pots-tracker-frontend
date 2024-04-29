"use client"
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import "./timer.css"

export default function Timer() {
    let minute = 0;
    let second = 0;
    let millisecond = 0;
    let timer = false;
    let startTime: number;
    let prevTotalMilliseconds = 0;
    let doReset = false;
    let dateTimeString: string;

    let minElement: HTMLElement | null;
    let secElement: HTMLElement | null;
    let msecElement: HTMLElement | null;
    let startBtn: HTMLElement | null;
    let stopwatch: HTMLElement | null;
    let saveBtn: HTMLElement | null;
    let savePopup: HTMLElement | null;
    let minPopup: HTMLInputElement | null;
    let secPopup: HTMLInputElement | null;
    let msecPopup: HTMLInputElement | null;

    const session = useSession();

    useEffect(() => {
        minElement = document.getElementById("min");
        secElement = document.getElementById("sec");
        msecElement = document.getElementById("msec");
        startBtn = document.getElementById("start-btn");
        stopwatch = document.getElementById("stopwatch");
        saveBtn = document.getElementById("save-btn")
        savePopup = document.getElementById("popup-wrapper");
        minPopup = document.getElementById("min-popup") as HTMLInputElement;
        secPopup = document.getElementById("sec-popup") as HTMLInputElement;
        msecPopup = document.getElementById("msec-popup") as HTMLInputElement;
    });

    function handleTimerClick() {
        if (!timer) {
            // start timer
            timer = true;

            // hide start and show time
            startBtn?.classList.add("hidden");
            stopwatch?.classList.remove("hidden");

            startTime = new Date().getTime();
            stopWatch();
        } else {
            // stop timer
            timer = false;
        }
    }

    function stopWatch() {

        // get elapsed time
        let now = new Date().getTime();
        let totalMilliseconds = (now - startTime) + prevTotalMilliseconds;

        if (timer) {
            doReset = false;

            // calculate minutes, seconds, and milliseconds
            let totalSeconds = totalMilliseconds / 1000;
            minute = Math.floor(totalSeconds / 60);
            second = Math.floor(totalSeconds % 60);
            millisecond = Math.floor((totalMilliseconds % 1000) / 10);

            // set time
            msecElement!.innerHTML = millisecond.toLocaleString("en-US", { minimumIntegerDigits: 2 });
            secElement!.innerHTML = second.toLocaleString("en-US", { minimumIntegerDigits: 2 });
            minElement!.innerHTML = minute.toLocaleString("en-US", { minimumIntegerDigits: 2 });
            
            // disable save
            saveBtn?.classList.add("disable");

            setTimeout(stopWatch, 10);
        } else if (!doReset) {
            // if we don't want to reset
            // store the previous time
            prevTotalMilliseconds = totalMilliseconds;

            // allow save
            saveBtn?.classList.remove("disable");
        }
    }

    function reset() {
        doReset = true;

        prevTotalMilliseconds = 0;
        timer = false;

        // disable save
        saveBtn?.classList.add("disable");

        // hide time and show start
        stopwatch?.classList.add("hidden");
        startBtn?.classList.remove("hidden");
    }

    function openSavePopup() {
        // update the values in the popup
        msecPopup!.value = millisecond.toLocaleString("en-US", { minimumIntegerDigits: 2 });
        secPopup!.value = second.toLocaleString("en-US", { minimumIntegerDigits: 2 });
        minPopup!.value = minute.toLocaleString("en-US", { minimumIntegerDigits: 2 });

        savePopup?.classList.remove("hidden");

        // get date
        const date = new Date();

        // Get year, month, day, hours, minutes, and seconds
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Month is zero-based
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);

        // Construct DATETIME string
        dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    function cancelSave() {
        savePopup?.classList.add("hidden");
    }

    function handleFormSave() {
        // if we aren't signed in, redirect to sign in
        if (session.status != "authenticated") {
            signIn();
        }

        // save to db

        // show a green saved confirmation box on the bottom

        // handle error
    }

    return(
        <div>
            <div className="center">
                <button className="timer-btn center" onClick={handleTimerClick}>
                    <p id="start-btn" className="start">START</p>
                    <span id="stopwatch" className="hidden">
                        <span id="min" className="number">00</span>
                        <span>:</span>
                        <span id="sec" className="number">00</span>
                        <span>:</span>
                        <span id="msec" className="number">00</span>
                    </span>
                </button>
            </div>
            <div className="timer-option-wrapper">
                <button className="timer-option" onClick={reset}>RESET</button>
                <button id="save-btn" className="timer-option disable" onClick={openSavePopup}>SAVE</button>
            </div>
            <div id="popup-wrapper" className="hidden popup-wrapper">
                <div className="wrapper">
                    <form className="popup" onSubmit={handleFormSave}>
                        <div className="number-input-wrapper">
                            <input type="number" min={0} max={99} id="min-popup" className="number input" defaultValue="00" />
                            <span>:</span>
                            <input type="number" min={0} max={59} id="sec-popup" className="number input" defaultValue="00" />
                            <span>:</span>
                            <input type="number" min={0} max={99} id="msec-popup" className="number input" defaultValue="00" />
                        </div>
                        <input className="comment" type="text" maxLength={256} placeholder="Comment" />
                        <div className="bottom-buttons">
                            <button type="button" className="popup-button" onClick={cancelSave}>CANCEL</button>
                            <button type="submit" className="popup-button">SAVE</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}