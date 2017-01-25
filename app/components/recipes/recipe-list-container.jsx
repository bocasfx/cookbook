import React from 'react';
import request from 'superagent';
import RecipeList from './recipe-list.jsx';

class RecipeListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeIdx: null,
      done: false,
      error: false
    };

    this.generateRecipeIndex = this.generateRecipeIndex.bind(this);
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
        let recipeIdx = this.generateRecipeIndex(response.body);
        this.setState({
          recipeIdx: recipeIdx,
          done: true
        });
      });
  }

  generateRecipeIndex(recipes) {
    let recipeIndex = {};
    recipes.forEach((recipe) => {
      let letter = recipe.title[0];
      if (!recipeIndex[letter]) {
        recipeIndex[letter] = [];
      }
      recipeIndex[letter].push(recipe);
    });
    return Object.keys(recipeIndex).length ? recipeIndex : null;
  }

  render() {
    let baseUrl = '/categories/' + this.props.params.categoryid + '/recipes';
    return (
      <RecipeList
        recipeIdx={this.state.recipeIdx}
        baseUrl={baseUrl}
        done={this.state.done}
        error={this.state.error}/>
    );
  }
}

module.exports = RecipeListContainer;
