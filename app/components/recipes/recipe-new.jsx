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
        steps: [],
        image: '',
        notes: '',
        footnotes: ''
      },
      error: false,
      done: false,
      disabled: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onIngredientsChange = this.onIngredientsChange.bind(this);
    this.onStepsChange = this.onStepsChange.bind(this);
    this.onRemoveImage = this.onRemoveImage.bind(this);
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
        ingredients: JSON.stringify(this.state.recipe.ingredients),
        steps: JSON.stringify(this.state.recipe.steps),
        notes: this.state.recipe.notes,
        footnotes: this.state.recipe.footnotes
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

  onChange(event) {
    event.preventDefault();

    let value = event.target.value;
    let name = event.target.name;
    let state = this.state;

    state.recipe[name] = value;
    this.setState(state);
  }

  onIngredientsChange(ingredients) {
    let state = this.state;
    state.recipe.ingredients = ingredients;
    this.setState(state);
  }

  onStepsChange(steps) {
    let state = this.state;
    state.recipe.steps = steps;
    this.setState(state);
  }

  onDrop(acceptedFiles) {
    let state = this.state;
    state.recipe.image = acceptedFiles[0];
    this.setState(state);
  }

  onRemoveImage(event) {
    event.preventDefault();
    let state = this.state;
    state.recipe.image = '';
    this.setState(state);
  }

  render() {
    let cancelUrl = '/categories/' + this.state.recipe.category + '/recipes';
    return (
      <RecipeForm
        recipe={this.state.recipe}
        onChange={this.onChange}
        handleSubmit={this.handleSubmit}
        onDrop={this.onDrop}
        cancelUrl={cancelUrl}
        submitLabel="Add"
        error={this.state.error}
        done={this.state.done}
        disabled={this.state.disabled}
        onIngredientsChange={this.onIngredientsChange}
        onStepsChange={this.onStepsChange}
        onRemoveImage={this.onRemoveImage}/>
    );
  }
}

module.exports = NewRecipe;
