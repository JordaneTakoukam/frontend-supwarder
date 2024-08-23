import axios from "axios";
import { config } from "../../_config/static_keys";
import { storeTokenInLocalStorage } from "../../middleware/middleware";

const api = `${config.backend_url}/api/auth`;

export async function apiRegister({ email, password }) {
    try {
        const response = await axios.post(
            `${api}/register`,
            { email, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        const data = response.data;

        if (data.token) {
            storeTokenInLocalStorage(data.token);
            return { success: true, message: "Inscription réuissie" };
        } else {
            return { success: false, message: "Aucun token reçu" };
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                return { success: false, message: error.response.data.message || "Erreur serveur" };
            } else if (error.request) {
                return { success: false, message: "Pas de réponse du serveur" };
            } else {
                return { success: false, message: error.message };
            }
        } else {
            return { success: false, message: "Erreur inattendue" };
        }
    }
}
