import React from 'react';
import Recipe from './recipe.jsx';
import request from 'superagent';

class RecipeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: null,
      done: false,
      error: false
    };
  }

  componentDidMount() {
    request
      .get('/api/v1/recipes/' + this.props.params.recipeid)
      .set('Accept', 'application/json')
      .end((err, response)=> {
        if (err) {
          return this.setState({
            error: true,
            done: true
          });
        }
        this.setState({
          recipe: response.body[0],
          done: true
        });
      });
  }

  render() {
    
    return(
      <Recipe
        recipe={this.state.recipe}
        done={this.state.done}
        error={this.state.error}/>
    );
  }
}

module.exports = RecipeContainer;
