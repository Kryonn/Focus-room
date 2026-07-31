import { apiFetch } from "./api";

export const AuthService = {
    async registerPostRequest(username, email, password) {
        const url = "/auth/register";

        return await apiFetch(url, {
            method: "POST",
            body: {
                username: username,
                email: email,
                password: password
            },
            credentials: "include"
        }) 
    },

    async loginPostRequest(username, password) {
        const url = "/auth/login";

        return await apiFetch(url, {
            method: "POST",
            body: {
                username: username,
                password: password
            },
            credentials: "include" 
        }) 
    },

    async refreshPostRequest() {
        const url = "/auth/refresh";

        return await apiFetch(url, {
            method: "POST",
            credentials: "include"
        })         
    },

    async logoutPostRequest(accessToken) {
        const url = "/auth/logout";

        return await apiFetch(url, {
            method: "POST",
            accessToken: accessToken,
            credentials: "include"
        })         
    },

}