import PropTypes from "prop-types";
import classnames from "classnames";

const TextFieldGroup = ({
    field,
    register,
    label,
    error,
    type
}) => {
    return (
        <div className="mb-3">
            <label htmlFor={field} className="form-label">{label}</label>
            <input
                type={type} 
                {...register(field)}
                className={classnames("form-control", {"is-invalid": !!error})}
                />
            {!!error && <div className="invalid-feedback">{error.message}</div>}
        </div>
    );
};

TextFieldGroup.propTypes = {
    field: PropTypes.string.isRequired,
    register: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
  };

TextFieldGroup.defaultProps = {
    type: "text"
  };

export default TextFieldGroup;