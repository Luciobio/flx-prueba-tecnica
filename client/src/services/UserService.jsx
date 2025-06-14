import axios from 'axios';

// Importando la URL de la API desde las variables de entorno
const API_URL = import.meta.env.VITE_API_URL;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const ML = 500;

export const getUsersPaginated = async ({ limit = 10, offset = 0, name = '', status = '' }) => {
    await delay(ML);
    const params = {
        _limit: limit,
        _start: offset
    };
    if (name) params.q = name;
    if (status) params.status = status;

    const response = await axios.get(API_URL, { params });
    return {
        data: response.data,
        total: parseInt(response.headers['x-total-count'], 10) || 0
    };
};

export const createUser = async (user) => {
    await delay(ML);
    const { data } = await axios.post(API_URL, user);
    return data;
};

export const updateUser = async (id, user) => {
    await delay(ML);
    const { data } = await axios.put(`${API_URL}/${id}`, user);
    return data;
};

export const deleteUser = async (id) => {
    await delay(ML);
    await axios.delete(`${API_URL}/${id}`);
};

// Validacion de duplicados al crear
export const isUserDuplicate = async (username, email) => {
    const { data: usersByName } = await axios.get(`${API_URL}?username=${username}`);
    const { data: usersByEmail } = await axios.get(`${API_URL}?email=${email}`);
    return {
        usernameExists: usersByName.length > 0,
        emailExists: usersByEmail.length > 0,
    };
};

// Validacion de duplicados al editar
export const isUserDuplicateOnEdit = async (id, username, email) => {
    const { data: usersByName } = await axios.get(`${API_URL}?username=${username}`);
    const { data: usersByEmail } = await axios.get(`${API_URL}?email=${email}`);

    const usernameExists = usersByName.some((user) => user.id !== id);
    const emailExists = usersByEmail.some((user) => user.id !== id);

    return { usernameExists, emailExists };
};