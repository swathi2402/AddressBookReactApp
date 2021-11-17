import React, { useState, useEffect } from "react";
import { Link, useParams, withRouter } from 'react-router-dom';
import './form.scss';
import logo from '../../assets/logo.png';
import CancelButton from '../../assets/cancel.png'
import AddressBookService from "../../service/AddressBook-service";

const Form = (props) => {

    let initialValue = {
        name: '',
        city: '',
        state: '',
        address: '',
        zip: '',
        phoneNumber: '',
        contactId: '',
        isUpdate: false,
        error: {
            name: '',
            city: '',
            state: '',
            address: '',
            zip: '',
            phoneNumber: ''
        }
    }

    const [formValue, setForm] = useState(initialValue);
    const [displayMeassage, setDisplayMessage] = useState("");
    const params = useParams();

    const addressbookService = new AddressBookService();

    useEffect(() => {
        if (params.id) {
            getDataById(params.id);
        }
    }, []);

    const getDataById = (id) => {
        addressbookService.getContact(id).then((data) => {
            console.log("Data is ", data.data.data);
            let object = data.data.data;
            setData(object);
        }).catch((error) => {
            console.log("Error is ", error);
        });
    };

    const setData = (object) => {
        setForm({
            ...formValue, ...object, isUpdate: true,
        });
    };

    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value })
    }

    const validData = async () => {
        let isError = false;
        let error = {
            name: '',
            city: '',
            state: '',
            address: '',
            zip: '',
            phoneNumber: ''
        }
        if (!formValue.name.match('^[A-Z]{1}[a-zA_Z\\s]{2,}$')) {
            error.name = 'Name is Invalid!'
            isError = true;
        }
        if (formValue.state.length < 1) {
            error.state = 'State is required field!'
            isError = true;
        }
        if (formValue.city.length < 1) {
            error.city = 'City is required field!'
            isError = true;
        }
        if (!formValue.address.match('([a-zA-Z]{3,}\\s?){2,}$')) {
            error.address = 'Address is Invalid!'
            isError = true;
        }
        if (!formValue.zip.match('^[0-9]{3}\\s{0,1}[0-9]{3}$')) {
            error.zip = 'Zip code is Invalid!'
            isError = true;
        }
        if (!formValue.phoneNumber.match('^([+]?[1-9][0-9])?[0-9]{10}$')) {
            error.phoneNumber = 'Phone Number Invalid!'
            isError = true;
        }
        await setForm({ ...formValue, error: error })
        return isError;
    }

    const save = async (event) => {
        event.preventDefault();
        if (await validData()) {
            console.log('error', formValue);
            return;
        }

        let object = {
            name: formValue.name,
            phoneNumber: formValue.phoneNumber,
            city: formValue.city,
            state: formValue.state,
            address: formValue.address,
            id: '',
            zip: formValue.zip,
        }

        if (formValue.isUpdate) {
            addressbookService.updateContact(object, params.id).then((data) => {
                setDisplayMessage("Contact Updated Successfully");
                console.log("Data after update", data);
                reset();
                setTimeout(() => {
                    setDisplayMessage("");
                    props.history.push("");
                }, 3000);
            }).catch((error) => {
                setDisplayMessage("Error while updating contact");
                console.log("Error while updating", error);
                setTimeout(() => {
                    setDisplayMessage("");
                }, 3000);
            });
        } else {
            addressbookService.addContact(object).then((data) => {
                setDisplayMessage("Contact Added Successfully");
                console.log("Data added: ", data.data);
                reset();
                setTimeout(() => {
                    setDisplayMessage("");
                    props.history.push("");
                }, 3000);
            }).catch((error) => {
                setDisplayMessage("Error while adding contact");
                console.log("Error while adding employee");
                setTimeout(() => {
                    setDisplayMessage("");
                }, 3000);
            });
        }
    }

    const reset = () => {
        setForm({ ...initialValue, contactId: formValue.contactId, isUpdate: formValue.isUpdate, city: '', state: '' });
        console.log(formValue);
    }

    return (
        <div className="main">
            <header className="header-content header">
                <div className="logo-content">
                    <img src={logo} alt="" />
                    <div>
                        <span className="address-text">ADDRESS</span><br />
                        <span className="address-text address-book">BOOK</span>
                    </div>
                </div>
            </header>
            <div className="form-content">
                <form className="form" action="#" onSubmit={save}>
                    <div className="form-head">
                        <h1 className="form-head-title">Person Address Form</h1>
                        <Link to="">
                            <img src={CancelButton} className="close-button" alt="cancel" />
                        </Link>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="name">Name</label>
                        <input className="input" type="text" id="name" name="name" placeholder="" value={formValue.name} onChange={changeValue} />
                        <div className="error">{formValue.error.name}</div>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="phoneNumber">Phone Number</label>
                        <input className="input" type="tel" id="phoneNumber" name="phoneNumber" value={formValue.phoneNumber} onChange={changeValue} />
                        <div className="error">{formValue.error.phoneNumber}</div>
                    </div>
                    <div className="row-content">
                        <div className="text-row">
                            <label className="label text" htmlFor="address">Address</label>
                            <textarea id="address" className="input" name="address" placeholder="" style={{ height: '100px' }} value={formValue.address} onChange={changeValue}></textarea>
                            <div className="error">{formValue.error.address}</div>
                        </div>
                    </div>
                    <div className="row-content location-row">
                        <div>
                            <label className="label text" htmlFor="city">City</label>
                            <select value={formValue.city} onChange={changeValue} id="city" name="city">
                                <option value="" disabled>Select City</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Maduri">Maduri</option>
                                <option value="Udupi">Udupi</option>
                                <option value="Vijayawada">Vijayawada</option>
                            </select>
                            <div className="error">{formValue.error.city}</div>
                        </div>
                        <div>
                            <label className="label text" htmlFor="state">State</label>
                            <select value={formValue.state} onChange={changeValue} id="state" name="state">
                                <option value="" disabled>Select State</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Telengana">Telengana</option>
                                <option value="Tamilnadu">Tamil Nadu</option>
                            </select>
                            <div className="error">{formValue.error.state}</div>
                        </div>
                        <div>
                            <label className="label text" htmlFor="zip">Zip Code</label>
                            <input className="input" type="text" id="zip" name="zip" value={formValue.zip} onChange={changeValue} />
                            <div className="error">{formValue.error.zip}</div>
                        </div>
                    </div>
                    <div className="buttonParent">
                        <button type="submit" className="button submitButton" id="addButton" >{formValue.isUpdate ? 'Update' : 'Add'}</button>
                        <button type="reset" onClick={reset} className="button resetButton">Reset</button>
                    </div>
                    <div className="displaymessage">
                        {displayMeassage}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withRouter(Form);