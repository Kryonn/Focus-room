import styles from "./list.module.css";
import { useState, useRef, useEffect } from "react";

const list = () => {
    const [layoutMode, setLayoutMode] = useState(null);
    const mainRef = useRef(null);
    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0];
            const { width, height } = entry.contentRect;
            const widget = entry.target.closest(".grid-stack-item");
            const cellWidth = widget.getAttribute("gs-w");
            const cellHeight = widget.getAttribute("gs-h");
    
            let mode = "big";
    
            if(cellHeight == null) {
                mode = "wide";
            } 

            console.log(mode);
            setLayoutMode(mode);
    
        })
        resizeObserver.observe(mainRef.current);

    }, []);


  return (
    <div ref={mainRef} className={`${styles.main} ${styles[layoutMode]}`}>
        <div className={styles.title}>
            <p>Nome da Lista</p>
        </div>
        <nav className={styles.list}>
            <ul>
                <li>
                    <p>Lista 2 - probabilidade</p>
                    <div>
                        <button>
                            c
                        </button>
                        <button>
                            c
                        </button>
                    </div>
                </li>
                <li><button>asd</button></li>
                <li><button>asd</button></li>
                <li><button>asd</button></li>
                <li><button>asd</button></li>
                <li><button>asd</button></li>
            </ul>
        </nav>
    </div>
  )
}
export default list