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
    },

    async postRecoverEmailRequest(email) {
        const url = "/email/recover";

        return apiFetch(url, {
            method: "POST",
            body: {
                email: email
            }
        });
    },

    async postRecoverRequest(recoverToken, email, password) {
        const url = "/email/verify/recover";

        console.log("recoverToken", recoverToken);
        console.log("email", email);
        console.log("password", password);

        return apiFetch(url, {
            method: "POST",
            body: {
                recoverToken: recoverToken,
                email: email,
                password: password
            }
        });
    }
}