import React from 'react';
import RecipeForm from './recipe-form.jsx';
import request from 'superagent';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      category: '',
      ingredients: [],
      steps: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
    this.handleStepsChange = this.handleStepsChange.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.addStep = this.addStep.bind(this);
  }

  componentDidMount() {
    request
      .get('/api/v1/recipes/' + this.props.params.recipeid)
      .set('Accept', 'application/json')
      .end((err, response)=> {
        let recipe = response.body[0];
        this.setState({
          title: recipe.title,
          category: recipe.category,
          ingredients: recipe.ingredients,
          steps: recipe.steps
        });
      });
  }

  handleChange(event) {
    event.preventDefault();

    let value = event.target.value;
    let name = event.target.name;
    let state = this.state;

    state[name] = value;
    console.log(name);
    this.setState(state);
  }

  handleSubmit() {}

  handleIngredientsChange() {}

  handleStepsChange() {}

  addIngredient() {}

  addStep() {}

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

module.exports = Edit;
