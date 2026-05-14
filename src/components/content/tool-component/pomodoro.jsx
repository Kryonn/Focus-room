import styles from "./pomodoro.module.css"
import { useState, useEffect, useRef } from "react";
import { POMODORO_PATH } from "../../../assets/svg-path";

const pomodoro = () => {
  const [time, setTime] = useState(360000);
  const [running, setRunning] = useState(false);
  const [sound, setSound] = useState(true);
  const [work, setWork] = useState("work");
  const [playPath, setPlayPath] = useState(POMODORO_PATH.play);
  const [mutedPath, setMutedPath] = useState(POMODORO_PATH.unmuted);
  const mainRef = useRef(null);
  const [layoutMode, setLayoutMode] = useState("small");

  function pausePlay() {
    if(!running) {
      setRunning(true);
      setPlayPath(POMODORO_PATH.pause);
      return;
    }

    setRunning(false);
    setPlayPath(POMODORO_PATH.play);
  }

  function unmutedMuted() {
    if(!sound) {
      setSound(true);
      setMutedPath(POMODORO_PATH.unmuted);
      return;
    }

    setSound(false);
    setMutedPath(POMODORO_PATH.muted);
  }

  useEffect(() => {
    if(!running) {
      return;
    }

    const interval = setInterval(() => {
      setTime(t => t - 1);
    }, 10);

    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      const { width, height} = entry.contentRect;
      const widget = entry.target.closest(".grid-stack-item");
      const cellWidth = widget.getAttribute("gs-w");
      const cellHeight = widget.getAttribute("gs-h");
      let mode = "";
      console.log(cellHeight);
      console.log(cellWidth);

      mode = "big";

      if(cellHeight == null) {
        // setLayoutMode("wide");
        // console.log("wide");
        // return;
        mode = "wide";
      } 

      if(cellWidth == null) {
        // setLayoutMode("tall");
        // console.log("tall");
        // return;
        mode = "tall";
      } 

      if(cellWidth == null && cellHeight == null) {
        // setLayoutMode("small");
        // console.log("small");
        // return;
        mode = "small";
      } 

      console.log(mode);
      setLayoutMode(mode);
    })

    resizeObserver.observe(mainRef.current);
  }, []);
  
  return (
    <div ref={mainRef} className={`${styles.main} ${styles[layoutMode]}`}>
        <div className={styles.timeDiv}>
            <p>{String(Math.floor(time / 360000)).padStart(2, "0")}</p>
            <p className={styles.doubleDot}>:</p>
            <p>{String(Math.floor((time % 360000) / 6000)).padStart(2, "0")}</p>
            <p className={styles.doubleDot}>:</p>
            <p>{String(Math.floor((time % 360000) % 6000)).slice(0, 2).padStart(2, "0")}</p>
        </div>
        <div className={styles.buttonDiv}>
            <button className={styles.button}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 128C263.2 128 212.1 152.7 176.9 192L224 192C241.7 192 256 206.3 256 224C256 241.7 241.7 256 224 256L96 256C78.3 256 64 241.7 64 224L64 96C64 78.3 78.3 64 96 64C113.7 64 128 78.3 128 96L128 150.7C174.9 97.6 243.5 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C233 576 156.1 532.6 109.9 466.3C99.8 451.8 103.3 431.9 117.8 421.7C132.3 411.5 152.2 415.1 162.4 429.6C197.2 479.4 254.8 511.9 320 511.9C426 511.9 512 425.9 512 319.9C512 213.9 426 128 320 128z"/></svg></button>
            <button onClick={pausePlay} className={`${styles.button} play-button`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path className="play-path" d={playPath}/></svg></button>
            <button onClick={unmutedMuted} className={styles.button}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path className="sound-path" d={mutedPath}/></svg></button>
            <button className={`${styles.button} ${styles.settings}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path className="sound-path" d={mutedPath}/></svg></button>
        </div>    
    </div>
  )
}
export default pomodoro