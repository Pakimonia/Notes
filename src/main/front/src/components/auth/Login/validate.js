function validationFields(items) {
    let errors = {};
    if(items.username.trim() == '')
    {
        errors = {
            ...errors,
            username: "Поле логіє є пустим"
        };
    }

    if(items.password.trim() == '')
    {
        errors = {
            ...errors,
            password: "Поле пароля є пустим"
        };
    }
    return errors;
}

export {validationFields};