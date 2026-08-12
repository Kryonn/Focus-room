// CSS
import "./App.css";

// React
import { useState, useEffect, useRef } from "react";

// Components
import Sidebar from "./components/sidebar/sidebar.jsx";
import Content from "./components/content/content.jsx";
import Auth from "./components/auth/auth.jsx";
import Activate from "./components/auth/activate.jsx";

// Services
import { GridService } from "./services/grid.service.js";
import { AuthService } from "./services/auth.service.js";

import { setSetAccessToken, setSetScreen, setToken } from "./services/api.js";

async function initFunction(setUsername, setAccessToken, setScreen) {
    const postResponse = await AuthService.refreshPostRequest();

    if(!postResponse.error) {
        setUsername(postResponse.data.username);
        setAccessToken(postResponse.data.accessToken);
        setToken(postResponse.data.accessToken)
        setScreen("app");
    } else {
        setScreen("auth");
    }
}

function App() {
    // States
    const [screen, setScreen] = useState("init");
    const [username, setUsername] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [gridState, setGridState] = useState(0);
    const [activateToken, setActivateToken] = useState("");
    const [activateEmail, setActivateEmail] = useState("");
    const [recover, setRecover] = useState(false);
        
    // Refs
    const listGridInstance = useRef([]);
    const listGridRef = useRef([]);
    const listGridPosition = useRef([]);
    const [listGridParameter, setListGridParameter] = useState([]);
    const initialized = useRef(false);

    useEffect(() => {
        if(initialized.current) {
            return;
        }
        initialized.current = true;

        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get("token");
        const actionFromUrl = urlParams.get("action");
        const emailFromUrl = urlParams.get("email");
        console.log("URL:", window.location.href);
        console.log("SEARCH:", window.location.search);
        console.log("PARAMS:", Object.fromEntries(urlParams.entries()));
        console.log("ACTION:", actionFromUrl);
        console.log("TOKEN:", tokenFromUrl);
        console.log("EMAIL:", emailFromUrl);

        if(tokenFromUrl) {
            setActivateToken(tokenFromUrl);
            setActivateEmail(emailFromUrl);
            // setAction(actionFromUrl);
            if(actionFromUrl === "activate") {
                setScreen("activate");
            } else {
                setScreen("auth");
                setRecover(true);
            }
            return;
        }

        setSetScreen(setScreen);
        setSetAccessToken(setAccessToken);
        initFunction(setUsername, setAccessToken, setScreen);
    }, []);

    useEffect(() => {
        if(screen !== "app" || !accessToken) {
            return;
        }

        GridService.getRequest(accessToken).then((res) => {
            const list = res.data;
            const parameterList = list.map((listElement, index) => ({
                name: listElement.name,
                static: listElement.static,
                index: listElement.name
            }));

            setListGridParameter(parameterList);
        });
    }, [screen, accessToken]);

    if (screen === "activate") {
        console.log("activateToken: ", activateToken);
        return <Activate setScreen={setScreen} activateToken={activateToken} activateEmail={activateEmail}/>      
    }

    // Auth 
    if (screen === "auth") {
        return <Auth email={activateEmail} recover={recover} recoverToken={activateToken} setScreen={setScreen} setAccessToken={setAccessToken} setUsername={setUsername}/>;
    }

    // App
    if (screen === "app") {
        return (
            <div className="main">
                {listGridParameter && (
                    <Sidebar
                        setScreen={setScreen}
                        accessToken={accessToken}
                        setGridState={setGridState}
                        gridState={gridState}
                        listGridParameter={listGridParameter}
                        setListGridParameter={setListGridParameter}
                    />
                )}
                {listGridParameter && (
                    <Content
                        accessToken={accessToken}
                        gridState={gridState}
                        setGridState={setGridState}
                        listGridParameter={listGridParameter}
                        setListGridParameter={setListGridParameter}
                        listGridInstance={listGridInstance}
                        listGridRef={listGridRef}
                        listGridPosition={listGridPosition}
                    />
                )}
            </div>
        );
    }

    return <div className="main"></div>;
}

export default App;
