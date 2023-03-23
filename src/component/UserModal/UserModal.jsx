import React, {useState} from "react";
import {validateForm} from "../../services/validation";
import {createUser} from "../../http/userRequest";

import './UserModal.css';

const UserModal = ({openModal, update}) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        number: '',
        email: '',
    });
    const [errors, setErrors] = useState({});

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
                <h1>Create new user</h1>
                <div onClick={openModal} className="closeModal">X</div>
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