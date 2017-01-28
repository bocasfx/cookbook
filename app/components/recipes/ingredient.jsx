import React from 'react';
import Button from '../button.jsx';

const styles = {
  ammount: {
    width: '50px'
  },
  units: {
    marginLeft: '20px',
    width: '50px'
  },
  ingredient: {
    marginLeft: '20px'
  }
};

class Ingredient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ammount: '',
      units: '',
      ingredient: '',
      disabled: true
    };

    this.onChange = this.onChange.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
  }

  onChange(event) {
    event.preventDefault();

    let value = event.target.value;
    let name = event.target.name;
    let state = this.state;

    state[name] = value;
    state.disabled = !(this.state.ammount.length || this.state.units.length || this.state.ingredient.length);
    this.setState(state);
  }

  addIngredient() {
    this.props.onAddIngredient(this.state);
    this.setState({
      ammount: '',
      units: '',
      ingredient: ''
    });
  }

  render() {
    return (
      <div>
        <input
          style={styles.ammount}
          name="ammount"
          type="text"
          value={this.state.ammount}
          onChange={this.onChange}
          autoComplete="off"/>
        <input
          style={styles.units}
          name="units"
          type="text"
          value={this.state.units}
          onChange={this.onChange}
          autoComplete="off"/>
        <input
          style={styles.ingredient}
          name="ingredient"
          type="text"
          value={this.state.ingredient}
          onChange={this.onChange}
          autoComplete="off"/>
        <Button
          type="button"
          value="Add"
          onClick={this.addIngredient}
          onChange={this.onChange}
          disabled={this.state.disabled}/>
      </div>
    );
  }
}

module.exports = Ingredient;
