import axios from 'axios';

const usersUrl = 'https://localhost:7027/api/Product';
const loginurl='https://localhost:7027/api/Authenticate/SignUp';


export const getUsers = async (id) => {
    id = id || '';
    try {
        return await axios.get(`${usersUrl}/${id}`);
    } catch (error) {
        console.log('Error while calling getUsers api ', error);
    }
}

export const addUser = async (user) => {
    return await axios.post(`${usersUrl}`, user);
}

export const deleteUser = async (id) => {
    return await axios.delete(`${usersUrl}/${id}`);
}

export const editUser = async (id, user) => {
    return await axios.put(`${usersUrl}/${id}`, user)
}

export const addCustomer = async (user) => {
    return await axios.post(`${loginurl}`, user);
}