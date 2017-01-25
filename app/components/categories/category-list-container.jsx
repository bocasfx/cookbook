import React from 'react';
import request from 'superagent';
import CategoryList from './category-list.jsx';

class CategoryListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      done: false,
      error: false
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
            done: true
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
        error={this.state.error}/>
    );
  }
}

module.exports = CategoryListContainer;
