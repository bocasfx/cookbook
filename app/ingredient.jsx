import React from 'react';
import styles from './styles/styles.css';

class Ingredient extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      idx: props.idx,
      ammount: props.ammount,
      units: props.units,
      ingredient: props.ingredient,
      closeBtn: props.closeBtn
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    let state = this.state;
    state[name] = value;
    this.setState(state);
    this.props.onChange(state);
  }

  render() {
    let closeBtn = this.state.closeBtn ? <span className={styles.remove}>&times;</span> : null;
    return (
      <div className={styles.ingredientComponent}>
        <input name="ammount" type="text" className={styles.ammountInput} defaultValue={this.state.ammount} onChange={this.onChange} />
        <input name="units" type="text" className={styles.unitsInput} defaultValue={this.state.units} onChange={this.onChange} />
        <input name="ingredient" type="text" className={styles.ingredientInput} defaultValue={this.state.ingredient} onChange={this.onChange} />
        {closeBtn}
      </div>
    );
  }
}

module.exports = Ingredient;
