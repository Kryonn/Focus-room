import styles from "./pomodoro.module.css";
import { useState, useEffect, useRef } from "react";
import { POMODORO_PATH } from "../../../assets/svg-path";
import { use } from "react";

const pomodoro = () => {
    const [time, setTime] = useState(20 * 60);
    const [sound, setSound] = useState(true);
    const [pomodoroState, setPomodoroState] = useState("pause");
    const [pomodoroMode, setPomodoroMode] = useState("work");
    const [resetPath, setResetPath] = useState(POMODORO_PATH.reset);
    const [playPath, setPlayPath] = useState(POMODORO_PATH.play);
    const [mutedPath, setMutedPath] = useState(POMODORO_PATH.unmuted);
    const [settingPath, setSettingPath] = useState(POMODORO_PATH.setting);
    const [resetButton, setResetButton] = useState(false);
    const [playButton, setPlayButton] = useState(false);
    const [playButtonState, setPlayButtonState] = useState(25);
    const [resetButtonState, setResetButtonState] = useState(20);
    const [soundButton, setSoundButton] = useState(false);
    const [settingButton, setSettingButton] = useState(false);
    const [layoutMode, setLayoutMode] = useState("small");
    const [workTime, setWorkTime] = useState(25);
    const [breakTime, setBreakTime] = useState(25);
    const mainRef = useRef(null);

    function pausePlay() {
        if (pomodoroState === "pause") {
            setPomodoroState("running");
            setPlayPath(POMODORO_PATH.pause);
            return;
        }

        setPomodoroState("pause");
        setPlayPath(POMODORO_PATH.play);
    }

    function unmutedMuted() {
        if (!sound) {
            setSound(true);
            setMutedPath(POMODORO_PATH.unmuted);
            return;
        }

        setSound(false);
        setMutedPath(POMODORO_PATH.muted);
    }

    function toggleSetting() {
        setSettingButton(!settingButton);
        setResetButton(!resetButton);
        setPlayButton(!playButton);
        setSoundButton(!soundButton);
    }

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

    function handleReset() {
        setPlayButtonState("pause");
        setPlayPath(POMODORO_PATH.play);
        setTime(pomodoroMode === "break" ? breakTime : workTime);
    }

    useEffect(() => {
        if (pomodoroState === "pause" || pomodoroState === "interval") {
            return;
        }

        const interval = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime === 0) {
                    clearInterval(interval);

                    setPomodoroState("interval");

                    setPomodoroMode((prevWork) => {
                        if (prevWork === "work") {
                            return "break";
                        } else {
                            return "work";
                        }
                    });

                    if (pomodoroMode === "work") {
                        return breakTime;
                    } else {
                        return workTime;
                    }
                }

                return prevTime - 1;
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [pomodoroState]);

    useEffect(() => {
        if (settingButton) {
            setPlayPath(POMODORO_PATH.unmuted);
            setResetPath(POMODORO_PATH.unmuted);
            setMutedPath(POMODORO_PATH.muted);
            setSettingPath(POMODORO_PATH.unmuted);
        } else {
            setPlayPath(POMODORO_PATH.play);
            setResetPath(POMODORO_PATH.reset);
            setMutedPath(POMODORO_PATH.unmuted);
            setSettingPath(POMODORO_PATH.setting);
        }
    }, [settingButton]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0];
            const { width, height } = entry.contentRect;
            const widget = entry.target.closest(".grid-stack-item");
            const cellWidth = widget.getAttribute("gs-w");
            const cellHeight = widget.getAttribute("gs-h");
            let mode = "big";
            console.log(cellHeight);
            console.log(cellWidth);

            if (cellHeight == null) {
                mode = "wide";
            }

            if (cellWidth == null) {
                mode = "tall";
            }

            if (cellWidth == null && cellHeight == null) {
                setSettingButton(false);
                mode = "small";
            }

            setLayoutMode(mode);
        });

        resizeObserver.observe(mainRef.current);
    }, []);

    return (
        <div ref={mainRef} className={`${styles.main} ${styles[layoutMode]}`}>
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
            <div className={styles.buttonDiv}>
                {(layoutMode === "small" || !settingButton) && (
                    <button onClick={handleReset} className={styles.button}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 640"
                        >
                            <path d={resetPath} />
                        </svg>
                    </button>
                )}
                {layoutMode !== "small" && settingButton && (
                    <button
                        onClick={changeResetButtonState}
                        className={styles.button}
                    >
                        <span>Break</span>
                        <span>{resetButtonState}</span>
                    </button>
                )}
                {(layoutMode === "small" || !settingButton) && (
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
                )}
                {layoutMode !== "small" && settingButton && (
                    <button
                        onClick={changePlayButtonState}
                        className={`${styles.button} play-button`}
                    >
                        <span>Work</span>
                        <span>{playButtonState}</span>
                    </button>
                )}
                <button onClick={unmutedMuted} className={styles.button}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                    >
                        <path className="sound-path" d={mutedPath} />
                    </svg>
                </button>
                <button
                    onClick={toggleSetting}
                    className={`${styles.button} ${styles.settings}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                    >
                        <path d={settingPath} />
                    </svg>
                </button>
            </div>
        </div>
    );
};
export default pomodoro;
