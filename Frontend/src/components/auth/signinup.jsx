import styles from "./signinup.module.css";
import { AuthService } from "../../services/auth.service";
import { EmailService } from "../../services/email.service";
import { useState, useEffect } from "react";
import { setToken } from "../../services/api";

const signinup = ({ email, recover, recoverToken, setScreen, setAccessToken, setUsername, setLoginWarning, setLoginMessage, setRegisterWarning, setRegisterMessage, setRecoverWarning, setRecoverMessage, setChangeWarning, setChangeMessage }) => {
    const [screenState, setScreenState] = useState(recover ? "Change Password" : "Sign In");
    const [loginHidden, setLoginHidden] = useState("hidden");
    const [registerHidden, setRegisterHidden] = useState("hidden");
    const [emailHidden, setEmailHidden] = useState("hidden");
    const [recoverHidden, setRecoverHidden] = useState("hidden");
    const [recoverSuccess, setRecoverSuccess] = useState(false);
    const [changePasswordHidden, setChangePasswordHidden] = useState("hidden")
    const [changeSuccess, setChangeSuccess] = useState(false);

    const [registerUsername, setRegisterUsername] = useState(null);
    const [registerEmail, setRegisterEmail] = useState(null);
    const [registerPassword, setRegisterPassword] = useState(null);
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState(null);
    const [loginUsername, setLoginUsername] = useState(null);
    const [loginPassword, setLoginPassword] = useState(null);
    const [recoverEmail, setRecoverEmail] = useState(null);
    const [changePasswordPassword, setChangePasswordPassword] = useState(null);
    const [changePasswordConfirm, setChangePasswordConfirm] = useState(null);

    useEffect(() => {
        setLoginHidden("hidden");
        setRegisterHidden("hidden");
        setEmailHidden("hidden");
        setRecoverHidden("hidden");
        setChangePasswordHidden("hidden");

        switch(screenState) {
            case "Sign In":
                setLoginHidden("");
                break;
            
            case "Sign Up":
                setRegisterHidden("");
                break;

            case "Email":
                setEmailHidden("");
                break;

            case "Recover":
                setRecoverHidden("");
                break;

            case "Change Password":
                setChangePasswordHidden("");
                break;

            default:
                break;
        }
    }, [screenState]);

    const loginFunction = async (loginUsername, loginPassword) => {

        if(!loginUsername || !loginPassword) {
            if(!loginUsername) {
                setLoginMessage("Username is required");
            }

            if(!loginPassword) {
                setLoginMessage("Password is required");
            }   

            if(!loginUsername && !loginPassword) {
                setLoginMessage("Username and password are required");
            }
        
            setLoginWarning(true);
            return;
        }

        const res = await AuthService.loginPostRequest(loginUsername, loginPassword);

        const data = res.data;
        if(!res.error) {
            setUsername(data.username);
            setToken(data.accessToken);
            setScreen("app");
        } else {
            setLoginMessage("Invalid username or password");
            setLoginWarning(true);
        }
    }

    const registerFunction = async (registerUsername, registerEmail, registerPassword, registerConfirmPassword) => {
        
        if(!registerUsername || !registerEmail || !registerPassword) {
            setRegisterMessage("All inputs are required");
            setRegisterWarning(true);
            return;
        }
        
        if(registerPassword !== registerConfirmPassword) {
            setRegisterMessage("Matching passwords required");
            setRegisterWarning(true);
            return;
        }

        const res = await AuthService.registerPostRequest(registerUsername, registerEmail, registerPassword);

        if(!res.error) {
            setScreenState("Email");
        } else {
            setRegisterMessage("The register is failed");
            setRegisterWarning(true);
        }
    }

    const recoverFunction = async (recoverEmail) => {
        if(!recoverEmail) {
            setRecoverMessage("All inputs are required");
            setRecoverWarning(true);
            return;
        }

        await EmailService.postRecoverEmailRequest(recoverEmail);

        setRecoverSuccess(true);
    }

    const changeFunction = async (changePasswordPassword, changePasswordConfirm) => {
        if(!changePasswordPassword || !changePasswordConfirm) {
            setChangeMessage("All inputs are required");
            setChangeWarning(true);
            return;
        }
        
        if(changePasswordPassword !== changePasswordConfirm) {
            setChangeMessage("Matching passwords required");
            setChangeWarning(true);
            return;
        }

        await EmailService.postRecoverRequest(recoverToken, email, changePasswordPassword);

        setChangeSuccess(true);
    }

    return (
        <div className={styles.main}>
            <form className={styles.login} action="">
                <h1 className={`${styles.title} ${screenState === "Email" ? styles.hidden : ""}`}>{screenState}</h1>
                <div className={styles["input-div"]}>
                    <div className={styles["label-input-div"]}>
                        <div className={`${styles["email-div"]} ${styles[emailHidden]}`}>
                            <p className={styles["email-title"]}>Almost there!</p>
                            <p className={styles["email-text"]} >We sent a verification link to <span className={styles.bold}>{registerEmail}</span>. Just click the link in that email to confirm your account and get started.</p>
                            <svg className={styles.emailIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M125.4 128C91.5 128 64 155.5 64 189.4C64 190.3 64 191.1 64.1 192L64 192L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 192L575.9 192C575.9 191.1 576 190.3 576 189.4C576 155.5 548.5 128 514.6 128L125.4 128zM528 256.3L528 448C528 456.8 520.8 464 512 464L128 464C119.2 464 112 456.8 112 448L112 256.3L266.8 373.7C298.2 397.6 341.7 397.6 373.2 373.7L528 256.3zM112 189.4C112 182 118 176 125.4 176L514.6 176C522 176 528 182 528 189.4C528 193.6 526 197.6 522.7 200.1L344.2 335.5C329.9 346.3 310.1 346.3 295.8 335.5L117.3 200.1C114 197.6 112 193.6 112 189.4z"/>
                            </svg>
                            <p className={styles["email-footer"]}>Can't find the email? Check your <span className={styles.bold}>spam folder</span> or click here to <span className={styles.bold}>resend it</span>.</p>
                        </div>
                        <div className={`${styles["recover-div"]} ${styles[recoverHidden]} ${!recoverSuccess ? styles.hidden : ""}`}>
                            <p className={styles["email-text"]} >If an account exists with that email, we've sent instructions to reset your password.</p>
                            <svg className={styles.emailIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M125.4 128C91.5 128 64 155.5 64 189.4C64 190.3 64 191.1 64.1 192L64 192L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 192L575.9 192C575.9 191.1 576 190.3 576 189.4C576 155.5 548.5 128 514.6 128L125.4 128zM528 256.3L528 448C528 456.8 520.8 464 512 464L128 464C119.2 464 112 456.8 112 448L112 256.3L266.8 373.7C298.2 397.6 341.7 397.6 373.2 373.7L528 256.3zM112 189.4C112 182 118 176 125.4 176L514.6 176C522 176 528 182 528 189.4C528 193.6 526 197.6 522.7 200.1L344.2 335.5C329.9 346.3 310.1 346.3 295.8 335.5L117.3 200.1C114 197.6 112 193.6 112 189.4z"/>
                            </svg>
                            <button
                                className={`${styles.button} recover ${styles[recoverHidden]} ${!recoverSuccess ? styles.hidden : ""}`}
                                type="button"
                                onClick={() => { setScreenState("Sign In") }}
                            >
                                Back to login
                            </button>
                        </div>
                        <div className={`${styles["change-div"]} ${styles[changePasswordHidden]} ${!changeSuccess ? styles.hidden : ""}`}>
                            <p className={styles["email-text"]} >Your password has been successfully changed. You can now log in to your Focus Room account with your new credentials.</p>
                            <svg className={styles.changeIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320C528 205.1 434.9 112 320 112zM390.7 233.9C398.5 223.2 413.5 220.8 424.2 228.6C434.9 236.4 437.3 251.4 429.5 262.1L307.4 430.1C303.3 435.8 296.9 439.4 289.9 439.9C282.9 440.4 276 437.9 271.1 433L215.2 377.1C205.8 367.7 205.8 352.5 215.2 343.2C224.6 333.9 239.8 333.8 249.1 343.2L285.1 379.2L390.7 234z"/>
                            </svg>
                            <button
                                className={`${styles.button} change ${styles[changePasswordHidden]} ${!changeSuccess ? styles.hidden : ""}`}
                                type="button"
                                onClick={() => {
                                    setScreenState("Sign In")
                                }}
                            >
                                Back to login
                            </button>
                        </div>
                        <div
                            className={`${styles["label-input"]} register ${styles[registerHidden]}`}
                        >
                            <input
                                className={styles.input}
                                id="email"
                                type="email"
                                name=""
                                onChange={(e) => {
                                    // verifyInput(e);
                                    e.target.classList.toggle(`${styles.text}`);
                                    setRegisterEmail(e.target.value);
                                }}
                            />
                            <label className={styles.label} htmlFor="email">
                                E-mail
                            </label>
                        </div>
                        <div
                            className={`${styles["label-input"]} register ${styles[registerHidden]}`}
                        >
                            <input
                                className={styles.input}
                                id="username-register"
                                type="text"
                                name=""
                                onChange={(e) => {
                                    // verifyInput(e);
                                    e.target.classList.toggle(`${styles.text}`);
                                    setRegisterUsername(e.target.value);
                                }}
                            />
                            <label
                                className={styles.label}
                                htmlFor="username-register"
                            >
                                Username
                            </label>
                        </div>
                        <div
                            className={`${styles["label-input"]} register ${styles[registerHidden]}`}
                        >
                            <input
                                className={styles.input}
                                id="password-register"
                                type="password"
                                name=""
                                onChange={(e) => {
                                    // verifyInput(e);
                                    e.target.classList.toggle(`${styles.text}`);
                                    setRegisterConfirmPassword(e.target.value);
                                }}
                            />
                            <label
                                className={styles.label}
                                htmlFor="password-register"
                            >
                                Password
                            </label>
                        </div>
                        <div
                            className={`${styles["label-input"]} register ${styles[registerHidden]}`}
                        >
                            <input
                                className={styles.input}
                                id="password-confirm-register"
                                type="password"
                                name=""
                                onChange={(e) => {
                                    // verifyInput(e);
                                    e.target.classList.toggle(`${styles.text}`);
                                    setRegisterPassword(e.target.value);
                                }}
                            />
                            <label
                                className={styles.label}
                                htmlFor="password-confirm-register"
                            >
                                Confirm password
                            </label>
                        </div>
                        <div
                            className={`${styles["label-input"]} login ${styles[loginHidden]}`}
                        >
                            <input
                                className={styles.input}
                                id="username-login"
                                type="text"
                                name=""
                                required
                                onChange={(e) => {
                                    // verifyInput(e);
                                    e.target.classList.toggle(`${styles.text}`);
                                    setLoginUsername(e.target.value);
                                }}
                            />
                            <label
                                className={styles.label}
                                htmlFor="username-login"
                            >
                                Username
                            </label>
                        </div>
                        <div
                            className={`${styles["label-input"]} login ${styles[loginHidden]}`}
                        >
                            <input
                                className={styles.input}
                                id="password-login"
                                type="password"
                                name=""
                                required
                                onChange={(e) => {
                                    // verifyInput(e);
                                    e.target.classList.toggle(`${styles.text}`);
                                    setLoginPassword(e.target.value);
                                }}
                            />
                            <label
                                className={styles.label}
                                htmlFor="password-login"
                            >
                                Password
                            </label>
                        </div>
                        <div
                            className={`${styles["label-input"]} recover ${styles[recoverHidden]} ${recoverSuccess ? styles.hidden : ""}`}
                        >
                            <p>Enter your registered email address below and we'll send you a link to reset your password.</p>
                        </div>
                        <div
                            className={`${styles["label-input"]} recover ${styles[recoverHidden]} ${recoverSuccess ? styles.hidden : ""}`}
                        >
                            <input
                                className={styles.input}
                                id="email-recover"
                                type="text"
                                name=""
                                required
                                onChange={(e) => {
                                    e.target.classList.toggle(`${styles.text}`);
                                    setRecoverEmail(e.target.value)
                                }}
                            />
                            <label
                                className={styles.label}
                                htmlFor="email-recover"
                            >
                                Email
                            </label>
                        </div>
                        <div
                            className={`${styles["label-input"]} change ${styles[changePasswordHidden]} ${changeSuccess ? styles.hidden : ""}`}
                        >
                            <input
                                className={styles.input}
                                id="password-change"
                                type="password"
                                name=""
                                required
                                onChange={(e) => {
                                    e.target.classList.toggle(`${styles.text}`);
                                    setChangePasswordPassword(e.target.value);
                                }}
                            />
                            <label
                                className={styles.label}
                                htmlFor="password-change"
                            >
                                Password
                            </label>
                        </div>
                        <div
                            className={`${styles["label-input"]} change ${styles[changePasswordHidden]} ${changeSuccess ? styles.hidden : ""}`}
                        >
                            <input
                                className={styles.input}
                                id="password-confirm-change"
                                type="password"
                                name=""
                                required
                                onChange={(e) => {
                                    e.target.classList.toggle(`${styles.text}`);
                                    setChangePasswordConfirm(e.target.value);
                                }}
                            />
                            <label
                                className={styles.label}
                                htmlFor="password-confirm-change"
                            >
                                Confirm password
                            </label>
                        </div>
                    </div>
                    <p
                        className={`${styles["password-message"]} login ${styles[loginHidden]}`}
                    >
                        Forgot your password?{" "}
                        <a onClick={() => setScreenState("Recover")} className={styles.link}>Recover account</a>
                    </p>
                </div>
                <div className={styles["button-div"]}>
                    <button
                        className={`${styles.button} login ${styles[loginHidden]}`}
                        type="button"
                        onClick={() => {loginFunction(loginUsername, loginPassword)}}
                    >
                        {screenState}
                    </button>
                    <button
                        className={`${styles.button} register ${styles[registerHidden]}`}
                        type="button"
                        onClick={() => { registerFunction(registerUsername, registerEmail, registerPassword, registerConfirmPassword); }}
                    >
                        {screenState}
                    </button>
                    <button
                        className={`${styles.button} register ${styles[recoverHidden]} ${recoverSuccess ? styles.hidden : ""}`}
                        type="button"
                        onClick={() => { recoverFunction(recoverEmail) }}
                    >
                        {screenState}
                    </button>
                    <button
                        className={`${styles.button} change ${styles[changePasswordHidden]} ${changeSuccess ? styles.hidden : ""}`}
                        type="button"
                        onClick={() => { changeFunction(changePasswordPassword, changePasswordConfirm) }}
                    >
                        {screenState}
                    </button>
                    <p
                        className={`${styles["register-message"]} login ${styles[loginHidden]}`}
                    >
                        New here?{" "}
                        <a className={styles.link} onClick={() => {setScreenState("Sign Up")}}>
                            Create an account
                        </a>
                    </p>
                    <p
                        className={`${styles["register-message"]} register ${styles[registerHidden]}`}
                    >
                        Already have an account?{" "}
                        <a className={styles.link} onClick={() => {setScreenState("Sign In")}}>
                            Sign In
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
};
export default signinup;
