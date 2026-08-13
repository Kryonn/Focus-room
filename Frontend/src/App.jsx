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
import { EmailService } from "./services/email.service.js";

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
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
    const [recover, setRecover] = useState(false);
    const [initAuthState, setInitAuthState] = useState("");
        
    // Refs
    const listGridInstance = useRef([]);
    const listGridRef = useRef([]);
    const listGridPosition = useRef([]);
    const [listGridParameter, setListGridParameter] = useState([]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get("token");
        const actionFromUrl = urlParams.get("action");
        const emailFromUrl = urlParams.get("email");

        if(tokenFromUrl) {
            setToken(tokenFromUrl);
            setEmail(emailFromUrl);

            if(actionFromUrl === "activate") {
                EmailService.postActivateRequest(tokenFromUrl).then((res) => {
                    if(!res.error) {
                        setInitAuthState("Success Activate");
                    } else {
                        setInitAuthState("Fail");
                    }
                    setScreen("auth");
                })
            } else {
                EmailService.postRecoverRequest(tokenFromUrl).then((res) => {
                    if(!res.error) {
                        setInitAuthState("Change");
                    } else {
                        setInitAuthState("Fail");
                    }
                    setScreen("auth");
                });
            }

            return;
        }

        setInitAuthState("Login");
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
        return <Auth setScreen={setScreen} setAccessToken={setAccessToken} setUsername={setUsername} initAuthState={initAuthState}/>;
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
