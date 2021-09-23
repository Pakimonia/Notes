import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";

import TextFieldGroup from '../../common/TextFiedGroup';
import PasswordFiedGroup from '../../common/PasswordFiedGroup';
import { formOptions } from './validation';


const RegisterPage = () => {

    const initialState = {
        username: "semen@gmail.com",
        password: "123456",
        confirmPassword: "123456",
        fullName: "Іван Васильович"
    };

    const initialErrorState = {
        username: "",
        fullName: "",
    }

    const [values, setValues] = useState(initialState);

    //const [errors, setErrors] = useState(initialErrorState);



    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;



    const dispatch = useDispatch();

    function onSubmit(data) {
        // display form data on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
        return false;
    }


    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h1>Реєстрація на сайті</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* <TextFieldGroup
                        field="username"
                        value={values.username}
                        label="Логін"
                        error={errors.username}
                        onChange={onChangeInputHandler}
                    />
                    <TextFieldGroup
                        field="fullName"
                        value={values.fullName}
                        label="ПІБ"
                        error={errors.fullName}
                        onChange={onChangeInputHandler}
                    /> */}

                    {/* <div className="form-group col">
                        <label>Email</label>
                        <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    </div> */}

                    <TextFieldGroup
                        field="email"
                        label="Електронна пошта"
                        register = {register}
                        error={errors.email}
                    />

                    <PasswordFiedGroup
                        field="password"
                        label="Пароль"
                        register = {register}
                        error={errors.password}
                    />

                    <PasswordFiedGroup
                        field="confirmPassword"
                        label="Повтор пароля"
                        register = {register}
                        error={errors.confirmPassword}
                    />

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-1">Register</button>
                        <button type="button" onClick={() => reset()} className="btn btn-secondary">Reset</button>
                    </div>
                </form>
            </div>

        </div>

    );
}

export default RegisterPage
