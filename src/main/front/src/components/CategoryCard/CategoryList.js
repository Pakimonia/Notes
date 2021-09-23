import React, { Component } from 'react'
import { serverUrl } from '../../config';

export default class CategoryList extends Component {
    state={
        isLoaded:false,
        categories:[]
    }

    componentDidMount() {
      console.log("server url", serverUrl);
        fetch(`${serverUrl}api/categories`)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                categories: result
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

    render() {
        const {categories} = this.state;
        var categoryList = categories.map((c) => <li key={c.name}>[{c.id}]{c.name}</li>);
        return (
            <div>
                {categoryList}
            </div>
        );
    }
}
