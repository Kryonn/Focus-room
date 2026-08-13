import styles from "./activate.module.css"
import { useEffect, useState } from "react";
import { EmailService } from "../../services/email.service";

const activate = ({ setScreen, activateToken, activateEmail }) => {

    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [failedState, setFailedState] = useState("resend");

    useEffect(() => {
        if(!activateToken) {
            return;
        }
        // EmailService.postActivateRequest(activateToken).then(res => {
        //     console.log(activateToken);
        //     if(!res.error) {
        //         setSuccess(true);
        //     } else {
        //         setFailed(true);
        //     }
        // });
        setSuccess(true);

    }, [activateToken]);
    
    return (
        <div className={styles.main}>
            {
                success && (
                    // <div className={styles.content}>
                    //     <p className={styles.title}>Account Activated Successfully!</p>
                    //     <p className={styles.text}>Your email has been verified and your Focus Room account is now ready.</p>
                    //     <button onClick={() => { setScreen("auth") }} className={styles.button}>Return to login screen</button>
                    // </div>
                    <div className={styles["message-div"]}>
                        <p className={styles.title}>Account Activated Successfully!</p>
                        <div className={styles["message-content"]}>
                            <p className={styles["message-text"]} >Your email has been verified and your Focus Room account is now ready.</p>
                        </div>
                        <button onClick={() => { setAuthState("Login"); } } className={styles.button}>Back to Login</button>
                    </div>
                )
            }
            {
                failed && (
                    <div className={styles.content}>
                        <p className={styles.title}>Invalid or Expired Link</p>
                        <p className={styles.text}>This activation link is no longer valid because it has expired. Don't worry, we can send you a new one so you can finish setting up your account.</p>
                        {
                            failedState === "success" && (
                                <p className={styles.message}>A new activation link has been sent to your email</p>
                            )
                        }
                        {
                            failedState === "resend" && (
                                <button onClick={async () => {
                                    await EmailService.postRequest(activateEmail);
                                    setFailedState("success");
                                }} className={styles.button}>Resend activation email</button>
                            )
                        }
                        
                    </div>
                )
            }
        </div>
    )
}

export default activate;