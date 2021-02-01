import { FormInput } from '../components/UI';
import * as validations from './inputValidationRules';

function createFormFieldConfig(label, name, type, defaultValue = "", defaultValidity = false) {
    return {
        renderInput: function (handleChange, value, isValid, error, key) {
            return (
                <FormInput
                    key={key}
                    name={name}
                    type={type}
                    label={label}
                    isValid={isValid}
                    value={value}
                    handleChange={handleChange}
                    errorMessage={error}
                />
            );
        },
        label,
        value: defaultValue,
        valid: defaultValidity,
        errorMessage: "",
        touched: false
    }
}

export const loginForm = {
    email: {
        ...createFormFieldConfig("Email", "email", "email"),
        validationRules: [
            validations.requiredRule("email"),
            validations.validEmail("email")
        ]
    },
    password: {
        ...createFormFieldConfig("Password", "password", "password"),
        validationRules: [
            validations.requiredRule("password"),
            validations.minLengthRule("password", 5),
        ]
    },
};

export const signupForm = {
    username: {
        ...createFormFieldConfig("Username", "username", "text"),
        validationRules: [
            validations.requiredRule("username"),
            validations.minLengthRule("username", 3),
        ]
    },
    email: {
        ...createFormFieldConfig("Email", "email", "email"),
        validationRules: [
            validations.requiredRule("email"),
            validations.validEmail("email")
        ]
    },
    password: {
        ...createFormFieldConfig("Password", "password", "password"),
        validationRules: [
            validations.requiredRule("password"),
            validations.minLengthRule("password", 5),
        ]
    },
};

export const createNotesForm = {
    title: {
        ...createFormFieldConfig("Title", "title", "text"),
        validationRules: [
            validations.requiredRule("title"),
        ]
    },
    content: {
        ...createFormFieldConfig("Content", "content", "textarea"),
        validationRules: [
            validations.requiredRule("content"),
            validations.minLengthRule("content", 3),
        ]
    },
};