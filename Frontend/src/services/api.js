const BASE_URL = `${import.meta.env.VITE_API_URL}`;

let setAccessTokenFunction = null;
let setScreenFunction = null;
let accessToken = null;

export function setSetAccessToken(newAccessTokenFunction) {
    setAccessTokenFunction = newAccessTokenFunction;
}

export function setToken(newAccessToken) {
    accessToken = newAccessToken;
    if(setAccessTokenFunction) setAccessTokenFunction(newAccessToken);
}

export function setSetScreen(newScreenFunction) {
    setScreenFunction = newScreenFunction;
}


export async function apiFetch(endpoint, option = {}) {
    const url = `${BASE_URL}${endpoint}`;

    const headers = {
        "Content-Type": "application/json",
        ...option.headers,
        ...(accessToken && { "Authorization": `Bearer ${accessToken}` })
    };

    const res = await fetch(url, {
        method: option.method || "GET",
        headers,
        ...(option.credentials && { credentials: option.credentials }),
        ...(option.body && { body: JSON.stringify(option.body) })
    });

    if(res.status === 401 && endpoint !== "/auth/refresh") {
        const refreshRes = await fetch(BASE_URL + "/auth/refresh", {
            method: "POST",
            credentials: "include"
        });

        if(!refreshRes.ok) {
            setScreenFunction("auth");
            return { error: true };
        }

        const refreshData = await refreshRes.json();

        const newAccessToken = refreshData.data.accessToken;

        setToken(newAccessToken);

        const newHeaders = {
            "Content-Type": "application/json",
            ...option.headers,
            "Authorization": `Bearer ${newAccessToken}`
        }

        const reres = await fetch(url, {
            method: option.method || "GET",
            headers: newHeaders,
            ...(option.credentials && { credentials: option.credentials }),
            ...(option.body && { body: JSON.stringify(option.body) })
        })
                
        return reres.json();
    };

    if((res.status === 401 || res.status === 403) && endpoint === "/auth/refresh") {
        setScreenFunction("auth");
        return { error: true };
    }

    return res.json();
}
