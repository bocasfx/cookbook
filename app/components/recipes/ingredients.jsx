import React from 'react';
import Microbutton from '../microbutton.jsx';
import IngredientList from './ingredient-list.jsx';

const styles = {
  ammount: {
    width: '70px'
  },
  units: {
    marginLeft: '15px',
    width: '70px'
  },
  ingredient: {
    marginLeft: '15px',
    width: '405px'
  },
  button: {
    marginLeft: '15px'
  },
  container: {
    display: 'flex',
    marginBottom: '50px'
  },
  ingredients: {
    border: '1px dashed mistyrose'
  }
};

class Ingredient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: {
        ammount: '',
        units: '',
        ingredient: ''
      },
      disabled: true,
      ingredients: props.ingredients,
      editing: false,
      idx: null,
      icon: 'plus',
      tabBlur: false
    };

    this.onChange = this.onChange.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.renderIngredients = this.renderIngredients.bind(this);
    this.loadIngredient = this.loadIngredient.bind(this);
    this.editIngredient = this.editIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onIngredientsChange = this.onIngredientsChange.bind(this);
  }

  onChange(event) {
    event.preventDefault();

    let value = event.target.value;
    let name = event.target.name;
    let state = this.state;

    state.ingredient[name] = value;
    state.disabled = !(this.state.ingredient.ammount.length || this.state.ingredient.units.length || this.state.ingredient.ingredient.length);
    this.setState(state);
  }

  addIngredient() {
    if (this.state.disabled) {
      return;
    }

    let state = this.state;
    if (state.editing) {
      this.editIngredient();
      return;
    }
    state.ingredients.push(state.ingredient);
    state.ingredient = {
      ammount: '',
      units: '',
      ingredient: ''
    };
    state.disabled = true;
    this.props.onChange(state.ingredients);
    this.setState(state);
    this.ammountInput.focus();
  }

  loadIngredient(idx) {
    let state = this.state;
    state.idx = idx;
    state.ingredient = {
      ammount: state.ingredients[idx].ammount,
      units: state.ingredients[idx].units,
      ingredient: state.ingredients[idx].ingredient
    };
    state.editing = true;
    state.icon = 'check';
    this.setState(state);
  }

  removeIngredient(idx) {
    let state = this.state;
    state.ingredients.splice(idx, 1);
    this.setState(state);
  }

  editIngredient() {
    let state = this.state;
    let idx = state.idx;
    state.ingredients[idx] = {
      ammount: state.ingredient.ammount,
      units: state.ingredient.units,
      ingredient: state.ingredient.ingredient
    };
    state.ingredient = {
      ammount: '',
      units: '',
      ingredient: ''
    };
    state.idx = null;
    state.editing = false;
    state.disabled = true;
    state.icon = 'plus';
    this.props.onChange(state.ingredients);
    this.setState(state);
    this.ammountInput.focus();
  }

  onBlur(event) {
    event.preventDefault();
    if (!this.state.tabBlur) {
      return;
    }
    if (this.state.editing) {
      this.editIngredient();
      return;
    }
    this.addIngredient();
  }

  onKeyDown(event) {
    let state = this.state;
    state.tabBlur = (event.keyCode === 9);
    this.setState(state);
  }

  onIngredientsChange(ingredients) {
    let state = this.state;
    state.ingredients = ingredients;
    this.setState(state);
  }

  renderIngredients() {
    if (!this.state.ingredients.length) {
      return null;
    }

    return (
      <div style={styles.ingredients}>
        <IngredientList
          ingredients={this.state.ingredients}
          loadIngredient={this.loadIngredient}
          removeIngredient={this.removeIngredient}
          editButton={true}
          removeButton={true}
          onChange={this.onIngredientsChange}/>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div style={styles.container}>
          <input
            style={styles.ammount}
            name="ammount"
            ref={(input) => { this.ammountInput = input; }}
            type="text"
            value={this.state.ingredient.ammount}
            onChange={this.onChange}
            autoComplete="off"/>
          <input
            style={styles.units}
            name="units"
            type="text"
            value={this.state.ingredient.units}
            onChange={this.onChange}
            autoComplete="off"/>
          <input
            style={styles.ingredient}
            name="ingredient"
            type="text"
            value={this.state.ingredient.ingredient}
            onChange={this.onChange}
            onBlur={this.onBlur}
            onKeyDown={this.onKeyDown}
            autoComplete="off"/>
          <div style={styles.button}>
            <Microbutton
              icon={this.state.icon}
              onClick={this.addIngredient}
              disabled={this.state.disabled}/>
          </div>
        </div>
        {this.renderIngredients()}
      </div>
    );
  }
}

module.exports = Ingredient;
