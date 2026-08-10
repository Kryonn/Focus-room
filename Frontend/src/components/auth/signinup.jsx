import styles from "./signinup.module.css";
import { AuthService } from "../../services/auth.service";
import { EmailService } from "../../services/email.service";
import { useState, useEffect } from "react";
import { setToken } from "../../services/api";

const signinup = ({ setScreen, setAccessToken, setUsername, setLoginWarning, setLoginMessage, setRegisterWarning, setRegisterMessage }) => {
    const [screenState, setScreenState] = useState("Sign In");
    const [loginHidden, setLoginHidden] = useState("");
    const [registerHidden, setRegisterHidden] = useState("hidden");
    const [emailHidden, setEmailHidden] = useState("hidden");

    const [registerUsername, setRegisterUsername] = useState(null);
    const [registerEmail, setRegisterEmail] = useState(null);
    const [registerPassword, setRegisterPassword] = useState(null);
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState(null);
    const [loginUsername, setLoginUsername] = useState(null);
    const [loginPassword, setLoginPassword] = useState(null);

    useEffect(() => {
        if (screenState === "Sign In") {
            setRegisterHidden("hidden");
            setLoginHidden("");
            setEmailHidden("hidden");
        } else {
            if(screenState === "Sign Up") {
                setRegisterHidden("");
                setLoginHidden("hidden");
                setEmailHidden("hidden");
            } else {
                setRegisterHidden("hidden");
                setLoginHidden("hidden");
                setEmailHidden("");
            }
        }
    }, [screenState]);

    const verifyInput = (event) => {
        if (!event.target.value) {
            if (event.target.classList.contains(`${styles.text}`)) {
                event.target.classList.toggle(`${styles.text}`);
            }
        } else {
            if (!event.target.classList.contains(`${styles.text}`)) {
                event.target.classList.toggle(`${styles.text}`);
            }
        }
    };

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

        console.log("resLogin", res);

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
                        <div
                            className={`${styles["label-input"]} register ${styles[registerHidden]}`}
                        >
                            <input
                                className={styles.input}
                                id="email"
                                type="email"
                                name=""
                                onChange={(e) => {
                                    verifyInput(e);
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
                                    verifyInput(e);
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
                                    verifyInput(e);
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
                                    verifyInput(e);
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
                                    verifyInput(e);
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
                                    verifyInput(e);
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
                    </div>
                    <p
                        className={`${styles["password-message"]} login ${styles[loginHidden]}`}
                    >
                        Forgot your password?{" "}
                        <a className={styles.link}>Recover account</a>
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
