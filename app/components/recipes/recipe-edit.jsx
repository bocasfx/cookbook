import React from 'react';
import RecipeForm from './recipe-form.jsx';
import request from 'superagent';
import { browserHistory } from 'react-router';
import Spinner from '../spinner.jsx';

const styles = {
  container: {
    margin: '50px 0'
  }
};

class RecipeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: null,
      error: false,
      done: false,
      disabled: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleError = this.handleError.bind(this);
    this.onIngredientsChange = this.onIngredientsChange.bind(this);
    this.onStepsChange = this.onStepsChange.bind(this);
    this.onRemoveImage = this.onRemoveImage.bind(this);
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

  handleChange(event) {
    event.preventDefault();

    let value = event.target.value;
    let name = event.target.name;
    let state = this.state;

    state.recipe[name] = value;
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    let image = this.state.recipe.image;
    let url = '/api/v1/recipes/' + this.props.params.recipeid;

    if (typeof image === 'object') {
      let recipe = JSON.stringify({
        title: this.state.recipe.title,
        category: this.state.recipe.category,
        ingredients: this.state.recipe.ingredients,
        steps: this.state.recipe.steps,
        notes: this.state.recipe.notes,
        footnotes: this.state.recipe.footnotes
      });

      request.patch(url)
        .set('x-access-token', sessionStorage.getItem('accessToken'))
        .attach('image', image, image.name)
        .field('recipe', recipe)
        .end(this.handleError);
    } else {
      let recipe = JSON.stringify({
        title: this.state.recipe.title,
        category: this.state.recipe.category,
        ingredients: this.state.recipe.ingredients,
        steps: this.state.recipe.steps,
        notes: this.state.recipe.notes,
        footnotes: this.state.recipe.footnotes,
        image: this.state.recipe.image
      });

      request.patch(url)
        .set('x-access-token', sessionStorage.getItem('accessToken'))
        .field('recipe', recipe)
        .end(this.handleError);
    }
  }

  handleError(err) {
    if (err) {
      return this.setState({
        error: true,
        done: true
      });
    }
    this.setState({
      done: true
    });
    browserHistory.push('/recipes/' + this.props.params.recipeid);
  }

  onDrop(acceptedFiles) {
    let state = this.state;
    state.recipe.image = acceptedFiles[0];
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

  onRemoveImage(event) {
    event.preventDefault();
    let state = this.state;
    state.recipe.image = '';
    this.setState(state);
  }

  render() {
    if (!this.state.recipe || this.error) {
      return (
        <div style={styles.container}>
          <Spinner error={this.props.error} spin={!this.props.done} staticMessage="Nothing to see here. Try adding a recipe."/>
        </div>
      );
    }

    let cancelUrl = '/recipes/' + this.props.params.recipeid;
    return (
      <RecipeForm 
        recipe={this.state.recipe}
        onChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        onDrop={this.onDrop}
        cancelUrl={cancelUrl}
        submitLabel="Save"
        error={this.state.error}
        done={this.state.done}
        disabled={this.state.disabled}
        onIngredientsChange={this.onIngredientsChange}
        onStepsChange={this.onStepsChange}
        onRemoveImage={this.onRemoveImage}/>
    );
  }
}

module.exports = RecipeEdit;
