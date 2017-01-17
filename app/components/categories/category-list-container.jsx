import React from 'react';
import request from 'superagent';
import CategoryList from './category-list.jsx';

class CategoryListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    request
      .get('/api/v1/categories')
      .set('Accept', 'application/json')
      .end((err, response)=> {
        this.setState({
          categories: response.body
        });
      });
  }

  render() {
    return (
      <CategoryList categories={this.state.categories}/>
    );
  }
}

module.exports = CategoryListContainer;
