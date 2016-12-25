import React from 'react';
import Ingredient from './ingredient.jsx';
import Step from './step.jsx';
import styles from './styles/styles.css';
import _ from 'lodash';

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
        description: ''
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
    console.log(this.state);
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
    let idx = ingredientState.idx;
    let ingredientIdx = _.findIndex(state.ingredients, (item)=> {
      return item.idx === idx;
    });
    if (ingredientIdx < 0) {
      state.ingredients.push(ingredientState);
    } else {
      state.ingredients[ingredientIdx] = ingredientState;
    }

    this.setState(state);
  }

  handleStepsChange(stepState) {
    console.log(stepState);
  }

  addIngredient(event) {
    event.preventDefault();
    let ing = this.state.ingredients;

    ing.push({
      ammount: '',
      units: '',
      ingredient: '',
      idx: this.state.ingredients.length
    });
    this.setState({
      ingredients: ing
    });
  }

  addStep(event) {
    event.preventDefault();
    let steps = this.state.steps;

    steps.push({
      description: ''
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
            <label>
              Title
              <input name="title" type="text"  defaultValue={this.state.title} onChange={this.handleChange}/>
            </label>
          </div>

          <div>
            <label>
              Category
              <input name="category" type="text"  defaultValue={this.state.category}  onChange={this.handleChange}/>
            </label>
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
          
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

module.exports = New;
