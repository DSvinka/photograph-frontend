import axios from 'axios';
import {serverApi, getAuthHeader} from './auth';


export const addAlbum = async (model) => {
    try {
    const response = await serverApi.post(`albums`, model, {headers: getAuthHeader()});
    return response.data;
} catch (error) {
    throw error
}
};

export const updateAlbum = async (id, model) => {
    try {
    const response = await serverApi.patch(`albums/${id}`, model, {headers: getAuthHeader()});
    return response.data;
} catch (error) {
    throw error
}
};

export const deleteAlbum = async (id) => {
    try {
    const response = await serverApi.delete(`albums/${id}`, {headers: getAuthHeader()});
    return response.data;
} catch (error) {
    throw error
}
};

export const uploadAlbumFile = async (albumId, model) => {
    try {
    const response = await serverApi.post(`albums/${albumId}/files`, model, {headers: getAuthHeader()});
    return response.data;
} catch (error) {
    throw error
}
};

export const deleteAlbumFile = async (albumId, fileId) => {
    try {
    const response = await serverApi.delete(`albums/${albumId}/files/${fileId}`, {headers: getAuthHeader()});
    return response.data;
} catch (error) {
    throw error
}
};


export const fetchByIdAlbum = async (id) => {
    try {
    const response = await serverApi.get(`albums/${id}`);
    return response.data;
} catch (error) {
    throw error
}
};

export const fetchAllAlbums = async () => {
    try {
    const response = await serverApi.get('albums');
    return response.data;
} catch (error) {
    throw error
}
};