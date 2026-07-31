// CSS
import styles from "./pomodoro.module.css";

// React
import { useState, useEffect, useRef } from "react";

// Services
import { WidgetService } from "../../../services/widget.service";

// Assets
import pomodoroSound from "../../../assets/pomodoro-sound.mp3"

// Contants
import { POMODORO_PATH } from "../../../constants/constant.js";

const pomodoro = ({ gridName, id, pomodoroWorkTime, pomodoroBreakTime, accessToken}) => {
    // States
    const [time, setTime] = useState(pomodoroWorkTime * 60);
    const [pomodoroState, setPomodoroState] = useState("pause");
    const [pomodoroMode, setPomodoroMode] = useState("work");
    const [resetPath, setResetPath] = useState(POMODORO_PATH.reset);
    const [playPath, setPlayPath] = useState(POMODORO_PATH.play);
    const [settingPath, setSettingPath] = useState(POMODORO_PATH.setting);
    const [prevPlayButtonState, setPrevPlayButtonState] = useState(pomodoroWorkTime);
    const [prevResetButtonState, setPrevResetButtonState] = useState(pomodoroBreakTime);
    const [playButtonState, setPlayButtonState] = useState(pomodoroWorkTime);
    const [resetButtonState, setResetButtonState] = useState(pomodoroBreakTime);
    const [settingButtonState, setSettingButtonState] = useState(false);
    const [layoutMode, setLayoutMode] = useState("small");
    const [workTime, setWorkTime] = useState(25);
    const [breakTime, setBreakTime] = useState(25);

    // Refs
    const soundRef = useRef(null);   
    const mainRef = useRef(null);

    // Component Functions
    // Toggle pomodoro state e svg play button
    function pausePlay() {
        if (pomodoroState === "pause") {
            setPomodoroState("running");
            setPlayPath(POMODORO_PATH.pause);
        } else {
            setPomodoroState("pause");
            setPlayPath(POMODORO_PATH.play);
        }
    }
    
    // Change to next reset button state (Break time)
    function changeResetButtonState() {
        switch (resetButtonState) {
            case 5:
                setResetButtonState(10);
                setBreakTime(10 * 60);
                break;

            case 10:
                setResetButtonState(15);
                setBreakTime(15 * 60);
                break;

            case 15:
                setResetButtonState(20);
                setBreakTime(20 * 60);
                break;

            case 20:
                setResetButtonState(5);
                setBreakTime(5 * 60);
                break;
        }
    }

    // Change to next play button state (Work time)
    function changePlayButtonState() {
        switch (playButtonState) {
            case 25:
                setPlayButtonState(30);
                setWorkTime(30 * 60);
                break;

            case 30:
                setPlayButtonState(35);
                setWorkTime(35 * 60);
                break;

            case 35:
                setPlayButtonState(40);
                setWorkTime(40 * 60);
                break;

            case 40:
                setPlayButtonState(45);
                setWorkTime(45 * 60);
                break;

            case 45:
                setPlayButtonState(50);
                setWorkTime(50 * 60);
                break;

            case 50:
                setPlayButtonState(55);
                setWorkTime(10 * 60);
                break;

            case 55:
                setPlayButtonState(60);
                setWorkTime(60 * 60);
                break;

            case 60:
                setPlayButtonState(25);
                setWorkTime(25 * 60);
                break;
        }
    }

    // Change pomodoro state, svg play button and time when reset button is clicked
    function handleReset() {
        setPomodoroState("pause");
        setPlayPath(POMODORO_PATH.play);
        setTime(pomodoroMode === "break" ? resetButtonState * 60 : playButtonState * 60);
    }

    // Change setting button state and time when setting button is clicked
    async function verifyPomodoroTime() {
        setSettingButtonState(prev => !prev);

        // If the setting button is being toggled off and the time value hasn't changed,
        // update the time to the new value
        if(settingButtonState) {
            if(settingButtonState && (pomodoroMode === "work" && prevPlayButtonState * 60 === time || pomodoroMode === "break" && prevResetButtonState * 60 === time)) {
                if(pomodoroMode === "work") {
                    setTime(playButtonState * 60);
                } else {
                    setTime(resetButtonState * 60);
                }
            }

            await WidgetService.putPomodoroRequest(playButtonState, resetButtonState, accessToken, gridName, id);
        } else {
            setPrevPlayButtonState(playButtonState);
            setPrevResetButtonState(resetButtonState);
        }        
    }

    useEffect(() => {
        if (pomodoroState === "pause") {
            return;
        }

        // If pomodoroState is in "interval" state, wait 4 seconds to change to "running" state
        if (pomodoroState === "interval") {
            const timeout = setTimeout(() => {
                setPomodoroState("running");

                if(pomodoroMode === "work") {
                    setTime(playButtonState * 60);
                } else {
                    setTime(resetButtonState * 60);
                }
            }, 4000);

            return () => {
                clearTimeout(timeout);
            }
        }

        // If pomodoroState is in "running" state, if time is 0 change to "interval" state else decrease 1 of time
        if (pomodoroState === "running") {
            const interval = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime === 0) {
                        soundRef.current.play();

                        clearInterval(interval);                                                                                                                                     
    
                        setPomodoroState("interval");   
                        
                        const nextMode = pomodoroMode === "work" ? "break" : "work";
                        const newTime = nextMode === "work" ? playButtonState * 60 : resetButtonState * 60; 
                        
                        setPomodoroMode(nextMode);
    
                        return newTime;
                    }
    
                    return prevTime - 1;
                });
            }, 1000);
    
            return () => {
                clearInterval(interval);
            };
        }
    }, [pomodoroState]);

    useEffect(() => {
        // Create an observer to verify widget size
        const resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0];
            const { width, height } = entry.contentRect;

            // Get widget attributes
            const widget = entry.target.closest(".grid-stack-item");
            const cellWidth = Number(widget.getAttribute("gs-w"));
            const cellHeight = Number(widget.getAttribute("gs-h"));

            // Determine widget mode: small, tall, one-wide or wide
            let mode = "big";

            if (cellWidth > cellHeight && cellWidth && cellHeight) {
                mode = "wide"
            }
            
            if (cellHeight == 0) {
                mode = "one-wide";
            }

            if (cellWidth == 0) {
                mode = "tall";
            }

            if (cellWidth == 0 && cellHeight == 0) {
                mode = "small";
            }

            setLayoutMode(mode);
        });

        resizeObserver.observe(mainRef.current);
    }, []);

    

    return (
        <div ref={mainRef} className={`${styles.main} ${styles[layoutMode]}`}>
            {/* Change pomodoro state sound */}
            <audio ref={soundRef} src={pomodoroSound} preload="auto"></audio>

            {/* Time div */}
            <div className={styles.timeDiv}>
                <p>{String(Math.floor(time / 3600)).padStart(2, "0")}</p>
                <p className={styles.doubleDot}>:</p>
                <p>{String(Math.floor((time % 3600) / 60)).padStart(2, "0")}</p>
                <p className={styles.doubleDot}>:</p>
                <p>
                    {String(Math.floor((time % 3600) % 60))
                        .slice(0, 2)
                        .padStart(2, "0")}
                </p>
            </div>

            {/* Button div */}
            <div className={styles.buttonDiv}>
                {
                    // Reset button
                    (layoutMode === "small" || !settingButtonState) && (
                        <button onClick={handleReset} className={styles.button}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                            >
                                <path d={resetPath} />
                            </svg>
                        </button>
                    )
                }
                {
                    // Break time settings button
                    layoutMode !== "small" && layoutMode !== "tall" && settingButtonState && (
                        <button
                            onClick={changeResetButtonState}
                            className={styles.button}
                        >
                            <span>Break</span>
                            <span>{resetButtonState}</span>
                        </button>
                    )
                }
                {
                    // Play button
                    (layoutMode === "small" || !settingButtonState) && (
                        <button
                            onClick={(e) => {
                                pausePlay();
                            }}
                            className={`${styles.button} play-button`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                            >
                                <path className="play-path" d={playPath} />
                            </svg>
                        </button>
                    )
                }
                {
                    // Work time settings button
                    layoutMode !== "small" && layoutMode !== "tall" && settingButtonState && (
                        <button
                            onClick={changePlayButtonState}
                            className={`${styles.button} play-button`}
                        >
                            <span>Work</span>
                            <span>{playButtonState}</span>
                        </button>
                    )
                }

                {
                    // Settings button
                    layoutMode !== "small" && layoutMode !== "tall" && (
                        <button
                            onClick={() => { verifyPomodoroTime() }}
                            className={`${styles.button} ${styles.settings}`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                            >
                                <path d={settingPath} />
                            </svg>
                        </button>
                    )
                }
            </div>
        </div>
    );
};
export default pomodoro;