import React from 'react';
import { Link } from 'react-router';
import styles from './styles/styles.css';

class RecipeList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className={styles.maintitle}>CookBook</div>
        <ul>
          {
            this.props.recipes.map((recipe)=> {
              let recipeUrl = '/recipes/' + recipe._id;
              return <li key={recipe._id}><Link to={recipeUrl}><div>{recipe.title}</div></Link></li>;
            })
          }
        </ul>
      </div>
    );
  }
}

module.exports = RecipeList;
