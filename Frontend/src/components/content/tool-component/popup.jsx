import styles from "./popup.module.css"
import { useRef, useState } from "react";

const popup = ({ popupTitle, setPopupState, labelList, buttonFunctions, gridParameter, gridInstance, gridRef }) => {
    
    const taskNameRef = useRef([]); 
    const inputListRef = useRef([]);   
    const [listParameter, setListParameter] = useState([]);
    console.log("gridRef: ", gridRef);


    const buttonFunction = async () => {
        setPopupState((prev) => !prev);

        const values = inputListRef.current.map((input) => input.value);

        console.log(values);
        setWidget(
            values,
            gridParameter,
            gridInstance.current[gridParameter.index],
            gridRef.current[gridParameter.index],
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
                                    type=""
                                />
                            </div>
                        )
                    }
                    
                    <button
                        onClick={() => { buttonFunction() }}
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