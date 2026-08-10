import { apiFetch } from "./api.js"

export const EmailService = {
    async postRequest(email) {
        const url = "/email";

        return apiFetch(url, {
            method: "POST",
            body: {
                email: email
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