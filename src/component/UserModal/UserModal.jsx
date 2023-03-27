import React, {useEffect, useState} from "react";
import {validateForm} from "../../services/validation";
import {createUser} from "../../http/userRequest";

import './UserModal.css';

const UserModal = ({openModal, update}) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        number: '',
        email: '',
        subscribe: ''
    });
    const [checkValue, setCheckValue] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!checkValue) {
            setCheckValue('standard');
        }
    },[]);

    const handleSubscribeClick = (event) => {
        setCheckValue(event.target.value);
    }
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const error = validateForm(formData);
        if (Object.keys(error).length > 0) {
            setErrors(error);
        } else {
            setErrors({});
            setFormData(formData.subscribe = checkValue);
            createUser(formData).then(() => {
                update();
                openModal();
            }).catch((e) => {
                console.log(e)
            });
        }
    }

    return (
        <div className="modal">
            <div className='modal-container'>
                <div className="close-button-container">
                    <div onClick={openModal} className="closeModal">X</div>
                </div>
                <h1>Create new user</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        style={{borderColor: errors.firstName ? "red" : "black"}}
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        onChange={handleChange}
                    />
                    {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        style={{borderColor: errors.lastName ? "red" : "black"}}
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                    />
                    {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                    <label htmlFor="number">Your Number:</label>
                    <input
                        style={{borderColor: errors.number ? "red" : "black"}}
                        type="number"
                        id="number"
                        name="number"
                        placeholder="Your Number"
                        onChange={handleChange}
                    />
                    {errors.number && <div className="error-message">{errors.number}</div>}
                    <label htmlFor="email">Email:</label>
                    <input
                        style={{borderColor: errors.email ? "red" : "black"}}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        onChange={handleChange}
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                    <label htmlFor="email">Pleas select your subscription:</label>
                    <div className="checkbox">
                        <div className="checkbox-item">
                            <label htmlFor="no-subscription">No</label>
                            <input
                                value=""
                                type="radio"
                                id="no-subscription"
                                name="subscribe"
                                checked={checkValue === ''}
                                onChange={handleSubscribeClick}
                            />
                        </div>
                        <div className="checkbox-item">
                            <label htmlFor="standard">Standard</label>
                            <input
                                value="standard"
                                type="radio"
                                id="standard"
                                name="subscribe"
                                checked={checkValue === 'standard'}
                                onChange={handleSubscribeClick}
                            />
                        </div>
                        <div className="checkbox-item">
                            <label htmlFor="premium">Premium</label>
                            <input
                                value="premium"
                                type="radio"
                                id="premium"
                                name="subscribe"
                                checked={checkValue === 'premium'}
                                onChange={handleSubscribeClick}
                            />
                        </div>
                    </div>
                    <div className="button-container">
                        <button
                            type="submit"
                            className="submit"
                        >Send</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserModal;