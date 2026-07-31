// CSS
import "./App.css";

// React
import { useState, useEffect, useRef } from "react";

// Components
import Sidebar from "./components/sidebar/sidebar.jsx";
import Content from "./components/content/content.jsx";
import Auth from "./components/auth/auth.jsx";

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
        // setAccessToken(postResponse.data.accessToken);
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

    // Auth 
    if (screen === "auth") {
        return <Auth setScreen={setScreen} setAccessToken={setAccessToken} setUsername={setUsername}/>;
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
