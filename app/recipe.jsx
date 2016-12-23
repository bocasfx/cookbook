import React from 'react';
import styles from './styles/styles.css';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      recipe: {}
    };
  }
  
  componentDidMount() {
    fetch('/recipes/' + this.props.params.recipeid).then((response)=> {
      return response.json();
    }).then((json)=> {
      this.setState({
        recipe: json[0]
      });
    });
  }

  render() {
    if (!this.state.recipe.ingredients) {
      return null;
    }

    return (
      <div>
        <div className={styles.title}>{this.state.recipe.title}</div>
        <ul className={styles.ingredients}>
        {
          this.state.recipe.ingredients.map((ingredient, idx)=> {
            return (
              <li key={idx}>
                <span className={styles.ammount}>{ingredient.ammount}</span>
                <span className={styles.units}>{ingredient.units}</span>
                <span className={styles.ingredient}>{ingredient.ingredient}</span>
              </li>
            );
          })
        }
        </ul>
        <ol className={styles.steps}>
        {
          this.state.recipe.steps.map((step, idx)=> {
            return (
              <li key={idx}>
                <span>{step.description}</span>
              </li>
            );
          })
        }
        </ol>
      </div>
    );
  }
}

module.exports = Recipe;
