export function validateForm (form)  {
    let errors = {};
    if (!form.firstName.trim()) {
        errors.firstName = 'First name is required';
    }
    if (!form.lastName.trim()) {
        errors.lastName = 'Last name is required';
    }
    if (!form.number.trim()) {
        errors.number = 'Phone number is required';
    } else if (!/^[0-9]+$/.test(form.number)) {
        errors.number = 'Phone number must be only digits';
    } else if (form.number.length < 10 || form.number.length > 15) {
        errors.number = 'Phone number must be between 10 and 15 digits';
    }
    if (!form.email.trim()) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        errors.email = 'Email address is invalid';
    }
    return errors;
};