import axios from 'axios';
import {authApi, getAuthHeader} from './auth';


export const addAlbum = async (model) => {
    const response = await authApi.post(`albums`, model, {headers: getAuthHeader()});
    return response.data;
};

export const updateAlbum = async (id, model) => {
    const response = await authApi.patch(`albums/${id}`, model, {headers: getAuthHeader()});
    return response.data;
};

export const deleteAlbum = async (id) => {
    const response = await authApi.delete(`albums/${id}`, {headers: getAuthHeader()});
    return response.data;
};

export const uploadAlbumFile = async (albumId, model) => {
    const response = await authApi.post(`albums/${albumId}/files`, model, {headers: getAuthHeader()});
    return response.data;
};

export const deleteAlbumFile = async (albumId, fileId) => {
    const response = await authApi.delete(`albums/${albumId}/files/${fileId}`, {headers: getAuthHeader()});
    return response.data;
};


export const fetchByIdAlbum = async (id) => {
    const response = await authApi.get(`albums/${id}`);
    return response.data;
};

export const fetchAllAlbums = async () => {
    const response = await authApi.get('albums');
    return response.data;
};