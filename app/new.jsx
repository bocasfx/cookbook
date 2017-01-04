import React from 'react';
import Ingredient from './ingredient.jsx';
import Step from './step.jsx';
import styles from './styles/styles.css';
import _ from 'lodash';
import request from 'superagent';
import { browserHistory } from 'react-router';


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
      <div>
        
        <h1>New Recipe</h1>
        
        <form onSubmit={this.handleSubmit}>

          <div>
            <h2>Title</h2>
            <input name="title" type="text" defaultValue={this.state.title} onChange={this.handleChange}/>
          </div>

          <div>
            <h2>Category</h2>
            <input name="category" type="text" className={styles.categoryInput} defaultValue={this.state.category}  onChange={this.handleChange}/>
          </div>

          <div className={styles.ingredientsHeader}>
            <h2>Ingredients</h2>
            <span onClick={this.addIngredient}>+</span>
          </div>

          {
            this.state.ingredients.map((ingredient, idx) => {
              let closeBtn = idx !== 0;
              return <Ingredient 
                        key={idx}
                        idx={idx}
                        ammount={ingredient.ammount}
                        units={ingredient.units}
                        ingredient={ingredient.ingredient} 
                        closeBtn={closeBtn}
                        onChange={this.handleIngredientsChange}/>;
            })
          }

          <div className={styles.stepsHeader}>
            <h2>Steps</h2>
            <span onClick={this.addStep}>+</span>
          </div>

          {
            this.state.steps.map((step, idx) => {
              let closeBtn = idx !== 0;
              return <Step
                        key={idx}
                        idx={idx}
                        description={step.description}
                        closeBtn={closeBtn}
                        onChange={this.handleStepsChange}/>;
            })
          }
          
          <input type="submit" className={styles.submit} value="Submit"/>
        </form>
      </div>
    );
  }
}

module.exports = New;
