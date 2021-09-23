import React, { Component, Fragment } from 'react'

export default class CreateCategory extends Component {
    state = {
        id: 0,
        name: ''
    }

    handlerChangeInput = (e) => {
        var target = e.target;
        this.setState({
            [target.name]: target.value
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        console.log("Form submit")

        if (this.isValid()) {
            this.setState({
                ErrorMessage: ""
            })
            var category = {
                id: 0,
                name: this.state.name,
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(category)
            };
            fetch('http://localhost:8082/api/categories', requestOptions)
                .then(response => response.json())
                .then(data => this.setState({ postId: data.id }));
        }
        else {
            this.setState({
                ErrorMessage: "Please, Enter all fields!"
            })
        }
    }

    isValid = () => {
        if (this.state.name === '') {
            return false;
        }
        else {
            return true;
        }

    }


    render() {
        console.log(this.state)
        var header = 'Add new category:'
        var btnHeader = 'Add category'
        const { ErrorMessage } = this.state
        return (
            <Fragment>
                <h2>{header}</h2>
                <form onSubmit={this.submitForm}>
                    <div className="form-group">
                        <label>Category name*</label>
                        <input type="text" className="form-control" name="name" onChange={this.handlerChangeInput} placeholder="Enter category name" />
                    </div>
                    <p className="text-danger">{ErrorMessage}</p>
                    <button type="submit" className="btn btn-primary">{btnHeader}</button>
                </form>
            </Fragment>
        )

    }
}
