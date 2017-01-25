import React from 'react';
import request from 'superagent';
import RecipeList from './recipe-list.jsx';

class RecipeListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      done: false,
      error: false
    };
  }

  componentDidMount() {
    request
      .get('/api/v1/categories/' + this.props.params.categoryid + '/recipes')
      .set('Accept', 'application/json')
      .end((err, response)=> {
        if (err) {
          return this.setState({
            error: true,
            done: true
          });
        }
        this.setState({
          recipes: response.body,
          done: true
        });
      });
  }

  render() {
    let baseUrl = '/categories/' + this.props.params.categoryid + '/recipes';
    return (
      <RecipeList
        recipes={this.state.recipes}
        baseUrl={baseUrl}
        done={this.state.done}
        error={this.state.error}/>
    );
  }
}

module.exports = RecipeListContainer;
