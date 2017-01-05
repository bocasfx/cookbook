import React from 'react';
import styles from './styles/styles.css';
import request from 'superagent';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {}
    };
  }
  
  componentDidMount() {
    request
      .get('/api/v1/recipes/' + this.props.params.recipeid)
      .set('Accept', 'application/json')
      .end((err, response)=> {
        this.setState({
          recipe: response.body[0]
        });
      });
  }

  render() {
    if (!this.state.recipe.ingredients) {
      return null;
    }

    let editUrl = '/edit/' + this.props.params.recipeid;

    return (
      <div>
        <div className={styles.recipeHeader}>
          <span className={styles.recipeTitle}>{this.state.recipe.title}</span>
          <Link to={editUrl}><FontAwesome className={styles.editIcon} name='pencil'/></Link>
        </div>
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
