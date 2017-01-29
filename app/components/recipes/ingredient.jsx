import React from 'react';
import Button from '../button.jsx';
import FontAwesome from 'react-fontawesome';

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
    width: '335px'
  },table: {
    margin: '0',
    fontSize: '1em',
    fontFamily: '"Anonymous Pro", monospace',
    border: '1px dashed mistyrose',
    width: '100%',
    padding: '10px'
  },
  tr: {
    verticalAlign: 'top'
  },
  ammountCell: {
    maxWidth: '50px',
    wordWrap: 'break-word'
  },
  unitsCell: {
    maxWidth: '50px',
    wordWrap: 'break-word'
  },
  ingredientCell: {
    wordWrap: 'break-word'
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
      ingredients: [],
      editing: false,
      idx: null,
      buttonLabel: 'Add'
    };

    this.onChange = this.onChange.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.renderIngredients = this.renderIngredients.bind(this);
    this.loadIngredient = this.loadIngredient.bind(this);
    this.editIngredient = this.editIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
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
    this.setState(state);
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
    state.buttonLabel = 'Apply';
    this.setState(state);
  }

  removeIngredient(idx) {
    let state = this.state;
    state.ingredients.splice(idx, 1);
    this.setState(state);
  }

  editIngredient() {
    let state = this.state;
    let idx = this.state.idx;
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
    state.buttonLabel = 'Add';
    this.setState(state);
  }

  renderIngredients() {
    return (
      <table style={styles.table}>
        <tbody>
          {
            this.state.ingredients.map((ingredient, idx) => {
              return (
                <tr key={idx} style={styles.tr}>
                  <td style={styles.ammountCell}>{ingredient.ammount}</td>
                  <td style={styles.unitsCell}>{ingredient.units}</td>
                  <td style={styles.ingredientCell}>{ingredient.ingredient}</td>
                  <td onClick={this.loadIngredient.bind(this, idx)}><FontAwesome name="pencil"/></td>
                  <td onClick={this.removeIngredient.bind(this, idx)}><FontAwesome name="times"/></td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div>
        <div>
          <input
            style={styles.ammount}
            name="ammount"
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
            autoComplete="off"/>
          <Button
            type="button"
            value={this.state.buttonLabel}
            onClick={this.addIngredient}
            onChange={this.onChange}
            disabled={this.state.disabled}/>
        </div>
        {this.renderIngredients()}
      </div>
    );
  }
}

module.exports = Ingredient;
