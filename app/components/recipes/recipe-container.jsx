import React from 'react';
import Recipe from './recipe.jsx';
import request from 'superagent';

class RecipeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {}
    };
  }

  componentDidMount() {
    request
      .get('/api/v1/recipes/' + this.props.params.recipeid)
      .set('Accept', 'application/json')
      .end((err, response)=> {
        this.setState({
          recipe: response.body[0]
        });
      });
  }

  render() {
    let baseUrl = '/categories/' + this.props.params.categoryid + '/recipes';
    let editUrl = baseUrl + '/edit/' + this.props.params.recipeid;
    return(
      <Recipe
        editUrl={editUrl}
        recipesUrl={baseUrl}
        recipe={this.state.recipe}/>
    );
  }
}

module.exports = RecipeContainer;