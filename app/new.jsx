import React from 'react';
import _ from 'lodash';
import request from 'superagent';
import { browserHistory } from 'react-router';
import RecipeForm from './recipe-form.jsx';


class New extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      category: '',
      ingredients: [{
        ammount: '',
        units: '',
        ingredient: '',
        idx: 0
      }],
      steps: [{
        description: '',
        idx: 0
      }]
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
    this.handleStepsChange = this.handleStepsChange.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.addStep = this.addStep.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    request.post('/recipes')
      .set('Content-Type', 'application/json')
      .send([this.state])
      .end((err) => {
        browserHistory.push('/');
      });
  }

  handleChange(event) {
    event.preventDefault();

    let value = event.target.value;
    let name = event.target.name;
    let state = this.state;

    state[name] = value;
    this.setState(state);
  }

  handleIngredientsChange(ingredientState) {
    let state = this.state;
    let ingredientIdx = _.findIndex(state.ingredients, (item)=> {
      return item.idx === ingredientState.idx;
    });
    if (ingredientIdx < 0) {
      state.ingredients.push(ingredientState);
    } else {
      state.ingredients[ingredientIdx] = ingredientState;
    }

    this.setState(state);
  }

  handleStepsChange(stepState) {
    let state = this.state;
    let stepIdx = _.findIndex(state.steps, (item)=> {
      return item.idx === stepState.idx;
    });
    if (stepIdx < 0) {
      state.steps.push(stepState);
    } else {
      state.steps[stepIdx] = stepState;
    }

    this.setState(state);
  }

  addIngredient(event) {
    event.preventDefault();
    let ingredients = this.state.ingredients;

    ingredients.push({
      ammount: '',
      units: '',
      ingredient: '',
      idx: this.state.ingredients.length
    });
    this.setState({
      ingredients: ingredients
    });
  }

  addStep(event) {
    event.preventDefault();
    let steps = this.state.steps;

    steps.push({
      description: '',
      idx: this.state.steps.length
    });
    this.setState({
      steps: steps
    });
  }

  render() {
    return (
      <RecipeForm 
        title={this.state.title}
        category={this.state.category}
        ingredients={this.state.ingredients}
        steps={this.state.steps}
        addIngredient={this.addIngredient}
        addStep={this.addStep}
        handleChange={this.handleChange}
        handleIngredientsChange={this.handleIngredientsChange}
        handleStepsChange={this.handleStepsChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

module.exports = New;
