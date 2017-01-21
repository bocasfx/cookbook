import React from 'react';
import request from 'superagent';
import RecipeList from './recipe-list.jsx';

class RecipeListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      done: false
    };
  }

  componentDidMount() {
    request
      .get('/api/v1/categories/' + this.props.params.categoryid + '/recipes')
      .set('Accept', 'application/json')
      .end((err, response)=> {
        this.setState({
          recipes: response.body,
          done: true
        });
      });
  }

  render() {
    let baseUrl = '/categories/' + this.props.params.categoryid + '/recipes';
    return (
      <RecipeList recipes={this.state.recipes} baseUrl={baseUrl} done={this.state.done}/>
    );
  }
}

module.exports = RecipeListContainer;
