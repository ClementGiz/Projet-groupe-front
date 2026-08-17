import api from "./api";

export const login = async (username, password) => {
    const response = await api.post(
        "/auth/login/",
        {
            username,
            password,
        }
    );

    localStorage.setItem("token", response.data.token);

    return response.data;
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const getCurrentUser = async () => {
    const token = getToken();

    if (!token) {
        return null;
    }

    try {
        const response = await api.get("/auth/me");

        return response.data;
    } catch (error) {
        logout();

        return null;
    }
};