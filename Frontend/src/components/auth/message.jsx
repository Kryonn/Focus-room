import styles from "./message.module.css"

const message = ({ messageTitle, topContentText, centerContentText, bottomContentText }) => {
    return (
        <div className={styles["register-success"]}>
            <p className={styles.title}>Almost there!</p>
            <div className={styles["message-content"]}>
                <p className={styles["message-text"]} >We sent a verification link to </p>
                <p className={styles["message-center-text"]}>Email legal</p>
                <p className={styles["message-text"]}>Just click the link in that email to confirm your account and get started.</p>
            </div>
            <p className={styles["message-footer"]}>Can't find the email? Check your <span className={styles.bold}>spam folder</span> or click here to <span className={styles.bold}>resend it</span>.</p>
        </div>
    )
}

export default message;