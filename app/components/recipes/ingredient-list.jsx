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
    wordWrap: 'break-word'
  },
  unitsCell: {
    maxWidth: '50px',
    wordWrap: 'break-word'
  },
  ingredientCell: {
    maxWidth: '250px',
    wordWrap: 'break-word'
  },
  icon: {
    width: '40px'
  }
};

class IngredientList extends React.Component {

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

  render() {
    if (!this.props.ingredients.length) {
      return null;
    }

    return (
      <table style={styles.table}>
        <tbody>
          {
            this.props.ingredients.map((ingredient, idx) => {
              return (
                <tr key={idx} style={styles.tr}>
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
