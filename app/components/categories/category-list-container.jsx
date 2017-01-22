import React from 'react';
import request from 'superagent';
import CategoryList from './category-list.jsx';

class CategoryListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      done: false,
      error: false,
      message: ''
    };
  }

  componentDidMount() {
    request
      .get('/api/v1/categories')
      .set('Accept', 'application/json')
      .end((err, response)=> {
        if (err) {
          return this.setState({
            error: true,
            done: true,
            message: 'Oops... Something went wrong.'
          });
        }

        this.setState({
          categories: response.body,
          done: true
        });
      });
  }

  render() {
    return (
      <CategoryList
        categories={this.state.categories}
        done={this.state.done}
        error={this.state.error}
        message={this.state.message}/>
    );
  }
}

module.exports = CategoryListContainer;
