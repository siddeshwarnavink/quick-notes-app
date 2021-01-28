function createValidationRule(ruleName, errorMessage, validateFunc) {
    return {
        name: ruleName,
        message: errorMessage,
        validate: validateFunc
    };
}

export function requiredRule(inputName) {
    return createValidationRule(
        "required",
        `${inputName} required`,
        (inputValue, formObject) => inputValue.length !== 0
    );
}

export function minLengthRule(inputName, minCharacters) {
    return createValidationRule(
        "minLength",
        `${inputName} should contain atleast ${minCharacters} characters`,
        (inputValue, formObject) => inputValue.length >= minCharacters
    );
}

export function maxLengthRule(inputName, maxCharacters) {
    return createValidationRule(
        "minLength",
        `${inputName} cannot contain more than ${maxCharacters} characters`,
        (inputValue, formObject) => inputValue.length <= maxCharacters
    );
}

export function validEmail(inputName) {
    return createValidationRule(
        "validEmail",
        `${inputName} must be a valid email address`,
        (inputValue, formObject) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inputValue)
    )
}