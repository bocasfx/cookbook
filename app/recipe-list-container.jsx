import React from 'react';
import RecipeList from './recipe-list.jsx';
import request from 'superagent';

class RecipeListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    request
      .get('/api/v1/recipes')
      .set('Accept', 'application/json')
      .end((err, response)=> {
        this.setState({
          categories: response.body
        });
      });
  }

  render() {
    return (
      <RecipeList categories={this.state.categories}/>
    );
  }
}

module.exports = RecipeListContainer;
