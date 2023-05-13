import axios from 'axios';
import {serverApi, getAuthHeader} from './auth';


export const addReview = async (model) => {
    try {
    const response = await serverApi.post(`reviews`, model, {headers: getAuthHeader()});
    return response.data;
} catch (error) {
    throw error
}
};

export const updateReview = async (id, model) => {
    try {
    const response = await serverApi.patch(`reviews/${id}`, model, {headers: getAuthHeader()});
    return response.data;
} catch (error) {
    throw error
}
};

export const deleteReview = async (id) => {
    try {
    const response = await serverApi.delete(`reviews/${id}`, {headers: getAuthHeader()});
    return response.data;
} catch (error) {
    throw error
}
};

export const uploadReviewFile = async (reviewId, model) => {
    try {
    const response = await serverApi.post(`reviews/${reviewId}/files`, model, {headers: getAuthHeader()});
    return response.data;
} catch (error) {
    throw error
}
};

export const deleteReviewFile = async (reviewId, fileId) => {
    try {
    const response = await serverApi.delete(`reviews/${reviewId}/files/${fileId}`, {headers: getAuthHeader()});
    return response.data;
} catch (error) {
    throw error
}
};


export const fetchByIdReview = async (id) => {
    try {
    const response = await serverApi.get(`reviews/${id}`);
    return response.data;
} catch (error) {
    throw error
}
};

export const fetchAllReviews = async () => {
    try {
    const response = await serverApi.get('reviews');
    return response.data;
} catch (error) {
    throw error
}
};