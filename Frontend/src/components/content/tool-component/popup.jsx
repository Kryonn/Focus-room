// CSS
import styles from "./popup.module.css"

// React
import { useRef } from "react";

const popup = ({ popupTitle, setPopupState, labelList, inputTypeList, setList, buttonFunction, buttonFunctionParameter}) => {
    // Refs
    const inputListRef = useRef([]);   

    // Change the popup state, set input values and run parameter function when send button is clicked
    const sendButton = async () => {
        // Toggle popup state
        setPopupState((prev) => !prev);

        const values = inputListRef.current.map((input) => input.value);

        // Set input values
        if(setList) {
            setList.forEach((setFunction, index) => {
                setFunction(values[index]);
            })
        }

        // Run parameter function
        buttonFunction(
            ...values,
            ...buttonFunctionParameter
        );
    }

    return (
        <div onClick={(e) => { if(e.target === e.currentTarget) { setPopupState(prev => !prev) } }} className={styles.main}>
            <div className={styles["content-div"]}>
                <form className={styles.form} action="">
                    <p className={styles.title}>{popupTitle}</p>
                    {
                        labelList.map((element, index) => 
                            <div className={styles["input-div"]}>
                                <label
                                    className={styles["input-label"]}
                                    htmlFor=""
                                >
                                    {element}
                                </label>
                                <input ref={(ref) => inputListRef.current[index] = ref}
                                    className={styles["input"]}
                                    type={inputTypeList[index]}
                                />
                            </div>
                        )
                    }
                    
                    <button
                        onClick={() => { sendButton() }}
                        className={styles.button}
                        type="button"
                    >
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
}

export default popup