import React from 'react';

function useForm(formObject) {
    const [form, setForm] = React.useState(formObject);

    const isInputFieldValid = React.useCallback(function (inputField) {
        for (const rule of inputField.validationRules) {
            if (!rule.validate(inputField.value, form)) {
                inputField.errorMessage = rule.message;
                return false;
            }
        }

        return true;
    }, [form])

    const onInputChange = React.useCallback(function (event) {
        const inputObject = { ...form[event.target.name] };
        inputObject.value = event.target.value;

        const isValidInput = isInputFieldValid(inputObject);

        if (isValidInput && !inputObject.valid) {
            inputObject.valid = true;
        } else if (!isValidInput && inputObject.valid) {
            inputObject.valid = false;
        }

        inputObject.touched = true;
        setForm(prevForm => ({ ...prevForm, [event.target.name]: inputObject }));
    }, [form, isInputFieldValid]);

    const isFormValid = React.useCallback(function () {
        let isValid = true;

        for (let i = 0; i < Object.values(form).length; i++) {
            if (!Object.values(form)[i].valid) {
                isValid = false;
                break;
            }
        }

        return isValid;
    }, [form]);

    function renderFormInputs() {
        return Object.values(form).map(function (inputObject) {
            return inputObject.renderInput(
                onInputChange,
                inputObject.value,
                inputObject.valid,
                inputObject.errorMessage,
                inputObject.label
            );
        });
    }

    const formFields = {};

    Object.keys(form).forEach(fieldKey => {
        formFields[fieldKey] = form[fieldKey].value;
    });

    return [
        renderFormInputs,
        isFormValid,
        formFields
    ];
}

export default useForm;