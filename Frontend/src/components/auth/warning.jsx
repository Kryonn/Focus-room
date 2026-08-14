import styles from "./warning.module.css"
import { useEffect } from "react"

const warning = ({ setWarningState, warningMessage }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            setWarningState(false)
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.color}></div>
            <div className={styles.content}>
                <div className={styles.top}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className={styles.icon}>
                        <path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 384C302.3 384 288 398.3 288 416C288 433.7 302.3 448 320 448C337.7 448 352 433.7 352 416C352 398.3 337.7 384 320 384zM320 192C301.8 192 287.3 207.5 288.6 225.7L296 329.7C296.9 342.3 307.4 352 319.9 352C332.5 352 342.9 342.3 343.8 329.7L351.2 225.7C352.5 207.5 338.1 192 319.8 192z"/>
                    </svg>
                    <p>Something went wrong</p>
                </div>
                <div className={styles.bottom}>
                    <p>{warningMessage}</p>
                </div>
            </div>
        </div>
    )
}

export default warning