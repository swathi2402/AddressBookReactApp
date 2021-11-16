import axios from 'axios'

const baseUrl = 'http://localhost:8080/';

export default class AddressBookService {

    addContact(data) {
        return axios.post(`${baseUrl}addressbook/create`, data);
    }

    getAllContacts() {
        return axios.get(`${baseUrl}addressbook/get`);
    }

    getContact(id) {
        return axios.get(`${baseUrl}addressBook/get/${id}`);
    }

    deleteContact(id) {
        return axios.delete(`${baseUrl}addressBook/delete/${id}`);
    }

    updateContact(data, id) {
        return axios.put(`${baseUrl}addressBook/update/${id}`, data);
    }
}