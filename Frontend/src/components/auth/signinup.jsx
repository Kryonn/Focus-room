import styles from "./signinup.module.css";
import { AuthService } from "../../services/auth.service";
import { useState, useEffect } from "react";
import { setToken } from "../../services/api";

const signinup = ({ setScreen, setAccessToken, setUsername, setLoginWarning, setLoginMessage, setRegisterWarning, setRegisterMessage }) => {
    const [screenState, setScreenState] = useState("Sign In");
    const [loginHidden, setLoginHidden] = useState("");
    const [registerHidden, setRegisterHidden] = useState("hidden");

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
        } else {
            setRegisterHidden("");
            setLoginHidden("hidden");
        }
    }, [screenState]);

    const toggleState = (event) => {
        if (screenState === "Sign In") {
            setScreenState("Sign Up");
        } else {
            setScreenState("Sign In");
        }
    };

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
            setRegisterMessage("Success");
            setRegisterWarning(true);
        } else {
            setRegisterMessage("The register is failed");
            setRegisterWarning(true);
        }
    }

    return (
        <div className={styles.main}>
            <form className={styles.login} action="">
                <h1 className={styles.title}>{screenState}</h1>
                <div className={styles["input-div"]}>
                    <div className={styles["label-input-div"]}>
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
                        <a className={styles.link} onClick={toggleState}>
                            Create an account
                        </a>
                    </p>
                    <p
                        className={`${styles["register-message"]} register ${styles[registerHidden]}`}
                    >
                        Already have an account?{" "}
                        <a className={styles.link} onClick={toggleState}>
                            Sign In
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
};
export default signinup;
