import axios from 'axios';
import {serverApi, getAuthHeader} from './auth';


export const updateString = async (key, text) => {
    try {
    const response = await serverApi.patch(`strings/${key}`, {value: text}, {headers: getAuthHeader()});
    return response.data;
    } catch (error) {
        throw error
    }
};

export const fetchAllStrings = async () => {
    try {
    const response = await serverApi.get('strings');
    return response.data;
    } catch (error) {
        throw error
    }
};