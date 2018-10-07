/**
 *Collections of validator used to validate input fields
 * @type {{validateEmail: helpers.validateEmail}}
 */

const validator = {
    validateName: function (name) {
        const nameValidator = /^[a-zA-Z\s]*$/;
        if (name.length === 0) {
            return {valid: false, message: 'This is required field.'};
        } else if (nameValidator.test(name)) {
            return {valid: true, message: ''};
        } else {
            return {valid: false, message: 'Please provide valid name.'};
        }
    },
    validateEmail: function (email) {
        const emailValidator = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
        if (email.length === 0) {
            return {valid: false, message: 'This is required field.'};
        } else if (emailValidator.test(email)) {
            return {valid: true, message: ''};
        } else {
            return {valid: false, message: 'Please enter valid email address'};
        }
    }
    ,
    validatePassword: function (password) {
        if (password.length === 0) {
            return {valid: false, message: 'This is required field.'};
        } else if (password.length >= 8)
            return {valid: true, message: ''};
        else
            return {valid: false, message: 'Password should be atleast 8 characters.'}
    }
    ,
    validateConfirmPassword: function (password, confirmPassword) {
        if (password === confirmPassword) {
            return {valid: true, message: ''};
        } else {
            return {valid: false, message: 'Password does not match'};
        }
    },
    validateResetCode: function (password) {
        if (password.length === 0) {
            return {valid: false, message: 'This is required field.'};
        } else if (password.length >= 6)
            return {valid: true, message: ''};
        else
            return {valid: false, message: 'Reset code should be of 6 characters.'}
    }
}

export default validator;