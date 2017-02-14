import React from 'react';
import FontAwesome from 'react-fontawesome';

const styles = {
  table: {
    margin: '0',
    fontSize: '1em',
    fontFamily: '"Anonymous Pro", monospace',
    width: '100%',
    padding: '10px'
  },
  tr: {
    verticalAlign: 'top'
  },
  ammountCell: {
    maxWidth: '50px',
    wordWrap: 'break-word',
    textAlign: 'right'
  },
  unitsCell: {
    maxWidth: '50px',
    wordWrap: 'break-word',
    width: '60px'
  },
  ingredientCell: {
    maxWidth: '250px',
    wordWrap: 'break-word'
  },
  icon: {
    width: '40px',
    cursor: 'pointer'
  }
};

class IngredientList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ingredients: this.props.ingredients
    };

    this.placeholder = <tr className="placeholder">Placeholder</tr>;
    this.dragged = null;

    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
  }

  editButton(idx) {
    if (!this.props.editButton) {
      return null;
    }

    return (
      <td style={styles.icon} onClick={this.props.loadIngredient.bind(this, idx)}><FontAwesome name="pencil"/></td>
    );
  }

  removeButton(idx) {
    if (!this.props.removeButton) {
      return null;
    }

    return (
      <td style={styles.icon} onClick={this.props.removeIngredient.bind(this, idx)}><FontAwesome name="times"/></td>
    );
  }

  onDragStart(event) {
    this.dragged = event.currentTarget;
    event.dataTransfer.effectAllowed = 'move';

    // Firefox requires calling dataTransfer.setData
    // for the drag to properly work
    event.dataTransfer.setData('text/html', event.currentTarget);
  }

  onDragOver(event) {
    event.preventDefault();
    if(event.target.className === 'placeholder') {
      return;
    }
    this.over = event.target.parentNode;
    // TODO: Add placeholder above event.target.
  }

  onDragEnd(event) {

    event.preventDefault();
    let target = this.over.getAttribute('data-id');
    let dragged = this.dragged.getAttribute('data-id');
    this.reorderIngredients(dragged, target);
  }

  reorderIngredients(dragged, target) {
    let state = this.state;
    state.ingredients.splice(target, 0, state.ingredients.splice(dragged, 1)[0]);
    this.setState(state);
  }

  render() {
    if (!this.state.ingredients.length) {
      return null;
    }

    return (
      <table style={styles.table} onDragOver={this.onDragOver}>
        <tbody>
          {
            this.state.ingredients.map((ingredient, idx) => {
              return (
                <tr key={idx} data-id={idx} style={styles.tr} draggable="true" onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
                  <td style={styles.ammountCell}>{ingredient.ammount}</td>
                  <td style={styles.unitsCell}>{ingredient.units}</td>
                  <td style={styles.ingredientCell}>{ingredient.ingredient}</td>
                  {this.editButton(idx)}
                  {this.removeButton(idx)}
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

module.exports = IngredientList;
