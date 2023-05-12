import axios from 'axios';
import {useAuthStore} from "@/stores/auth.js";

const BASE_URL = 'https://mirea.dsvinka.ru/api/';

export const authApi = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';

authApi.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const authStore = useAuthStore();

        const originalRequest = error.config;
        if (!error.response || !error.response.status)
            return Promise.reject(error);
        
        const status = error.response.status;
        if (status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refresh_token')
            let data = await refreshAccessToken(refreshToken);

            authStore.setAuthTokens(data.accessToken, data.refreshToken)

            return authApi(originalRequest);
        }
        return Promise.reject(error);
    }
);


export function getAuthHeader(opt_headers = {}) {
    const access_token = localStorage.getItem('access_token')
    const auth_header = {'Authorization': `Bearer ${access_token}`}

    return {...opt_headers, ...auth_header}
}

export function getRefreshAuthHeader(opt_headers = {}) {
    const refresh_token = localStorage.getItem('refresh_token')
    const auth_header = {'Authorization': `Bearer ${refresh_token}`}

    return {...opt_headers, ...auth_header}
}


export const loginUser = async (username, password) => {
    try {
        const response = await authApi.post('auth/login', {username: username, password: password});
        return response.data;
    } catch (error) {
        throw error
    }
};

export const getMe = async () => {
    try {
    const response = await authApi.get('auth/me', {headers: getAuthHeader()});
    return response.data;
} catch (error) {
    throw error
}
};

export const refreshAccessToken = async (refreshToken) => {
    try {
    const response = await authApi.post('auth/refresh', {refreshToken: refreshToken});
    return response.data;
} catch (error) {
    throw error
}
};