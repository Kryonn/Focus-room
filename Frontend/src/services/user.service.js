import { apiFetch } from "./api";

export const UserService = {
    async putRequest(email, password) {
        const url = "/email/change/password"
        
        return await apiFetch(url, {
            method: "PUT",
            body: {
                email: email,
                password: password
            }
        })
    }

}