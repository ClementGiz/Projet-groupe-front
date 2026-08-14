import api from "./api";

export const createCours = async (cours) => {
    const response = await api.post(
        "//",
        cours
    );

    return response.data;
};
