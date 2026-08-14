import styles from "./form.module.css"
import { useEffect, useState } from "react";

const form = ({ formTitle, inputList, setInputList, labelList, labelTypeList, buttonFunction, buttonText, formType, setAuthState }) => {

    return (
        <div className={styles.main}>
            <form className={styles.form} action="">
                <h1 className={`${styles.title}`}>{formTitle}</h1>
                <div className={styles["input-div"]}>
                    <div className={styles["label-input-div"]}>
                        {
                            labelList && labelList.map((label, index) => (
                                <div
                                    className={`${styles["label-input"]}`}
                                >
                                    <input
                                        className={`${styles.input} ${ inputList[index] ? styles.text : "" }`}
                                        id={label}
                                        type={labelTypeList[index]}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setInputList(prev => {
                                                const nextList = [...prev];
                                                nextList[index] = val;
                                                return nextList;
                                            });
                                        }}
                                    />
                                    <label className={styles.label}>
                                        {label}
                                    </label>
                                </div>
                            ))
                        }
                    </div>
                    {
                        formType === "Login" && (
                            <p
                                className={`${styles["recover-message"]}`}
                            >
                                Forgot your password?{" "}
                                <a onClick={() => { setAuthState("Recover"); }} className={styles.link}>Recover account</a>
                            </p>
                        )
                    }
                </div>
                <div className={styles["button-div"]}>
                    <button
                        className={`${styles.button}`}
                        type="button"
                        onClick={buttonFunction}
                    >
                        {buttonText}
                    </button>
                    {
                        formType === "Login" && (
                            <p
                                className={`${styles["bottom-message"]}`}
                            >
                                New here?{" "}
                                <a className={styles.link} onClick={() => { setAuthState("Register"); }}>
                                    Create an account
                                </a>
                            </p>
                        )
                    }
                    {
                        formType === "Register" && (
                            <p
                                className={`${styles["bottom-message"]}`}
                            >
                                Already have an account?{" "}
                                <a className={styles.link} onClick={() => { setAuthState("Sign In"); }}>
                                    Sign In
                                </a>
                            </p>
                        )
                    }
                </div>
            </form>
        </div>
    );
}

export default form