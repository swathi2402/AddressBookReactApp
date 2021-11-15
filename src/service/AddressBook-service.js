import config from '../config/config';
import AxiosService from './AxiousService';

export default class AddressBookService {
    baseUrl = config.baseUrl;
    addContact(data) {
        console.log("URL", this.baseUrl);
        return AxiosService.postService(`${this.baseUrl}AddressBook`, data);
    }
} 