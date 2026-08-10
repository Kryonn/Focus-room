import styles from "./activate.module.css"
import { useEffect, useState } from "react";
import { EmailService } from "../../services/email.service";

const activate = ({ setScreen, activateToken, activateEmail }) => {

    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        if(!activateToken) {
            return;
        }
        EmailService.postActivateRequest(activateToken).then(res => {
            if(!res.error) {
                setSuccess(true);
            } else {
                setFailed(true);
            }
        });

    }, [activateToken]);
    
    return (
        <div className={styles.main}>
            {
                success && (
                    <div className={styles.content}>
                        <p className={styles.title}>Account Activated Successfully!</p>
                        <p className={styles.text}>Your email has been verified and your Focus Room account is now ready.</p>
                        <button className="">asd</button>
                    </div>
                )
            }
            {
                failed && (
                    <div className={styles.content}>
                        <p className={styles.title}>Invalid or Expired Link</p>
                        <p className={styles.text}>This activation link is no longer valid because it has expired. Don't worry, we can send you a new one so you can finish setting up your account.</p>
                        <button onClick={() => {
                            
                            // EmailService.postRequest(activateEmail, )
                        }} className={styles.button}>Resend activation email</button>
                    </div>
                )
            }
        </div>
    )
}

export default activate;