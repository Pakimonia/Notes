import React, { Component } from 'react'
import { validationFields } from './validate';
import classnames from "classnames";
import { connect } from 'react-redux';
import { loginUser } from '../../../actions/auth';

export class LoginPage extends Component {

    state = {
        username: "semen@gmail.com",
        password: "123456",
        errors: {}
    }
    submitForm = (e) => {
        e.preventDefault();

        let errors = validationFields(this.state);
        const isValid = Object.keys(errors).length == 0;
        if (isValid) {

            this.props.loginUser(
                {username: this.state.username, password: this.state.password}
                );
           
        }
        else {
            this.setState({errors: errors});
        }
        console.log('data send = ', this.state);
    }

    onChangeInputHandler = (e) => {
        var target = e.target;
        this.setState({
            [target.name]: target.value
        });
    }
    
    render() {
        const {username, 
            password,
            errors} = this.state; //дестурктуризація
        //console.log(this);
        console.log("Login props", this.props);
        return (
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <h1>Вхід на сайт</h1>
                    {/* <img src="http://localhost:8087/files/1.jpg"/> */}
                    <form onSubmit = {this.submitForm}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Логін</label>
                            <input type="text" className="form-control" 
                                id="username" 
                                name="username" 
                                value={username}
                                onChange={this.onChangeInputHandler}/>
                            
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Пароль</label>
                            <input type="password" className={classnames("form-control",
                                                        {"is-invalid": errors.password})}
                                id="password" 
                                name="password"
                                value={password}
                                onChange={this.onChangeInputHandler} />
                            {!!errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">Вхід</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(null, {loginUser})(LoginPage);