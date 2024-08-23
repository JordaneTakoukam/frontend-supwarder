console.log("API URL:", process.env.REACT_APP_API_URL);

const backend_url = process.env.REACT_APP_API_URL || "non défini";

export const config = {
    backend_url: process.env.REACT_APP_API_URL,
    token: "token"
};
