const BASE_URL = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`

export async function apiFetch(enpoint, option = {}) {
    const url = `${BASE_URL}${enpoint}`;

    const headers = {
        "Content-Type": "application/json",
        ...option.headers
    }

    const res = await fetch(url, {
        ...option,
        headers
    })

    if(!res.ok) {
        throw new Error("Erro na requisição");
    }

    return res.json();
};