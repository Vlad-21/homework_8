import React, {useState} from "react";
import {validateForm} from "../../services/validation";
import {updateUser} from "../../http/userRequest";
import './ChangeUserModal.css';

const ChangeUserModal = ({user, openModal, update}) => {
    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        number: user.number,
        email: user.email
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
            updateUser(user.id, formData)
            .then(() => {
                openModal();
                update();
            })
            .catch((e) => {
                console.log(e);
            })
        }


    }

    return (
        <div className="modal">
            <div className="change-user-container">
                <h1>Change user data</h1>
                <div onClick={openModal} className="closeModal">X</div>
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        style={{borderColor: errors.firstName ? "red" : "black"}}
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        style={{borderColor: errors.lastName ? "red" : "black"}}
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                    <label htmlFor="number">Your Number:</label>
                    <input
                        style={{borderColor: errors.number ? "red" : "black"}}
                        type="number"
                        id="number"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                    />
                    {errors.number && <div className="error-message">{errors.number}</div>}
                    <label htmlFor="email">Email:</label>
                    <input
                        style={{borderColor: errors.email ? "red" : "black"}}
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
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
};

export default ChangeUserModal;