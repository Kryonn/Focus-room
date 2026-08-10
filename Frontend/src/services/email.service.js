import { apiFetch } from "./api.js"

export const EmailService = {
    async postRequest(email, activateToken) {
        const url = "/email";

        return apiFetch(url, {
            method: "POST",
            body: {
                email: email,
                activateToken: activateToken
            }
        });
    },

    async postActivateRequest(activateToken) {
        const url = "/email/activate";

        return apiFetch(url, {
            method: "POST",
            body: {
                activateToken: activateToken
            }
        })
    }
}