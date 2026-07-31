import styles from "./signinup.module.css";
import { AuthService } from "../../services/auth.service";
import { useState, useEffect } from "react";
import { setToken } from "../../services/api";

const signinup = ({ setScreen, setAccessToken, setUsername}) => {
    const [screenState, setScreenState] = useState("Sign In");
    const [loginHidden, setLoginHidden] = useState("");
    const [registerHidden, setRegisterHidden] = useState("hidden");

    const [usernameInput, setUsernameInput] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
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
                                    setEmail(e.target.value);
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
                                    setUsernameInput(e.target.value);
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
                                onChange={verifyInput}
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
                                    setPassword(e.target.value);
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
                        onClick={async () => {
                            const res = await AuthService.loginPostRequest(loginUsername, loginPassword);
                            const data = res.data;
                            if(!res.error) {
                                // setAccessToken(data.accessToken);
                                setUsername(data.username);
                                setToken(data.accessToken);
                                setScreen("app");
                            }
                            // console.log(res);
                            // setScreen("app");
                            // AuthService.
                        }}
                    >
                        {screenState}
                    </button>
                    <button
                        className={`${styles.button} register ${styles[registerHidden]}`}
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            console.log("O botão foi clicado");
                            AuthService.registerPostRequest(usernameInput, email, password);
                        }}
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
