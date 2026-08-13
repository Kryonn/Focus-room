import styles from "./auth.module.css";
import Signinup from "./signinup.jsx";
import cachorroJoinha from "../../assets/cachorro-joinha.jpg";
import pomodoroImg from "../../assets/pomodoro.png";
import { useRef, useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import Warningpopup from "./warningpopup.jsx";
import { AuthService } from "../../services/auth.service.js";
import { EmailService } from "../../services/email.service.js";
import { motion, AnimatePresence } from "framer-motion" 
import { UserService } from "../../services/user.service.js";
import Form from "./form.jsx";
import Message from "./message.jsx";

const SCENE_URL = `https://prod.spline.design/H9q8WTUpX4ZTzm35/scene.splinecode?v=${import.meta.env.VITE_SPLINE_VERSION}`;

const auth = ({ setScreen, setAccessToken, setUsername, initAuthState }) => {
    const [recoverWarning, setRecoverWarning] = useState(false);
    const [recoverWarningMessage, setRecoverMessage] = useState("");
    const [changeWarning, setChangeWarning] = useState(false);
    const [changeWarningMessage, setChangeMessage] = useState("");
    const [loginWarning, setLoginWarning] = useState(false);
    const [loginWarningMessage, setLoginMessage] = useState("");
    const [registerWarning, setRegisterWarning] = useState(false);
    const [registerWarningMessage, setRegisterMessage] = useState("");
    const [authState, setAuthState] = useState(initAuthState);
    const [inputList, setInputList] = useState([]);
    const splineRef = useRef(null);
    const [email, setEmail] = useState("");

    const [formTitle, setFormTitle] = useState("");
    const [labelList, setLabelList] = useState([]);
    const [labelTypeList, setLabelTypeList] = useState([]);
    const [buttonFunction, setButtonFunction] = useState(null);
    const [buttonText, setButtonText] = useState("");

    const getSplineRef = (spline) => {
        splineRef.current = spline;
    };

    useEffect(() => {
        return () => {
            if (splineRef.current) {
                splineRef.current.dispose();
                splineRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        switch(authState) {
            case "Login":
                setFormTitle("Log In");
                setLabelList(["Username", "Password"]);
                setLabelTypeList(["text", "password"]);
                setButtonText("Log In");
                break;
            
            case "Register":
                setFormTitle("Sign Up");
                setLabelList(["Email", "Username", "Password", "Confirm password"]);
                setLabelTypeList(["text", "text", "password", "password"]);
                setButtonText("Sign Up");
                break;

            case "Recover":
                setFormTitle("Recover Account");
                setLabelList(["Email"]);
                setLabelTypeList(["text"]);
                setButtonText("Send");
                break;

            case "Change":
                setFormTitle("Change Password");
                setLabelList(["Password", "Confirm password"]);
                setLabelTypeList(["password", "password"]);
                setButtonText("Change");
                break;
        }
        setInputList([]);
    }, [authState]);

    const loginFunction = async (inputList) => {
        if(!inputList) {
            return;
        }
        const username = inputList[0];
        const password = inputList[1];

        if(!username || !password) {
            if(!username) {
                setLoginMessage("Username is required");
            }

            if(!password) {
                setLoginMessage("Password is required");
            }   

            if(!username && !password) {
                setLoginMessage("Username and password are required");
            }
        
            setLoginWarning(true);
            return;
        }

        const res = await AuthService.loginPostRequest(username, password);

        if(!res.error) {
            const data = res.data;

            setUsername(data.username);
            setAccessToken(data.accessToken);
            setScreen("app");
        } else {
            setLoginMessage("Invalid username or password");
            setLoginWarning(true);
        }
    }

    const registerFunction = async (inputList) => {
        if(!inputList) {
            return;
        }
        // console.log(inputList);
        const email = inputList[0];
        const username = inputList[1];
        const password = inputList[2];
        const passwordConfirm = inputList[3];

        if(!email || !username || !password) {
            setRegisterMessage("All inputs are required");
            setRegisterWarning(true);
            return;
        }
        
        if(password !== passwordConfirm) {
            setRegisterMessage("Matching passwords required");
            setRegisterWarning(true);
            return;
        }

        const res = await AuthService.registerPostRequest(username, email, password);

        if(!res.error) {
            setEmail(email);
            setAuthState("Success Register");
        } else {
            setRegisterMessage("The register is failed");
            setRegisterWarning(true);
        }
    }

    const recoverFunction = async (inputList) => {
        const email = inputList[0];

        if(!email) {
                setRecoverMessage("All inputs are required");
                setRecoverWarning(true);
                return;
        }

        const res = await EmailService.postRecoverEmailRequest(email);

        if(!res.error) {
            setAuthState("Success Recover");
        } else {
            setRecoverMessage("The recover is failed");
            setRecoverWarning(true);
        }
    }

    const changeFunction = async (inputList) => {
        const password = inputList[0];
        const passwordConfirm = inputList[1];

        if(!password || !passwordConfirm) {
            setChangeMessage("All inputs are required");
            setChangeWarning(true);
            return;
        }
        
        if(password !== passwordConfirm) {
            setChangeMessage("Matching passwords required");
            setChangeWarning(true);
            return;
        }

        const res = await UserService.putRequest(email, password);

        if(!res.error) {
            setAuthState("Success Change");
        } else {
            setRecoverMessage("The change is failed");
            setRecoverWarning(true);
        }
    }

    return (
        <div className={styles.main}>
            <Spline
                scene={SCENE_URL}
                onLoad={getSplineRef}
                className={styles.spline}
                />
            <div className={styles.content}>
                <AnimatePresence>
                    {
                        loginWarning && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}    
                                exit={{ opacity: 0, y: 10 }}    
                            >
                                <Warningpopup setWarningPopupState={setLoginWarning} warningPopupMessage={loginWarningMessage}/>
                            </motion.div>
                        )
                    }
                    {
                        registerWarning && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}    
                                exit={{ opacity: 0, y: 10 }}    
                            >
                                <Warningpopup setWarningPopupState={setRegisterWarning} warningPopupMessage={registerWarningMessage}/>
                            </motion.div>
                        )
                    }
                    {
                        recoverWarning && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}    
                                exit={{ opacity: 0, y: 10 }}    
                            >
                                <Warningpopup setWarningPopupState={setRecoverWarning} warningPopupMessage={recoverWarningMessage}/>
                            </motion.div>
                        )
                    }
                    {
                        changeWarning && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}    
                                exit={{ opacity: 0, y: 10 }}    
                            >
                                <Warningpopup setWarningPopupState={setChangeWarning} warningPopupMessage={changeWarningMessage}/>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
                {
                    authState === "Login" && (
                        <Form
                            formTitle={formTitle}
                            setInputList={setInputList}
                            labelList={labelList}
                            labelTypeList={labelTypeList}
                            buttonFunction={() => loginFunction(inputList)}
                            buttonText={buttonText}
                            formType={"Login"}
                            setAuthState={setAuthState}
                        />
                    )
                }
                {
                    authState === "Register" && (
                        <Form
                            formTitle={formTitle}
                            setInputList={setInputList}
                            labelList={labelList}
                            labelTypeList={labelTypeList}
                            buttonFunction={() => registerFunction(inputList)}
                            buttonText={buttonText}
                            formType={"Register"}
                            setAuthState={setAuthState}
                        />
                    )
                }
                {
                    authState === "Recover" && (
                        <Form
                            formTitle={formTitle}
                            setInputList={setInputList}
                            labelList={labelList}
                            labelTypeList={labelTypeList}
                            buttonFunction={() => recoverFunction(inputList)}
                            buttonText={buttonText}
                            formType={"Recover"}
                            setAuthState={setAuthState}
                        />
                    )
                }
                {
                    authState === "Change" && (
                        <Form
                            formTitle={formTitle}
                            setInputList={setInputList}
                            labelList={labelList}
                            labelTypeList={labelTypeList}
                            buttonFunction={() => changeFunction(inputList)}
                            buttonText={buttonText}
                            formType={"Change"}
                            setAuthState={setAuthState}
                        />
                    )
                }
                {
                    authState === "Success Register" && (
                        <div className={styles["message-div"]}>
                            <p className={styles.title}>Almost there!</p>
                            <div className={styles["message-content"]}>
                                <p className={styles["message-text"]} >We sent a verification link to </p>
                                <p className={styles["message-center-text"]}>{email}</p>
                                <p className={styles["message-text"]}>Just click the link in that email to confirm your account and get started.</p>
                            </div>
                            <p className={styles["message-footer"]}>Can't find the email? Check your <span className={styles.bold}>spam folder</span>.</p>
                        </div>
                    )
                }
                {
                    authState === "Success Activate" && (
                        <div className={styles["message-div"]}>
                            <p className={styles.title}>Account activated!</p>
                            <div className={styles["message-content"]}>
                                <p className={styles["message-text"]}>Your email has been successfully verified.</p>
                                <svg className={styles["message-icon"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320C528 205.1 434.9 112 320 112zM390.7 233.9C398.5 223.2 413.5 220.8 424.2 228.6C434.9 236.4 437.3 251.4 429.5 262.1L307.4 430.1C303.3 435.8 296.9 439.4 289.9 439.9C282.9 440.4 276 437.9 271.1 433L215.2 377.1C205.8 367.7 205.8 352.5 215.2 343.2C224.6 333.9 239.8 333.8 249.1 343.2L285.1 379.2L390.7 234z"/>
                                </svg>
                                <p className={styles["message-text"]}>Your account is now active and ready to go. You can log in and start using the app right away!</p>
                            </div>
                            <button onClick={() => { setAuthState("Login"); } } className={styles.button}>Back to Login</button>
                        </div>
                    )
                }
                {
                    authState === "Success Recover" && (
                        <div className={styles["message-div"]}>
                            <p className={styles.title}>Check your inbox!</p>
                            <div className={styles["message-content"]}>
                                <p className={styles["message-text"]}>We sent a password reset link to your email.</p>
                                <svg className={styles["message-icon"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320C528 205.1 434.9 112 320 112zM390.7 233.9C398.5 223.2 413.5 220.8 424.2 228.6C434.9 236.4 437.3 251.4 429.5 262.1L307.4 430.1C303.3 435.8 296.9 439.4 289.9 439.9C282.9 440.4 276 437.9 271.1 433L215.2 377.1C205.8 367.7 205.8 352.5 215.2 343.2C224.6 333.9 239.8 333.8 249.1 343.2L285.1 379.2L390.7 234z"/>
                                </svg>
                                <p className={styles["message-text"]}>Click the link in that email to set a new password for your account.</p>
                            </div>
                            <button onClick={() => { setAuthState("Login"); } } className={styles.button}>Back to Login</button>
                        </div>
                    )
                }
                {
                    authState === "Success Change" && (
                        <div className={styles["message-div"]}>
                            <p className={styles.title}>Password updated!</p>
                            <div className={styles["message-content"]}>
                                <p className={styles["message-text"]}>Your password has been successfully changed.</p>
                                <svg className={styles["message-icon"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320C528 205.1 434.9 112 320 112zM390.7 233.9C398.5 223.2 413.5 220.8 424.2 228.6C434.9 236.4 437.3 251.4 429.5 262.1L307.4 430.1C303.3 435.8 296.9 439.4 289.9 439.9C282.9 440.4 276 437.9 271.1 433L215.2 377.1C205.8 367.7 205.8 352.5 215.2 343.2C224.6 333.9 239.8 333.8 249.1 343.2L285.1 379.2L390.7 234z"/>
                                </svg>
                                <p className={styles["message-text"]}>You can now log in to your account with your new credentials.</p>
                            </div>
                            <button onClick={() => { setAuthState("Login"); } } className={styles.button}>Back to Login</button>
                        </div>
                    )
                }
                {
                    authState === "Fail" && (
                        <div className={styles["message-div"]}>
                            <p className={styles.title}>Something failed!</p>
                            <div className={styles["message-content"]}>
                                <p className={styles["message-text"]}>An unexpected error occurred while processing your request.</p>
                                <svg className={styles["message-icon"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path d="M320 112C434.9 112 528 205.1 528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112zM320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C221.6 240.4 221.6 255.6 231 264.9L286 319.9L231 374.9C221.6 384.3 221.6 399.5 231 408.8C240.4 418.1 255.6 418.2 264.9 408.8L319.9 353.8L374.9 408.8C384.3 418.2 399.5 418.2 408.8 408.8C418.1 399.4 418.2 384.2 408.8 374.9L353.8 319.9L408.8 264.9C418.2 255.5 418.2 240.3 408.8 231C399.4 221.7 384.2 221.6 374.9 231L319.9 286L264.9 231C255.5 221.6 240.3 221.6 231 231z"/>
                                </svg>
                                <p className={styles["message-text"]}>Please try again in a few moments.</p>
                            </div>
                            <button onClick={() => { setAuthState("Login"); } } className={styles.button}>Back to Login</button>
                        </div>
                    )
                }
            </div>
        </div>
    );
};
export default auth;
