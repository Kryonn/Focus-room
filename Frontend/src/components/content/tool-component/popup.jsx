import styles from "./popup.module.css"
import { useRef, useState } from "react";

const popup = ({ popupTitle, setPopupState, labelList, inputTypeList, setList, buttonFunction, buttonFunctionParameter}) => {
    
    const taskNameRef = useRef([]); 
    const inputListRef = useRef([]);   
    const [listParameter, setListParameter] = useState([]);


    const sendButton = async () => {
        setPopupState((prev) => !prev);

        const values = inputListRef.current.map((input) => input.value);

        if(setList) {
            setList.forEach((setFunction, index) => {
                setFunction(values[index]);
            })
        }

        console.log(values);
        

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