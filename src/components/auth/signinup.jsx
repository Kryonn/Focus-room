import styles from "./signinup.module.css"
// import { useState } from "react"

const signinup = ({ setScreen }) => {
    // const [username, setUsername] = useState(null);
    // const [password, setPassword] = useState(null);

    const verifyInput = (event) => {
        if(!event.target.value) {
            if(event.target.classList.contains(`${styles.text}`)) {
                event.target.classList.toggle(`${styles.text}`);
            }
        } else {
            if(!event.target.classList.contains(`${styles.text}`)) {
                event.target.classList.toggle(`${styles.text}`);
            }
        }
    }

    return (
        <div className={styles.main}>
            <form className={styles.login} action="">
                <h1 className={styles.title}>Sign In</h1>
                <div className={styles["input-div"]}>
                    <div className={styles["label-input-div"]}>
                        <div className={styles["label-input"]}>
                            <input className={styles.input} id="username" type="text" name="" onChange={verifyInput}/>
                            <label className={styles.label} htmlFor="username">Username</label>
                        </div>
                        <div className={styles["label-input"]}>
                            <input className={styles.input} id="password" type="password" name="" onChange={verifyInput}/>
                            <label className={styles.label} htmlFor="password">Password</label>
                        </div>
                    </div>
                    <p className={styles["password-message"]}>Forgot your password? <a className={styles.link}>Recover account</a></p>
                </div>
                <div className={styles["button-div"]}>
                    <button className={styles.button}type="submit" onClick={() => setScreen("app")}>Login</button>
                    <p className={styles["register-message"]}>New here? <a className={styles.link}>Create an account</a></p>
                </div>
            </form>

        </div>
    )
}
export default signinup