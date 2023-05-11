import axios from 'axios';
import {authApi, getAuthHeader} from './auth';


export const updateString = async (key, text) => {
    const response = await authApi.patch(`strings/${key}`, {value: text}, {headers: getAuthHeader()});
    return response.data;
};

export const fetchAllStrings = async () => {
    const response = await authApi.get('strings');
    return response.data;
};