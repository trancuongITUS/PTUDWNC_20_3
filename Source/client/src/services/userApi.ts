import api from '../api';

export const getAllUsers = async () => {
    const response = await api.get<any>('users/all');
    return response.data;
};

export const getAllStudents = async () => {
    const response = await api.get<any>('users/all-students');
    return response.data;
}

export const lockUser = async (userId: number) => {
    const response = await api.post<any>('users/lock', {userId});
    return response.data;
}

export const unlockUser = async (userId: number) => {
    const response = await api.post<any>('users/unlock', {userId});
    return response.data;
}

export const deleteUser = async (userId: number) => {
    const response = await api.post<any>('users/delete', {userId});
    return response.data;
}