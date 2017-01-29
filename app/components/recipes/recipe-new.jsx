import React from 'react';
import request from 'superagent';
import { browserHistory } from 'react-router';
import RecipeForm from './recipe-form.jsx';

class NewRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        title: '',
        category: this.props.params.categoryid,
        ingredients: [],
        description: '',
        image: ''
      },
      error: false,
      done: false,
      disabled: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onAddIngredient = this.onAddIngredient.bind(this);
    this.onRemoveIngredient = this.onRemoveIngredient.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      disabled: true
    });

    let image = this.state.recipe.image;

    request.post('/api/v1/recipes')
      .attach('image', image, image.name)
      .set('x-access-token', sessionStorage.getItem('accessToken'))
      .field({
        title: this.state.recipe.title,
        category: this.state.recipe.category,
        ingredients: this.state.recipe.ingredients,
        description: this.state.recipe.description
      })
      .end((err, response) => {
        if (response && response.status === 403) {
          return browserHistory.push('/login');
        }

        if (err) {
          return this.setState({
            error: true,
            done: true
          });
        }

        let recipeId = response.body._id;
        browserHistory.push('/recipes/' + recipeId);
      });
  }

  handleChange(event) {
    event.preventDefault();

    let value = event.target.value;
    let name = event.target.name;
    let state = this.state;

    state.recipe[name] = value;
    this.setState(state);
  }

  onDrop(acceptedFiles) {
    let state = this.state;
    state.recipe.image = acceptedFiles[0];
    this.setState(state);
  }

  onAddIngredient(ingredient) {
    let state = this.state;
    state.recipe.ingredients.push({
      ammount: ingredient.ammount,
      units: ingredient.units,
      ingredient: ingredient.ingredient
    });
    this.setState(state);
    console.log(this.state);
  }

  onRemoveIngredient(idx) {
    let state = this.state;
    state.recipe.ingredients.splice(idx, 1);
    this.setState(state);
  }

  render() {
    let cancelUrl = '/categories/' + this.state.recipe.category + '/recipes';
    return (
      <RecipeForm
        recipe={this.state.recipe}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        onDrop={this.onDrop}
        cancelUrl={cancelUrl}
        submitLabel="Add"
        error={this.state.error}
        done={this.state.done}
        disabled={this.state.disabled}
        onAddIngredient={this.onAddIngredient}
        onRemoveIngredient={this.onRemoveIngredient}/>
    );
  }
}

module.exports = NewRecipe;
