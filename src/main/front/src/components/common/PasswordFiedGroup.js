import PropTypes from "prop-types";
import classnames from "classnames";
import React, { useState } from 'react'

const PasswordFiedGroup = ({
    field,
    register,
    label,
    error
}) => {

    const [isShow, setShow] = useState(false);
    
    const onShowHandler = (e) => {
        e.preventDefault();
        setShow(!isShow);
    }

    return (
        <div className="mb-3">
            <label htmlFor={field} className="form-label">{label}</label>
            <div className="input-group">
                <input
                    type={isShow ? "text" : "password"}
                    {...register(field)}
                    className={classnames("form-control", { "is-invalid": !!error })}
                />
                <button class="btn btn-outline-secondary" type="button" onClick={onShowHandler}>
                    {!isShow && <i class="fa fa-eye-slash" aria-hidden="true"></i>}
                    {isShow && <i class="fa fa-eye" aria-hidden="true"></i>}
                </button>
                {!!error && <div className="invalid-feedback">{error.message}</div>}
            </div>
            
            
        </div>
    );
};

PasswordFiedGroup.propTypes = {
    field: PropTypes.string.isRequired,
    register: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string
  };

  PasswordFiedGroup.defaultProps = {

  };

export default PasswordFiedGroup;