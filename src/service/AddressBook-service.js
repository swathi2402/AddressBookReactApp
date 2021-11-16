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
        return axios.get(`${baseUrl}addressbook/get/${id}`);
    }

    deleteContact(id) {
        return axios.delete(`${baseUrl}addressbook/delete/${id}`);
    }

    updateContact(data, id) {
        return axios.put(`${baseUrl}addressbook/update/${id}`, data);
    }
}