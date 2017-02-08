import React from 'react';
import request from 'superagent';
import { browserHistory } from 'react-router';
import RecipeForm from './recipe-form.jsx';
import capitalize from 'capitalize';

class NewRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        title: '',
        translation: '',
        category: this.props.params.categoryid,
        ingredients: [],
        steps: [],
        image: '',
        notes: '',
        footnotes: ''
      },
      categories: [],
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
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    request
      .get('/api/v1/categorylist/')
      .set('Accept', 'application/json')
      .end((categoryErr, categoryResponse)=> {
        this.setState({
          categories: this.buildCategoryDropdown(categoryResponse.body),
          done: true
        });
      });
  }

  buildCategoryDropdown(categories) {
    let options = [];
    categories.forEach((category) => {
      let option = {
        value: category._id,
        label: capitalize(category.category)
      };
      options.push(option);
    });
    return options;
  }

  onCategoryChange(category) {
    let state = this.state;
    state.recipe.category = category.value;
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    // this.setState({
    //   disabled: true
    // });

    let image = this.state.recipe.image;

    let recipe = {
      title: this.state.recipe.title,
      translation: this.state.recipe.translation,
      category: this.state.recipe.category,
      ingredients: this.state.recipe.ingredients,
      steps: this.state.recipe.steps,
      notes: this.state.recipe.notes,
      footnotes: this.state.recipe.footnotes
    };

    if (typeof image === 'object') {
      request.post('/api/v1/recipes')
        .attach('image', image, image.name)
        .set('x-access-token', sessionStorage.getItem('accessToken'))
        .field('recipe', JSON.stringify(recipe))
        .end(this.handleError);
    } else {
      recipe.image = this.state.recipe.image;
      request.post('/api/v1/recipes')
        .set('x-access-token', sessionStorage.getItem('accessToken'))
        .field('recipe', JSON.stringify(recipe))
        .end(this.handleError);
    }
  }

  handleError(err, response) {
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
        categories={this.state.categories}
        onChange={this.onChange}
        onCategoryChange={this.onCategoryChange}
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
