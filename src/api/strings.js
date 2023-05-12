import axios from 'axios';
import {authApi, getAuthHeader} from './auth';


export const updateString = async (key, text) => {
    try {
    const response = await authApi.patch(`strings/${key}`, {value: text}, {headers: getAuthHeader()});
    return response.data;
    } catch (error) {
        throw error
    }
};

export const fetchAllStrings = async () => {
    try {
    const response = await authApi.get('strings');
    return response.data;
    } catch (error) {
        throw error
    }
};