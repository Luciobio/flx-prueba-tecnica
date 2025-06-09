import axios from 'axios';

/* const API_URL = import.meta.env.API_URL; */
const API_URL = 'http://localhost:4000/users';

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