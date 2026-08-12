import styles from "./auth.module.css";
import Signinup from "./signinup.jsx";
import cachorroJoinha from "../../assets/cachorro-joinha.jpg";
import pomodoroImg from "../../assets/pomodoro.png";
import { useRef, useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import Warningpopup from "./warningpopup.jsx";
import { motion, AnimatePresence } from "framer-motion" 

const SCENE_URL = `https://prod.spline.design/H9q8WTUpX4ZTzm35/scene.splinecode?v=${import.meta.env.VITE_SPLINE_VERSION}`;

const auth = ({ email, recover, recoverToken, setScreen, setAccessToken, setUsername }) => {
    const [recoverWarning, setRecoverWarning] = useState(false);
    const [recoverWarningMessage, setRecoverMessage] = useState("");
    const [changeWarning, setChangeWarning] = useState(false);
    const [changeWarningMessage, setChangeMessage] = useState("");
    const [loginWarning, setLoginWarning] = useState(false);
    const [loginWarningMessage, setLoginMessage] = useState("");
    const [registerWarning, setRegisterWarning] = useState(false);
    const [registerWarningMessage, setRegisterMessage] = useState("");
    const [authState, setAuthState] = useState(true);
    const splineRef = useRef(null);

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

    return (
        <div className={styles.main}>
            {/* <script type="module" src="https://unpkg.com/@splinetool/viewer@1.12.94/build/spline-viewer.js"></script> */}
            {/* <spline-viewer url="https://prod.spline.design/H9q8WTUpX4ZTzm35/scene.splinecode" onLoad={getSplineRef} className={styles.spline}></spline-viewer> */}
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
                    authState && (<Signinup className={styles.auth} email={email} recover={recover} recoverToken={recoverToken} setScreen={setScreen} setAccessToken={setAccessToken} setUsername={setUsername} setLoginWarning={setLoginWarning} setLoginMessage={setLoginMessage} setRegisterWarning={setRegisterWarning} setRegisterMessage={setRegisterMessage} setRecoverWarning={setRecoverWarning} setRecoverMessage={setRecoverMessage} setChangeWarning={setChangeWarning} setChangeMessage={setChangeMessage}/>)
                }
                
            </div>
        </div>
    );
};
export default auth;
